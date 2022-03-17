import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Node } from '../../../api/nodes';
import { UrlService } from '../../../infra/util';
import { BannerItem } from '../models/banner-item.entity';
import { MarketingService } from './../marketing.service';

export const BANNER_ITEM_ACTIVE = 1;
@Resolver(() => BannerItem)
export class BannerItemResolver {
  constructor(
    @Inject(UrlService) private urlService: UrlService,
    private marketingService: MarketingService
  ) {}

  @ResolveField('fileUrl', () => String)
  async fileUrl(@Parent() item: BannerItem) {
    return this.urlService.mediaUrl(item.filePath);
  }

  @ResolveField(() => Node, { nullable: true })
  async item(@Parent() item: BannerItem) {
    return this.marketingService.getMarketingItem(item);
  }
}
