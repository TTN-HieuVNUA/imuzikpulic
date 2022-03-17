import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import stringify = require('json-stable-stringify');

import { ConnectionPagingService } from '../../../api/paging/connection-paging.service';
import { addKeyPrefix } from '../../../infra/util/functions';
import { SongLoaderService } from '../loader-services';
import { SONG_STATUS } from '../models';
import { ContentProvider } from '../models/content-provider.entity';
import { RingBackTone } from '../models/ring-back-tone.entity';
import {
  ContentProviderConnection,
  ContentProviderConnectionArgs,
  SongConnection,
  SongConnectionArgs,
} from '../music.schemas';
import { ContentProviderLoaderService,ContentProviderDetailLoaderService } from './../loader-services';

@Resolver(() => ContentProvider)
export class ContentProviderResolver {
  constructor(
    private connectionPagingService: ConnectionPagingService,
    private contentProviderLoaderService: ContentProviderLoaderService,
    private contentProviderDetailLoaderService: ContentProviderDetailLoaderService,
    private songLoaderService: SongLoaderService
  ) {}
  @Query(() => [ContentProvider])
  async hotCps() {
    const [cps] = await this.contentProviderLoaderService.cachedPaginatedList(
      `cps`,
      (contentProviderRepository) => contentProviderRepository.findAndCount({ take: 8 })
    );
    return cps;
  }

  @Query(() => ContentProvider, { nullable: true })
  async contentProvider(@Args('group') group: string) {
    return this.contentProviderLoaderService.loadBy('group', group);
  }

  @Query(() => ContentProviderConnection)
  async contentProviders(
    @Args() connArgs: ContentProviderConnectionArgs
  ): Promise<ContentProviderConnection> {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.contentProviderLoaderService.cachedPaginatedList(
          `cps:${skip}:${take}`,
          (contentProviderRepository) => contentProviderRepository.findAndCount({ take, skip })
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @ResolveField('imageUrl', () => String, { nullable: true })
  async imageUrl(/*@Parent() cp: ContentProvider*/) {
    return 'https://via.placeholder.com/200?text=Ch%C6%B0a%20c%C3%B3%20field';
    // return this.urlService.mediaUrl(cp.imagePath || '/images/onbox_02.jpg');
  }

  @ResolveField('songs', () => SongConnection)
  async songs(
    @Parent() cp: ContentProvider,
    @Args() connArgs: SongConnectionArgs
  ): Promise<SongConnection> {
    //let details = await this.contentProviderDetailLoaderService.loadOneToManyBy("cp_group",cp.group)??[];
    //let cp_codes = (details.map((sg) => sg.cp_code).sort())??[];
    return await this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.songLoaderService.cachedPaginatedList(
          `cp_group:${cp.group}:songs:${skip}:${take}:${stringify(connArgs.orderBy || '')}`,
          (songRepository) =>
            songRepository
              .createQueryBuilder('s')
              .innerJoinAndSelect(RingBackTone, 'rbt', 'rbt.vt_song_id = s.id')
              .innerJoinAndSelect(ContentProvider, 'cp', 'cp.cp_id = rbt.huawei_cp_id')
              .where('s.status = :active', { active: SONG_STATUS.ACTIVE })
              .andWhere('cp.cp_group = :cp_group', { cp_group: cp.group }) // TODO: add index for this
              .orderBy(
                connArgs.orderBy
                  ? addKeyPrefix('s.')(connArgs?.orderBy)
                  : { 'rbt.updatedAt': 'DESC' }
              )
              .skip(skip)
              .take(take)
              .getManyAndCount()
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }
}
