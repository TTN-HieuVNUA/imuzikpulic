import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilModule } from '../../infra';
import { ArticleService } from './article.service';
import { Article } from './models/article.entity';
import { ArticleResolver } from './resolvers/article.resolver';
import { ArticleLoaderService } from './loader-services/article.loader-service';
import { ApiHelperModule } from '../../api/api-helper.module';
import {SongLoaderService } from '../music/loader-services/song.loader-service';
import { MusicModule, Song } from '../music';
import { ArticleTranslationLoaderService } from './loader-services/article-translation.loader-service';
import { ArticleTranslation } from './models/article-translation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Article,
        ArticleTranslation,
        Song
    ]),
    UtilModule,
    ApiHelperModule,
    MusicModule
  ],
  providers: [
    ArticleService,
    ArticleLoaderService,
    ArticleResolver,
    SongLoaderService,
    ArticleTranslationLoaderService,
  ],
})
export class ArticleModule {}
