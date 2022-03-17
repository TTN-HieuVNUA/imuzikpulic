import DataLoader = require('dataloader');
import { pipe } from 'fp-ts/lib/pipeable';
import * as _ from 'lodash/fp';
import { Logger } from 'log4js';
import LRU = require('lru-cache');
import { RedisService } from 'nestjs-redis';
import { FindConditions, In, Repository } from 'typeorm';
import * as Redis from 'ioredis';

export type TypeOfClassMethod<T, M extends keyof T> = T[M] extends (...args: any) => any
  ? T[M]
  : never;

export const lruCacheMap = <K, V>(lru: LRU<K, V>): DataLoader.CacheMap<K, Promise<V>> => {
  return {
    get: (key) => {
      const value = lru.get(key);
      if (value !== undefined) return Promise.resolve(value);
    },
    set: async (key, value) => {
      const resolved = await value;
      lru.set(key, resolved);
    },
    delete: (key) => lru.del(key),
    clear: () => lru.reset(),
  };
};

export class DataLoaderService<
  F extends string,
  E extends Record<'id' | F | FM, string | null>,
  FM extends string = never
> {
  private uniqueFields: ('id' | F)[];
  private _client?: Redis.Redis;
  constructor(
    private repo: Repository<E>,
    private logger: Logger,
    private extraCondition: FindConditions<E>,
    private maxAge: number,
    uniqueFields: F[],
    private oneToManyFields: FM[] = [],
    private redisService?: RedisService
  ) {
    this._client = this.redisService?.getClient();
    this.uniqueFields = _.uniq([...uniqueFields, 'id']);
    this.loaders = pipe(
      this.uniqueFields,
      _.map((field) => {
        const lru = new LRU<string, E>({ maxAge });
        return [
          field,
          new DataLoader<string, E | null>(
            async (keys) => {
              const entities = await this.repo.find({
                [field]: In(keys as string[]),
                ...this.extraCondition,
              });
              entities.forEach((entity) =>
                this.uniqueFields.forEach((otherField) => {
                  if (otherField !== field)
                    this.loaders[otherField as string].prime(entity[otherField] as any, entity);
                })
              );
              const res = keys.map((k) => entities.find((s) => s[field] == k) ?? null);
              res.forEach(Object.freeze);
              return res;
            },
            {
              cacheMap: lruCacheMap(lru),
            }
          ),
        ];
      }),
      _.fromPairs
    );
    this.oneToManyLoaders = pipe(
      this.oneToManyFields,
      _.map((field: FM): [FM, DataLoader<string, string[]>] => {
        const lru = new LRU<string, string[]>({ maxAge });
        return [
          field,
          new DataLoader<string, string[]>(
            async (keys) => {
              const entities = await this.repo.find({
                [field]: In(keys as string[]),
                ...this.extraCondition,
              });
              entities.forEach(this.prime);
              entities.forEach(Object.freeze);
              const res = keys.map((k) =>
                entities.filter((s) => s[field] === k).map((s) => s.id as string)
              );
              return res;
            },
            {
              cacheMap: lruCacheMap(lru),
            }
          ),
        ];
      }),
      _.fromPairs
    );
  }
  private loaders: { [key: string]: DataLoader<string, E | null> };
  private oneToManyLoaders: { [key: string]: DataLoader<string, string[]> };
  private getLoader(field: 'id' | F) {
    return this.loaders[field as string];
  }
  loadBy(field: F, value: string | null | undefined) {
    return value == null ? null : this.getLoader(field).load(value);
  }
  private getOneToManyLoader = (field: FM) => {
    return this.oneToManyLoaders[field as string];
  };
  async loadOneToManyBy(field: FM, value: string | null | undefined) {
    if (value == null) return [];
    return this.getLoader('id' as F).loadMany(
      await this.getOneToManyLoader(field).load(value)
    ) as Promise<E[]>;
  }

  clearAll() {
    (_.values(this.loaders) as DataLoader<string, E>[]).forEach((l) => l.clearAll());
  }

  private listCache = new LRU<string, [string[], number]>({
    maxAge: this.maxAge,
  });

  prime = (entity: E) => {
    this.uniqueFields.forEach((field) => {
      const value = entity[field];
      if (value) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.getLoader(field).prime(value!, entity);
      }
    });
  };

  clear = (entity: E) => {
    this.uniqueFields.forEach((field) => {
      const value = entity[field];
      if (value) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.getLoader(field).clear(value!);
      }
    });
  };

  async cachedPaginatedList(
    key: string,
    query: (repo: Repository<E>) => Promise<[E[], number]>,
    maxAge?: number
  ): Promise<[E[], number]> {
    const cached = this.listCache.get(key);
    
    if (cached) {
      const [ids, count] = cached;
      this.logger.trace('List CACHE HIT:', key, count);
      return [(await this.getLoader('id' as F).loadMany(ids)) as E[], count];
    } else {
      const [entities, count] = await query(this.repo);
      entities.forEach(this.prime);
      entities.forEach(Object.freeze);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.listCache.set(key, [entities.map((s) => s.id!), count], maxAge);
      this.logger.trace('List CACHE MISS:', key, count);
      return [entities, count];
    }
  }
  invalidateListsWithPrefix(prefix: string) {
    this.listCache
      .keys()
      .filter((key) => key.startsWith(prefix))
      .forEach((key) => this.listCache.del(key));
  }
  async setCache(
    key: string,
    value: string,
    expiryMode?: string | any[],
    time?: number | string,
  ): Promise<boolean> {
    const result = await this._client?.set(key, value, expiryMode, time);
    return result == 'OK';
  }

  async getCache(key: string): Promise<string|null> { 
    if(this._client)
    return await this._client.get(key);
    else
    return null;
  }
  
}
