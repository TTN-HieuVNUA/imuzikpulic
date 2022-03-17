import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ConnectionPagingService } from '../../../api/paging/connection-paging.service';
import { addKeyPrefix } from '../../../infra/util/functions';
import { UrlService } from '../../../infra/util/url/url.service';
import { SingerLoaderService, SongLoaderService } from '../loader-services';
import { SONG_STATUS } from '../models';
import { Singer, SINGER_ACTIVE } from '../models/singer.entity';
import { SongSinger } from '../models/song-singer.entity';
import {
  SingerConnection,
  SingerConnectionArgs,
  SongConnection,
  SongConnectionArgs,
} from '../music.schemas';
import { SingerLikes } from './../../social/social.schemas';
import { SocialService } from './../../social/social.service';
import stringify = require('json-stable-stringify');

@Resolver(() => Singer)
export class SingerResolver {
  constructor(
    private urlService: UrlService,
    private singerLoaderService: SingerLoaderService,
    private songLoaderService: SongLoaderService,
    private connectionPagingService: ConnectionPagingService,
    private socialService: SocialService
  ) {}

  @ResolveField('imageUrl', () => String, { nullable: true })
  async getImageUrl(@Parent() singer: Singer) {
    return this.urlService.mediaUrl(singer.imagePath);
  }

  @Query(() => Singer, { nullable: true })
  async singer(@Args('slug') slug: string): Promise<Singer | null> {
    return await this.singerLoaderService.loadBy('slug', slug);
  }

  @Query(() => SingerConnection)
  async singers(@Args() connArgs: SingerConnectionArgs): Promise<SingerConnection> {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.singerLoaderService.cachedPaginatedList(
          `singers:${skip}:${take}`,
          (singerRepository) =>
            singerRepository.findAndCount({
              where: {
                isActive: SINGER_ACTIVE,
              },
              take,
              skip,
              order: { updatedAt: 'DESC' },
            })
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @ResolveField('likes', () => SingerLikes, {})
  async likes(@Parent() singer: Singer): Promise<SingerLikes> {
    return {
      id: singer.id,
      totalCount: await this.socialService.singerTotalLikes(singer.id),
    };
  }

  @ResolveField('songs', () => SongConnection)
  async songs(
    @Parent() singer: Singer,
    @Args() connArgs: SongConnectionArgs
  ): Promise<SongConnection> {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.songLoaderService.cachedPaginatedList(
          `singer:${singer.slug}:songs:${skip}:${take}}:${stringify(connArgs.orderBy || '')}`,
          (songRepository) =>
            songRepository
              .createQueryBuilder('s')
              .innerJoinAndSelect(SongSinger, 'sg', 'sg.song_id = s.id')
              .where('s.status = :active', { active: SONG_STATUS.ACTIVE })
              .andWhere('sg.singer_id = :singerId', { singerId: singer.id })
              .orderBy(
                connArgs.orderBy ? addKeyPrefix('s.')(connArgs?.orderBy) : { 's.updatedAt': 'DESC' }
              )
              .take(take)
              .skip(skip)
              .getManyAndCount()
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }
}
