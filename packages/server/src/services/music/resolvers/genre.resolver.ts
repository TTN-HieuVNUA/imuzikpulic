import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import stringify = require('json-stable-stringify');
import ms = require('ms');

import { ConnectionPagingService } from '../../../api/paging/connection-paging.service';
import { Config } from '../../../infra/config/config';
import { addKeyPrefix } from '../../../infra/util/functions';
import { UrlService } from '../../../infra/util/url/url.service';
import { Genre, SONG_STATUS } from '../models';
import { GENRE_ACTIVE } from '../models/genre.entity';
import { SongGenre } from '../models/song-genre.entity';
import {
  GenreConnection,
  GenreConnectionArgs,
  SongConnection,
  SongConnectionArgs,
} from '../music.schemas';
import { GenreLoaderService, SongLoaderService } from './../loader-services';

@Resolver(() => Genre)
export class GenreResolver {
  constructor(
    private genreLoaderService: GenreLoaderService,
    private songLoaderService: SongLoaderService,
    private urlService: UrlService,
    private connectionPagingService: ConnectionPagingService,
    private config: Config
  ) {}

  @Query(() => Genre, { nullable: true })
  async genre(@Args('slug') slug: string) {
    return this.genreLoaderService.loadBy('slug', slug);
  }

  @Query(() => [Genre])
  async hotGenres() {
    return (
      await this.genreLoaderService.cachedPaginatedList(`hotGenres`, (genreRepository) =>
        genreRepository.findAndCount({
          where: { isActive: GENRE_ACTIVE
		//, isHot: 1 
		},
          take: 4,
        })
      )
    )[0];
  }

  @Query(() => GenreConnection)
  async genres(@Args() connArgs: GenreConnectionArgs) {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.genreLoaderService.cachedPaginatedList(
          `generes:${skip}:${take}}`,
          (genreRepository) =>
            genreRepository.findAndCount({
              where: { isActive: GENRE_ACTIVE },
              take,
              skip,
            }),
          ms(this.config.CACHE_LONG_TIMEOUT)
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @ResolveField('imageUrl', () => String, { nullable: true })
  async imageUrl(@Parent() genre: Genre) {
    return this.urlService.mediaUrl(genre.imagePath);
  }
  @ResolveField('description', () => String, { nullable: true })
  async description() {
    return null; //TODO: genre description
  }
  @ResolveField('songs', () => SongConnection)
  async songs(@Parent() genre: Genre, @Args() connArgs: SongConnectionArgs) {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.songLoaderService.cachedPaginatedList(
          `genre:${genre.slug}:songs:${skip}:${take}:${stringify(connArgs.orderBy || '')}}`,
          (songRepository) =>
            songRepository
              .createQueryBuilder('s')
              .innerJoinAndSelect(SongGenre, 'sg', 'sg.song_id = s.id')
              .where('s.status = :active', { active: SONG_STATUS.ACTIVE })
              .andWhere('sg.music_genre_id = :genreId', { genreId: genre.id })
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
