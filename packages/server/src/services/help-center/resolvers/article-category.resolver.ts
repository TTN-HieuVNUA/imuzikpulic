import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader = require('dataloader');
import _ = require('lodash/fp');
import LRUCache = require('lru-cache');
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config/config';
import { lruCacheMap } from '../../../infra/util';
import { HelpCenter } from '../models/HelpCenter.entity';
import { HelpCenterCategory } from '../models/HelpCenterCategory.entity';
import { HelpCenterCategoryTranslation } from '../models/HelpCenterCategoryTranslation.entity';
import { HelpCenterTranslation } from '../models/HelpCenterTranslation.entity';
import { HelpArticleCategory } from '../schemas/article-category.entity';
import { HelpArticle } from '../schemas/article.entity';

const ALL_CAT_KEY = 'all-cats-key';

@Resolver(() => HelpArticleCategory)
export class ArticleCategoryResolver {
  constructor(
    @InjectRepository(HelpCenterTranslation)
    private helpCenterTranslationRepository: Repository<HelpCenterTranslation>,
    @InjectRepository(HelpCenterCategoryTranslation)
    private helpCenterCategoryTranslationRepository: Repository<HelpCenterCategoryTranslation>,
    private config: Config
  ) {}
  articleListLruCache = new LRUCache<string, HelpCenterTranslation[]>({
    maxAge: ms(this.config.CACHE_LONG_TIMEOUT),
  });
  categoryListLruCache = new LRUCache<string, HelpCenterCategoryTranslation[]>({
    maxAge: ms(this.config.CACHE_LONG_TIMEOUT),
  });

  private categoryLoader = new DataLoader<string, HelpCenterCategoryTranslation | null>(
    async (keys) => {
      const entities = await this.helpCenterCategoryTranslationRepository
        .createQueryBuilder('cat_tran')
        .leftJoin(HelpCenterCategory, 'cat', 'cat_tran.id = cat.id')
        .where('cat.is_active = 1')
        .where('cat_tran.slug in (:keys)', { keys })
        .getMany();
      return keys.map((key) => entities.find((e) => e.slug === key) ?? null);
    }
  );

  @Query(() => [HelpArticleCategory])
  async helpArticleCategories() {
    let cats: HelpCenterCategoryTranslation[] | undefined = this.categoryListLruCache.get(
      ALL_CAT_KEY
    );
    if (!cats) {
      cats = await this.helpCenterCategoryTranslationRepository
        .createQueryBuilder('cat_tran')
        .leftJoin(HelpCenterCategory, 'cat', 'cat_tran.id = cat.id')
        .where('cat.is_active = 1')
        .orderBy('cat.order_number', 'ASC')
        .getMany();

      cats.forEach((cat) => cat.slug && this.categoryLoader.prime(cat.slug, cat));
      this.categoryListLruCache.set(ALL_CAT_KEY, cats);
    }

    return cats;
  }

  @Query(() => HelpArticleCategory, { nullable: true })
  async helpArticleCategory(@Args('slug') slug: string) {
    return this.categoryLoader.load(slug);
  }

  private articleLoader = new DataLoader<string, HelpCenterTranslation[]>(
    async (keys) => {
      const { entities, raw } = await this.helpCenterTranslationRepository
        .createQueryBuilder('a_tran')
        .leftJoinAndSelect(HelpCenter, 'a', 'a_tran.id = a.id')
        .where('a.is_active = 1')
        .andWhere('a.help_center_category_id in (:keys)', { keys })
        .orderBy('a.order_number', 'ASC')
        .getRawAndEntities();
      const pairs = _.zip(entities, raw);
      return keys.map((key) =>
        pairs.filter((p) => p[1].a_help_center_category_id === key).map((p) => p[0]!)
      );
    },
    { cacheMap: lruCacheMap(this.articleListLruCache) }
  );

  @ResolveField(() => [HelpArticle])
  async articles(@Parent() cat: HelpCenterCategoryTranslation) {
    return this.articleLoader.load(cat.id);
  }
}
