import { Resolver } from '@nestjs/graphql';

import { HelpArticle } from '../schemas/article.entity';

@Resolver(() => HelpArticle)
export class ArticleResolver {}
