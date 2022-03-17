import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HelpCenter } from './models/HelpCenter.entity';
import { HelpCenterCategory } from './models/HelpCenterCategory.entity';
import { HelpCenterCategoryTranslation } from './models/HelpCenterCategoryTranslation.entity';
import { HelpCenterTranslation } from './models/HelpCenterTranslation.entity';
import { ArticleCategoryResolver } from './resolvers/article-category.resolver';
import { ArticleResolver } from './resolvers/article.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HelpCenter,
      HelpCenterCategoryTranslation,
      HelpCenterCategory,
      HelpCenterTranslation,
    ]),
  ],
  providers: [ArticleResolver, ArticleCategoryResolver],
})
export class HelpCenterModule {}
