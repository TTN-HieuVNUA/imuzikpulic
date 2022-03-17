import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiHelperModule } from '../../api/api-helper.module';
import { UtilModule } from '../../infra';
import { AccountModule } from '../account';
import { SocialModule } from './../social/social.module';
import {
  ContentProviderDetailLoaderService,
  ContentProviderLoaderService,
  GenreLoaderService,
  RingBackToneLoaderService,
  SingerLoaderService,
  SongLoaderService,
  TopicLoaderService,
} from './loader-services';
import { ContentProviderDetail, FavoriteSong, MaybeYouLike, Song, Topic } from './models';
import { ContentProvider } from './models/content-provider.entity';
import { Genre } from './models/genre.entity';
import { RingBackTone } from './models/ring-back-tone.entity';
import { Singer } from './models/singer.entity';
import { SongGenre } from './models/song-genre.entity';
import { SongRankTable } from './models/song-rank-table.entity';
import { SongSinger } from './models/song-singer.entity';
import { TopicSong } from './models/topic-song.entity';
import { MusicService } from './music.service';
import { MusicSettings } from './music.settings';
import { ChartResolver } from './resolvers/chart.resolver';
import { ContentProviderResolver } from './resolvers/content-provider.resolver';
import { GenreResolver } from './resolvers/genre.resolver';
import { RingBackToneResolver } from './resolvers/ring-back-tone.resolver';
import { SingerResolver } from './resolvers/singer.resolver';
import { SongResolver } from './resolvers/song.resolver';
import { TopicResolver } from './resolvers/topic.resolver';
import { SongService } from './song.service';
import { RingBackToneCreationLoaderService } from './loader-services/ring-back-tone-creation.loader-service';
import { RingBackToneCreation } from './models/ring-back-tone-creation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContentProvider,
      ContentProviderDetail,
      Genre,
      MaybeYouLike,
      RingBackTone,
      RingBackToneCreation,
      Song,
      SongGenre,
      SongRankTable,
      Topic,
      TopicSong,
      Singer,
      SongSinger,
      FavoriteSong,
    ]),
    UtilModule,
    AccountModule,
    ApiHelperModule,
    SocialModule,
  ],
  providers: [
    ChartResolver,
    ContentProviderResolver,
    GenreResolver,
    MusicService,
    MusicSettings,
    RingBackToneResolver,
    SingerResolver,
    SingerResolver,
    SongResolver,
    SongService,
    TopicResolver,
    SongLoaderService,
    SingerLoaderService,
    GenreLoaderService,
    ContentProviderLoaderService,
    ContentProviderDetailLoaderService,
    RingBackToneLoaderService,
    TopicLoaderService,
    RingBackToneCreationLoaderService,
  ],
  exports: [MusicService, RingBackToneCreationLoaderService, SongLoaderService],
})
export class MusicModule {}
