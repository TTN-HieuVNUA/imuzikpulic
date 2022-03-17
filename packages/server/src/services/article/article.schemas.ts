import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

import {
  ConnectionArgs,
  ConnectionType,
  EdgeType,
} from '../../api/paging/connection-paging.schemas';
import { ArticleTranslation } from './models/article-translation.entity';


@ObjectType()
export class ArticleArticleTranslationEdge extends EdgeType(ArticleTranslation) {}

@ObjectType()
export class ArticleTranslationConnection extends ConnectionType(ArticleTranslation, ArticleArticleTranslationEdge) {
  @Field()
  totalCount: number;
}

@ArgsType()
export class ArticleTranslationConnectionArgs extends ConnectionArgs {
  // @Field(type => SongWhereInput, { nullable: true })
  // where?: SongWhereInput;
  // @Field(type => SongOrderByInput, { nullable: true })
  // orderBy?: SongOrderByInput;
}




