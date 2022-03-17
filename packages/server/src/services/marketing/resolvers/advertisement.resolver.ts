import { Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Node } from '../../../api/nodes';
import { UrlService } from '../../../infra/util';
import { AdvertisementService } from './../advertisement.service';
import { MarketingService } from './../marketing.service';
import { Advertisement } from './../models/advertisement.entity';

export const BANNER_ITEM_ACTIVE = 1;
@Resolver(() => Advertisement)
export class AdvertisementResolver {
  constructor(
    private urlService: UrlService,
    private advertisementService: AdvertisementService,
    private marketingService: MarketingService
  ) {}

  @Query(() => [Advertisement])
  async activeHeadlines(@Context('channel') channel: string) {
    return this.advertisementService.getActiveHeadlines(channel);
  }

  @Query(() => [Advertisement])
  async activePopups(@Context('channel') channel: string) {
    return this.advertisementService.getActivePopups(channel);
  }

  @ResolveField('imageUrl', () => String)
  async imageUrl(@Parent() item: Advertisement) {
    return this.urlService.mediaUrl(item.imagePath);
  }

  @ResolveField('item', () => Node, { nullable: true })
  async item(@Parent() item: Advertisement) {
    return this.marketingService.getMarketingItem(item);
  }
}
