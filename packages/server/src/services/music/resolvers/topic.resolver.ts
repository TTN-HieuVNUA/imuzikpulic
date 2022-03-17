import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import stringify = require('json-stable-stringify');
import { Like, Not } from 'typeorm';

import { ConnectionPagingService } from '../../../api/paging/connection-paging.service';
import { addKeyPrefix } from '../../../infra/util/functions';
import { UrlService } from '../../../infra/util/url/url.service';
import { SongLoaderService } from '../loader-services';
import { SONG_STATUS, Topic } from '../models';
import { TopicSong } from '../models/topic-song.entity';
import { TOPIC_ACTIVE } from '../models/topic.entity';
import {
  SongConnection,
  SongConnectionArgs,
  TopicConnection,
  TopicConnectionArgs,
} from '../music.schemas';
import { TopicLoaderService } from './../loader-services';

@Resolver(() => Topic)
export class TopicResolver {
  constructor(
    private topicLoaderService: TopicLoaderService,
    private songLoaderService: SongLoaderService,
    private urlService: UrlService,
    private connectionPagingService: ConnectionPagingService
  ) {}

  @Query(() => [Topic])
  async hotTopics(): Promise<Topic[]> {
    const [topics] = await this.topicLoaderService.cachedPaginatedList(
      `hot-topics`,
      (topicRepository) =>
        topicRepository.findAndCount({
          where: {
            isActive: 1,
            isHot: 1,
            name: Not(Like('top 100%')),
          },
          take: 4,
        })
    );
    return topics;
  }
  @Query(() => [Topic])
  async hotTop100(): Promise<Topic[]> {
    const [topics] = await this.topicLoaderService.cachedPaginatedList(
      `hot-top100`,
      (topicRepository) =>
        topicRepository.findAndCount({
          where: {
            isActive: 1,
            isHot: 1,
            name: Like('%top 100%'),
          },
          take: 4,
        })
    );
    return topics;
  }

  @Query(() => Topic, { nullable: true })
  async topic(@Args('slug') slug: string): Promise<Topic | null> {
    return this.topicLoaderService.loadBy('slug', slug);
  }
  @ResolveField('imageUrl', () => String, { nullable: true })
  async imageUrl(@Parent() topic: Topic) {
    return this.urlService.mediaUrl(topic.imagePath);
  }

  @Query(() => TopicConnection)
  async top100s(@Args() connArgs: TopicConnectionArgs): Promise<TopicConnection> {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.topicLoaderService.cachedPaginatedList(`top100s:${skip}:${take}`, (topicRepository) =>
          topicRepository.findAndCount({
            where: { isActive: TOPIC_ACTIVE, name: Like('%top 100%') },
            order: { priority: 'ASC', updatedAt: 'DESC' },
            take,
            skip,
          })
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @Query(() => TopicConnection)
  async topics(@Args() connArgs: TopicConnectionArgs): Promise<TopicConnection> {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.topicLoaderService.cachedPaginatedList(`topics:${skip}:${take}`, (topicRepository) =>
          topicRepository.findAndCount({
            where: { isActive: TOPIC_ACTIVE, name: Not(Like('top 100%')) },
            order: { priority: 'ASC', updatedAt: 'DESC' },
            take,
            skip,
          })
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @ResolveField('songs', () => SongConnection)
  async songs(
    @Parent() topic: Topic,
    @Args() connArgs: SongConnectionArgs
  ): Promise<SongConnection> {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.songLoaderService.cachedPaginatedList(
          `topics:${topic.slug}:songs:${skip}:${take}:${stringify(connArgs.orderBy || '')}`,
          (songRepository) =>
            songRepository
              .createQueryBuilder('s')
              .innerJoinAndSelect(TopicSong, 'ts', 'ts.song_id = s.id')
              .where('s.status = :active', { active: SONG_STATUS.ACTIVE })
              .andWhere('ts.topic_id = :topicId', { topicId: topic.id })
              .orderBy()
              .orderBy(
                connArgs.orderBy
                  ? addKeyPrefix('s.')(connArgs?.orderBy)
                  : { 'ts.priority': 'ASC', 'ts.updatedAt': 'DESC' }
              )
              .take(take)
              .skip(skip)
              .getManyAndCount()
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }
}
