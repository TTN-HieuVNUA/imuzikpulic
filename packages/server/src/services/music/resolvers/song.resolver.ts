import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as camelcaseKeys from 'camelcase-keys';
import { subDays } from 'date-fns';
import { either, taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import ms = require('ms');
import { Brackets } from 'typeorm';

import { BaseResolver } from '../../../api/base.resolver';
import { fromGlobalId } from '../../../api/nodes';
import { ConnectionPagingService } from '../../../api/paging/connection-paging.service';
import { Config } from '../../../infra/config/config';
import { LoggingService } from '../../../infra/logging';
import { UrlService } from '../../../infra/util/url/url.service';
import { AccountService } from '../../account';
import { CommentConnection, CommentConnectionArgs } from '../../social';
import {
  GenreLoaderService,
  RingBackToneLoaderService,
  SongLoaderService,
} from '../loader-services';
import { FavoriteSong, Genre, RingBackTone, Song, SONG_STATUS } from '../models';
import { ContentProvider } from '../models/content-provider.entity';
import { MaybeYouLike } from '../models/maybe-you-like.entity';
import { Singer } from '../models/singer.entity';
import { SongGenre } from '../models/song-genre.entity';
import { SongSinger } from '../models/song-singer.entity';
import { SongConnection, SongConnectionArgs, SongPayload } from '../music.schemas';
import { MusicSettings } from '../music.settings';
import { likedListCachePrefix, SongService } from '../song.service';
import { SocialService } from './../../social/social.service';

export const notExpiredRbtCondition = (days: number) =>
  new Brackets((condition) =>
    condition
      .where('rbt.huaweiAvailableDatetime is NULL')
      .orWhere(
        'rbt.huaweiAvailableDatetime is NOT NULL and rbt.huaweiAvailableDatetime > :availableAfter',
        {
          availableAfter: subDays(new Date(), days),
        }
      )
  );

@Resolver(() => Song)
export class SongResolver extends BaseResolver {
  constructor(
    private songLoaderService: SongLoaderService,
    private genreLoaderService: GenreLoaderService,
    private ringBackToneLoaderService: RingBackToneLoaderService,
    private accountService: AccountService,
    private urlService: UrlService,
    private connectionPagingService: ConnectionPagingService,
    private songService: SongService,
    private config: Config,
    private musicSettings: MusicSettings,
    private socialService: SocialService,
    loggingService: LoggingService
  ) {
    super(loggingService.getLogger('song-resolver'));
  }

  @Query(() => SongConnection)
  async recommendedSongs(@Args() connArgs: SongConnectionArgs) {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.songLoaderService.cachedPaginatedList(
          `recommended-songs:${skip}:${take}`,
          (songRepository) =>
            songRepository
              .createQueryBuilder('s')
              .innerJoinAndSelect(MaybeYouLike, 'mb', 'mb.song_id = s.id')
              .where('s.status = :active', { active: SONG_STATUS.ACTIVE })
              .orderBy({ 'mb.priority': 'ASC' })
              .take(take)
              .skip(skip)
              .getManyAndCount(),
          ms(this.config.CACHE_LONG_TIMEOUT)
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @Query(() => Song, { nullable: true })
  async song(@Args('slug') slug: string) {
    return await this.songLoaderService.loadBy('slug', slug);
  }

  @ResolveField('singers', () => [Singer])
  async getSingers(@Parent() song: Song) {
    return camelcaseKeys(JSON.parse(song.singerList ?? '[]')).map((es: object) =>
      Object.assign(new Singer(), es)
    ) as Singer[];
  }

  @ResolveField('genres', () => [Genre])
  async getGenres(@Parent() song: Song): Promise<Genre[]> {
    return (
      await this.genreLoaderService.cachedPaginatedList(`songs:${song.slug}:genres`, (repo) =>
        repo
          .createQueryBuilder('g')
          .leftJoinAndSelect(SongGenre, 'sg', 'sg.music_genre_id = g.id')
          .where('sg.songId = :songId', { songId: song.id })
          .getManyAndCount()
      )
    )[0];
  }

  @ResolveField('fileUrl', () => String)
  async fileUrl(@Parent() song: Song) {
    return this.urlService.mediaUrl(song.filePath);
  }

  @ResolveField('imageUrl', () => String, { nullable: true })
  async imageUrl(@Parent() song: Song) {
    return this.urlService.mediaUrl(song.imagePath);
  }
  @ResolveField('downloadNumber', () => Number, { nullable: true })
  async downloadNumber(@Parent() song: Song) {
    const tones = await this.tones(song);
    return tones ? tones.map(item => item.huaweiOrderTimes).reduce((prev, curr) => prev + parseInt(curr), 0):0;
  }


  @ResolveField(() => Boolean, { nullable: true })
  async liked(@Parent() song: Song, @Context('accessToken') accessToken: string) {
    const member = await this.accountService.memberFromAccessToken(accessToken);
    if (member) return this.songService.likeLoader(member.id).load(song.id);
  }

  @ResolveField(() => RingBackTone, { nullable: true })
  async toneFromList(
    @Parent() song: Song,
    @Args('listId', { type: () => ID, nullable: true }) listGlobalId: string
  ) {
    const tones = await this.tones(song);
    return tones[0];
  }

  @Mutation(() => SongPayload)
  async likeSong(
    @Args('songId', { type: () => ID }) globalSongId: string,
    @Args('like') like: boolean,
    @Context('accessToken') accessToken: string | null
  ): Promise<SongPayload> {
    return this.resolvePayloadTask(
      this.songService.likeSong({ accessToken, songId: fromGlobalId(globalSongId).id, like })
    );
  }

  @Query(() => SongConnection)
  async likedSongs(
    @Args() connArgs: SongConnectionArgs,
    @Context('accessToken') accessToken: string
  ) {
    return pipe(
      this.accountService.requireLogin()({ accessToken }),
      taskEither.chain(({ msisdn, user: member }) => async () => {
        return either.right(
          await this.connectionPagingService.findAndPaginate(
            connArgs,
            (skip, take) =>
              this.songLoaderService.cachedPaginatedList(
                `${likedListCachePrefix(msisdn)}:songs:${skip}:${take}`,
                (songRepository) =>
                  songRepository
                    .createQueryBuilder('s')
                    .innerJoinAndSelect(FavoriteSong, 'fs', 'fs.songId = s.id')
                    .where('s.status = :active', { active: SONG_STATUS.ACTIVE })
                    .andWhere('fs.member_id = :memberId', { memberId: member.id })
                    .orderBy('fs.createdAt', 'DESC')
                    .take(take)
                    .skip(skip)
                    .getManyAndCount()
              ),
            { extraFields: ({ count: totalCount }) => ({ totalCount }) }
          )
        );
      }),
      this.resolveNullableTask
    );
  }

  @ResolveField(() => SongConnection)
  async songsFromSameSingers(@Parent() song: Song, @Args() connArgs: SongConnectionArgs) {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      async (skip, take) => {
        const singerIds = (await this.getSingers(song)).map((sg) => sg.id).sort();
        return this.songLoaderService.cachedPaginatedList(
          `singers:${singerIds.join('|')}:songs:${skip}:${take}`,
          (songRepository) =>
            songRepository
              .createQueryBuilder('s')
              .innerJoinAndSelect(SongSinger, 'sg', 'sg.song_id = s.id')
              .where('s.status = :active', { active: SONG_STATUS.ACTIVE })
              .andWhere('sg.singer_id in (:singers)', {
                singers: singerIds,
              })
              // .andWhere('sg.song_id <> :songId', { songId: song.id })
              .orderBy({ 's.id': 'DESC' })
              .take(take)
              .skip(skip)
              .getManyAndCount()
        );
      },
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @ResolveField(() => [RingBackTone])
  async tones(@Parent() song: Song): Promise<RingBackTone[]> {
    return this.ringBackToneLoaderService.loadOneToManyBy('vtSongId', song.id);
  }

  @ResolveField(() => CommentConnection)
  async comments(@Parent() song: Song, @Args() connArgs: CommentConnectionArgs) {
    return await this.connectionPagingService.findAndPaginate(
      connArgs,
      async (skip, take) => await this.socialService.findComments(song.id, skip, take),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }
}
