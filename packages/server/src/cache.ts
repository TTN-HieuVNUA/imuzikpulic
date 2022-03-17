import { Cache, CachingConfig } from 'cache-manager';
import * as cacheManager from 'cache-manager';
import { Provider, Global, Module } from '@nestjs/common';

const MISSING_CACHE_PROPERTY = `
Missing cache property. Please add

import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

  constructor(
    ...
    @Inject(CACHE_MANAGER) private cache: Cache
    ...
  ) {}

to your class.
`;

export function Cached(
  key: string | ((...args: any[]) => string),
  config: CachingConfig & { cacheNull?: boolean }
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = async function (this: any, ...args: any[]) {
      const calculatedKey = typeof key === 'string' ? key : key(...args);
      const cache: Cache = this.cache;
      if (!cache) {
        throw new Error(MISSING_CACHE_PROPERTY);
      }
      let value = await cache.get(calculatedKey);
      // console.log('cached:', calculatedKey, value);
      if (!(await cache.get(calculatedKey))) {
        value = originalMethod.apply(this, args);
        // console.log(typeof value);
        if (value && value.then) value = await value;
        if (value != null || config.cacheNull) {
          cache.set(calculatedKey, value, config);
          // console.log('missed:', calculatedKey, value);
        }
      }
      return value;
    };
    return descriptor;
  };
}

export const CACHE_TOKEN = 'GLOBAL_CACHE';

export const cacheProvider: Provider = {
  provide: CACHE_TOKEN,
  useValue: () => cacheManager.caching({ store: 'memory', max: 100, ttl: 10 /*seconds*/ }),
};

@Global()
@Module({ providers: [cacheProvider], exports: [CACHE_TOKEN] })
export class CachingModule {}
