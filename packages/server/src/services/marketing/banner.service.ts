import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from '../../infra/config';
import { DataLoaderService, TypeOfClassMethod } from '../../infra/util';
import { LoggingService } from './../../infra/logging/logging.service';
import { BannerItem } from './models/banner-item.entity';
import { BannerPackage, BANNER_PACKAGE_ACTIVE } from './models/banner-package.entity';
import { Banner, BANNER_ACTIVE } from './models/banner.entity';
import { BANNER_ITEM_ACTIVE } from './resolvers/banner-item.resolver';
import ms = require('ms');

import LRU = require('lru-cache');
@Injectable()
export class BannerService {
  private bannerPackageCache = new LRU<string, BannerPackage[]>({
    maxAge: ms(this.config.CACHE_TIMEOUT),
  });
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    @InjectRepository(BannerItem)
    private readonly bannerItemRepository: Repository<BannerItem>,
    @InjectRepository(BannerPackage)
    private readonly bannerPackageRepository: Repository<BannerPackage>,
    private readonly loggingService: LoggingService,
    private config: Config
  ) {}
  private bannerLoaderService = new DataLoaderService(
    this.bannerRepository,
    this.loggingService.getLogger('banner-service'),
    { isActive: BANNER_ACTIVE },
    ms(this.config.CACHE_TIMEOUT),
    ['id']
  );

  findBannerById(id: string) {
    return this.bannerLoaderService.loadBy('id', id);
  }
  private bannerItemLoaderService = new DataLoaderService(
    this.bannerItemRepository,
    this.loggingService.getLogger('banner-service'),
    { isActive: BANNER_ITEM_ACTIVE },
    ms(this.config.CACHE_TIMEOUT),
    ['id']
  );

  cachedPaginatedBannerItemList: TypeOfClassMethod<
    DataLoaderService<'id', BannerItem>,
    'cachedPaginatedList'
  > = (key, query) => this.bannerItemLoaderService.cachedPaginatedList(key, query);

  async getCachedBannerPackages(): Promise<BannerPackage[]> {
    let packages = this.bannerPackageCache.get('all');
    if (!packages) {
      packages = await this.bannerPackageRepository.find({
        isActive: BANNER_PACKAGE_ACTIVE,
      });
      this.bannerPackageCache.set('all', packages);
    }
    return packages;
  }
}
