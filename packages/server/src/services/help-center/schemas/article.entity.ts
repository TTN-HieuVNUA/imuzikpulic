import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HelpArticle {
  @Field(() => ID)
  id: string;
  @Field()
  title: string;
  @Field()
  body: string;
}
