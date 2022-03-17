import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { pipe } from 'fp-ts/lib/pipeable';
import { fromGlobalId } from 'graphql-relay';

import { StringPayload } from '../../../api';
import { BaseResolver } from '../../../api/base.resolver';
import { ConnectionPagingService } from '../../../api/paging/connection-paging.service';
import { LoggingService } from '../../../infra/logging';
import { PublicUser } from '../../account/account.schemas';
import { Comment } from '../models';
import { AccountService } from './../../account/account.service';
import { CommentPayload } from './../social.schemas';
import { SocialService } from './../social.service';

@Resolver(() => Comment)
export class CommentResolver extends BaseResolver {
  constructor(
    private connectionPagingService: ConnectionPagingService,
    private socialService: SocialService,
    private accountService: AccountService,
    loggingService: LoggingService
  ) {
    super(loggingService.getLogger('comment-resolver'));
  }
  // @ResolveField(() => [Reply])
  // async replies(/*@Parent() comment: Comment*/) {
  //   return [
  //   ].map((r) => Object.assign(new Reply(), r));
  // }

  @ResolveField(() => PublicUser, { nullable: true })
  async user(@Parent() comment: Comment) {
    return this.accountService.getPublicUser(comment.userId);
  }

  @ResolveField(() => Number, { nullable: true })
  async likes(@Parent() comment: Comment) {
    return comment.likedBy?.length;
  }

  @ResolveField(() => Boolean, { nullable: true })
  async liked(@Parent() comment: Comment, @Context('accessToken') accessToken: string) {
    const payload = await this.accountService.memberFromAccessToken(accessToken);
    if (payload) return comment.likedBy?.includes(payload?.id);
  }

  @Query(() => Comment, { nullable: true })
  async comment(@Args('commentId', { type: () => ID }) commentId: string): Promise<Comment | null> {
    return pipe(
      fromGlobalId(commentId).id,
      this.socialService.getComment,
      this.resolveNullableTask
    );
  }

  @Mutation(() => CommentPayload)
  async createComment(
    @Args('songId', { type: () => ID }) songId: string,
    @Args('content') content: string,
    @Context('accessToken') accessToken: string
  ): Promise<CommentPayload> {
    return pipe(
      { accessToken, songId: fromGlobalId(songId).id, content },
      this.socialService.createComment,
      this.resolvePayloadTask
    );
  }

  @Mutation(() => StringPayload)
  async deleteComment(
    @Args('commentId', { type: () => ID }) commentId: string,
    @Context('accessToken') accessToken: string
  ): Promise<StringPayload> {
    return pipe(
      { accessToken, commentId: fromGlobalId(commentId).id },
      this.socialService.deleteComment,
      this.resolvePayloadTask
    );
  }

  @Mutation(() => CommentPayload)
  async likeComment(
    @Args('commentId', { type: () => ID }) commentId: string,
    @Args('like') like: boolean,
    @Context('accessToken') accessToken: string
  ): Promise<CommentPayload> {
    return pipe(
      { accessToken, commentId: fromGlobalId(commentId).id, like },
      this.socialService.likeComment,
      this.resolvePayloadTask
    );
  }
}
