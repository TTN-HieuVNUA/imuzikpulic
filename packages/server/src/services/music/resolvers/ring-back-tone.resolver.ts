import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { UrlService } from '../../../infra/util/url/url.service';
import { RingBackTone, Song } from '../models';
import { ContentProvider } from '../models/content-provider.entity';
import { ContentProviderLoaderService,ContentProviderDetailLoaderService, SongLoaderService } from './../loader-services';

@Resolver(() => RingBackTone)
export class RingBackToneResolver {
  constructor(
    private urlService: UrlService,
    private songLoaderService: SongLoaderService,
    private contentProviderLoaderService: ContentProviderLoaderService,
    private contentProviderDetailLoaderService: ContentProviderDetailLoaderService
  ) {}

  @ResolveField('contentProvider', () => ContentProvider, { nullable: true })
  async contentProvider(@Parent() tone: RingBackTone) {
    return await this.contentProviderLoaderService.loadBy('id', tone.huaweiCpId);
  }

  @ResolveField('song', () => Song, { nullable: true })
  async song(@Parent() tone: RingBackTone) {
    return this.songLoaderService.loadBy('id', tone.vtSongId);
  }

  @ResolveField('duration', () => Number, { nullable: true })
  async duration() {
    // TODO: rbt duration or not
    return null;
  }
  @ResolveField('fileUrl', () => String, { nullable: true })
  async fileUrl(@Parent() tone: RingBackTone) {
    return this.urlService.mediaUrl(tone.vtLink);
  }
}
