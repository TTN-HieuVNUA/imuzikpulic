import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import stringify = require('json-stable-stringify');

import { ConnectionPagingService } from '../../../api/paging/connection-paging.service';
import { SONG_STATUS } from '../models';
import { SongRankTable } from '../models/song-rank-table.entity';
import { Chart, SongConnection, SongConnectionArgs } from '../music.schemas';
import { MusicService } from '../music.service';
import { MusicSettings } from '../music.settings';
import { SongLoaderService } from './../loader-services';

@Resolver(() => Chart)
export class ChartResolver {
  constructor(
    private musicService: MusicService,
    private songLoaderService: SongLoaderService,
    private musicSettings: MusicSettings,
    private connectionPagingService: ConnectionPagingService
  ) {}

  @Query(() => [Chart])
  async iCharts() {
    return this.musicSettings.getICharts();
  }

  @Query(() => Chart, { nullable: true })
  iChart(@Args('slug') slug: string) {
    return this.musicService.findChartBySlug(slug);
  }

  @ResolveField('songs', () => SongConnection)
  async songs(@Parent() chart: Chart, @Args() connArgs: SongConnectionArgs) {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.songLoaderService.cachedPaginatedList(
          `chart:${chart.slug}:songs:${skip}:${take}:${stringify(connArgs.orderBy || '')}`,
          (songRepo) =>
            songRepo
              .createQueryBuilder('s')
              .innerJoinAndSelect(SongRankTable, 'rt', 'rt.song_id = s.id')
              .where('s.status = :active', { active: SONG_STATUS.ACTIVE })
              .andWhere('rt.ranktable_id = :chartId', { chartId: chart.id })
              .orderBy('rt.fakeVoteTimes', 'DESC')
              .take(take)
              .skip(skip)
              .getManyAndCount()
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }
}
