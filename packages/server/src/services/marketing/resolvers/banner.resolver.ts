import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Raw } from 'typeorm';
import { RingBackToneLoaderService, SongLoaderService } from '../../music/loader-services';
import { BannerItemConnection, BannerItemConnectionArgs } from '../banner.schemas';
import { BannerService } from '../banner.service';
import { BannerItem } from '../models/banner-item.entity';
import { Banner } from '../models/banner.entity';
import { ConnectionPagingService } from './../../../api/paging/connection-paging.service';
import { UrlService } from './../../../infra/util/url/url.service';
import { BannerPackage } from './../models/banner-package.entity';
import { BANNER_ITEM_ACTIVE } from './banner-item.resolver';

@Resolver(() => Banner)
export class BannerResolver {
  constructor(
    private bannerService: BannerService,
    private ringBackToneLoaderService: RingBackToneLoaderService,
    private songLoaderService: SongLoaderService,
    private connectionPagingService: ConnectionPagingService,
    private urlService: UrlService
  ) {}

  @Query(() => Banner, { nullable: true })
  async banner(@Args('id') id: string): Promise<Banner | null> {
    return this.bannerService.findBannerById(id);
  }

  @Query(() => BannerItemConnection, { nullable: true })
  async pageBanner(
    @Args() connArgs: BannerItemConnectionArgs,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('page') page: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('slug', { nullable: true }) slug: string
  ): Promise<BannerItemConnection> {
    const bannerId = 60;
    // TODO: get from setting
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.bannerService.cachedPaginatedBannerItemList(
          `banner:${bannerId}:items`,
          (bannerItemRepository) =>
            bannerItemRepository.findAndCount({
              where: {
                bannerId,
                isActive: BANNER_ITEM_ACTIVE,
                publishedTime: Raw((alias) => `${alias} <= DATE(NOW())`),
                endTime: Raw((alias) => `${alias} > DATE(NOW())`),
              },
              skip,
              take,
            })
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @Query(() => [BannerPackage])
  async bannerPackages(): Promise<BannerPackage[]> {
    return this.bannerService.getCachedBannerPackages();
  }

  @Query(() => BannerItemConnection, { nullable: true })
  async featuredList(@Args() connArgs: BannerItemConnectionArgs): Promise<BannerItemConnection> {
    const bannerId = 103;
    // TODO: get from setting
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.bannerService.cachedPaginatedBannerItemList(
          `banner:${bannerId}:items`,
          (bannerItemRepository) =>
            bannerItemRepository.findAndCount({
              where: {
                bannerId,
                isActive: BANNER_ITEM_ACTIVE,
                publishedTime: Raw((alias) => `${alias} <= DATE(NOW())`),
                endTime: Raw((alias) => `${alias} > DATE(NOW())`),
              },
              skip,
              take,
            })
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @ResolveField('fileUrl', () => String)
  async fileUrl(@Parent() item: BannerItem) {
    return this.urlService.mediaUrl(item.filePath);
  }
  @ResolveField('itemId', () => String)
  async itemId(@Parent() item: BannerItem) {
    if(item.itemType==='RBT'){
     const rbtItem = await this.ringBackToneLoaderService.loadBy('huaweiToneCode', item.itemId);
     const songItem = await this.songLoaderService.loadBy('id', rbtItem?.vtSongId);
     return songItem?.slug
    }else{
      return item.itemId
    }
  }
  @ResolveField(() => [BannerItem])
  async items(@Parent() banner: Banner) {
    return (
      await this.bannerService.cachedPaginatedBannerItemList(
        `banner:${banner.id}:items`,
        (bannerItemRepository) =>
          bannerItemRepository.findAndCount({
            where: {
              bannerId: banner.id,
              isActive: BANNER_ITEM_ACTIVE,
              publishedTime: Raw((alias) => `${alias} <= DATE(NOW())`),
              endTime: Raw((alias) => `${alias} > DATE(NOW())`),
            },
          })
      )
    )[0];
  }
}
