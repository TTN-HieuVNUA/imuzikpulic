import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Raw } from 'typeorm';
import { Config } from '../../../infra/config/config';
import { Article,ARTICLE_ACTIVE } from '../models/article.entity';
import { ArticleLoaderService } from './../loader-services/article.loader-service';
import { ConnectionPagingService } from '../../../api/paging/connection-paging.service';
import {SongLoaderService } from '../../music/loader-services/song.loader-service';
import ms = require('ms');
import {
    ArticleTranslationConnection,
    ArticleTranslationConnectionArgs,
  } from '../article.schemas';
import { Song } from '../../music';
import { ArticleTranslation } from '../models/article-translation.entity';
import { ArticleTranslationLoaderService } from '../loader-services/article-translation.loader-service';

@Resolver(() => ArticleTranslation)
export class ArticleResolver {
  constructor(
    private articleLoaderService: ArticleLoaderService,
    private articleTranslationLoaderService: ArticleTranslationLoaderService,
    private connectionPagingService: ConnectionPagingService,
    private songLoaderService: SongLoaderService,
    private config: Config
    
  ) {}

  @Query(() => ArticleTranslation, { nullable: true })
  async article(@Args('slug') slug: string): Promise<ArticleTranslation | null> {
    return this.articleTranslationLoaderService.loadBy('slug', slug);
  }

  @Query(() => ArticleTranslationConnection)
  async articles(@Args() connArgs: ArticleTranslationConnectionArgs) {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.articleTranslationLoaderService.cachedPaginatedList(
          `articles:${skip}:${take}}`,
          (articleTranslationRepository) =>
          articleTranslationRepository
          .createQueryBuilder('s')
          .innerJoinAndSelect(Article, 'a', 's.id = a.id')
          .where('a.status = :active', { active: ARTICLE_ACTIVE })
          .orderBy({ 's.id': 'DESC' })
          .take(take)
          .skip(skip)
          .getManyAndCount(),
          ms(this.config.CACHE_LONG_TIMEOUT)
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @ResolveField('song', () => Song, { nullable: true })
  async song(@Parent() artice: ArticleTranslation) {
    return this.songLoaderService.loadBy("id",artice.song_id);
  }
  
  @ResolveField('image_path', () => String, { nullable: true })
  async image_path(@Parent() artice: ArticleTranslation) {
    const article = await this.articleLoaderService.loadBy("id",artice.id);
    return "http://imedia.imuzik.com.vn"+article?.image_path;
  }

  @ResolveField('published_time', () => Date, { nullable: true })
  async published_time(@Parent() artice: ArticleTranslation) {
    const article = await this.articleLoaderService.loadBy("id",artice.id);
    return article?.published_time
  }
  
  @ResolveField(() => ArticleTranslationConnection)
  async articlesRelation(@Parent() articleTranslation: ArticleTranslation, @Args() connArgs: ArticleTranslationConnectionArgs) {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      async (skip, take) => {
        //const relatedIds = artice.inner_related_article?.split(',')??[];
        const articleId = articleTranslation.id;
        return this.articleTranslationLoaderService.cachedPaginatedList(
          `relatedArticles:${articleId}:${skip}:${take}`,
          (articleTranslationRepository) =>
          articleTranslationRepository
              .createQueryBuilder('s')
              .innerJoinAndSelect(Article, 'a', 's.id = a.id')
              .where('a.status = :active', { active: ARTICLE_ACTIVE })
              .andWhere('s.id not in (:articleId)', {
                articleId: articleId,
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
}
