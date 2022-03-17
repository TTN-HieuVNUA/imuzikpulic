import { Args, Context, ID, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { pipe } from 'fp-ts/lib/pipeable';
import { fromGlobalId } from 'graphql-relay';

import { ReplyPayload } from '..';
import { BaseResolver } from '../../../api/base.resolver';
import { StringPayload } from '../../../api/common.schemas';
import { ConnectionPagingService } from '../../../api/paging/connection-paging.service';
import { LoggingService } from '../../../infra/logging';
import { PublicUser } from '../../account/account.schemas';
import { Reply } from '../models';
import { AccountService } from './../../account/account.service';
import { SocialService } from './../social.service';

@Resolver(() => Reply)
export class ReplyResolver extends BaseResolver {
  constructor(
    private connectionPagingService: ConnectionPagingService,
    private socialService: SocialService,
    private accountService: AccountService,
    loggingService: LoggingService
  ) {
    super(loggingService.getLogger('reply-resolver'));
  }

  @ResolveField(() => PublicUser, { nullable: true })
  async user(@Parent() reply: Reply) {
    return this.accountService.getPublicUser(reply.userId);
  }

  @Mutation(() => ReplyPayload)
  async createReply(
    @Args('commentId', { type: () => ID }) commentId: string,
    @Args('content') content: string,
    @Context('accessToken') accessToken: string
  ): Promise<ReplyPayload> {
    return pipe(
      { accessToken, commentId: fromGlobalId(commentId).id, content },
      this.socialService.createReply,
      this.resolvePayloadTask
    );
  }
  @Mutation(() => StringPayload)
  async deleteReply(
    @Args('commentId', { type: () => ID }) commentId: string,
    @Args('replyId', { type: () => ID }) replyId: string,
    @Context('accessToken') accessToken: string
  ): Promise<StringPayload> {
    return pipe(
      { accessToken, commentId: fromGlobalId(commentId).id, replyId: fromGlobalId(replyId).id },
      this.socialService.deleteReply,
      this.resolvePayloadTask
    );
  }
}
