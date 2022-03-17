import { Field, ID, ObjectType } from '@nestjs/graphql';

import { HelpArticle } from './article.entity';

@ObjectType()
export class HelpArticleCategory {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  slug: string;

  @Field(() => [HelpArticle])
  articles: HelpArticle[];
}
