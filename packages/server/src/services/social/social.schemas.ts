import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Payload } from '../../api/common.schemas';
import {
  ConnectionArgs,
  ConnectionType,
  EdgeType,
} from '../../api/paging/connection-paging.schemas';
import { OrderByDirection } from '../../api/paging/order-by-direction';
import { Comment, Reply } from './models';

@ObjectType()
export class CommentEdge extends EdgeType(Comment) {}

@ObjectType()
export class CommentConnection extends ConnectionType(Comment, CommentEdge) {
  @Field()
  totalCount: number;
}

@InputType()
export class CommentOrderByInput {
  @Field(() => OrderByDirection, { nullable: true })
  updatedAt?: OrderByDirection;

  @Field(() => OrderByDirection, { nullable: true })
  likesNumber?: OrderByDirection;
}

@ArgsType()
export class CommentConnectionArgs extends ConnectionArgs {
  // @Field(type => CommentWhereInput, { nullable: true })
  // where?: CommentWhereInput;
  @Field(() => CommentOrderByInput, { nullable: true })
  orderBy?: CommentOrderByInput;
}

@ObjectType()
export class ReplyEdge extends EdgeType(Reply) {}

@ObjectType()
export class ReplyConnection extends ConnectionType(Reply, ReplyEdge) {
  @Field()
  totalCount: number;
}

@InputType()
export class ReplyOrderByInput {
  @Field(() => OrderByDirection, { nullable: true })
  updatedAt?: OrderByDirection;

  @Field(() => OrderByDirection, { nullable: true })
  likesNumber?: OrderByDirection;
}

@ArgsType()
export class ReplyConnectionArgs extends ConnectionArgs {
  // @Field(type => CommentWhereInput, { nullable: true })
  // where?: CommentWhereInput;
  @Field(() => ReplyOrderByInput, { nullable: true })
  orderBy?: ReplyOrderByInput;
}

@ObjectType({ implements: Payload })
export class CommentPayload extends Payload<Comment> {
  @Field(() => Comment, { nullable: true })
  result: Comment | null;
}

@ObjectType({ implements: Payload })
export class ReplyPayload extends Payload<Reply> {
  @Field(() => Reply, { nullable: true })
  result: Reply | null;
}

@ObjectType()
export class SingerLikes {
  @Field(() => ID)
  id: string;
  @Field()
  totalCount: number;
  @Field(() => Boolean, { nullable: true })
  liked?: boolean;
}
