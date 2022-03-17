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

import { ConnectionPagingService, StringPayload } from '../../../api';
import { BaseResolver } from '../../../api/base.resolver';
import { Node } from '../../../api/nodes';
import { LoggingService } from '../../../infra/logging';
import { AccountService } from '../../account';
import { Spam, SPAM_SENT, SPAM_STATUS_ACTIVE } from '../models/spam.entity';
import { SpamConnection, SpamConnectionArgs, SpamPayload } from '../spam.schemas';
import { SpamLoaderService, SpamService } from '../spam.service';
import { MarketingService } from './../marketing.service';

@Resolver(() => Spam)
export class SpamResolver extends BaseResolver {
  constructor(
    private spamService: SpamService,
    private spamLoaderService: SpamLoaderService,
    private accountService: AccountService,
    private marketingService: MarketingService,
    private connectionPagingService: ConnectionPagingService,
    loggingService: LoggingService
  ) {
    super(loggingService.getLogger('spam-resolver'));
  }

  @Query(() => SpamConnection)
  async spams(@Args() connArgs: SpamConnectionArgs) {
    return this.connectionPagingService.findAndPaginate(
      connArgs,
      (skip, take) =>
        this.spamLoaderService.cachedPaginatedList(`spams:${skip}:${take}`, (spamRepository) =>
          spamRepository.findAndCount({
            where: { isSent: SPAM_SENT, status: SPAM_STATUS_ACTIVE },
            order: { updatedAt: 'DESC' },
            skip,
            take,
          })
        ),
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @Mutation(() => SpamPayload)
  async markSpamAsSeen(
    @Args('spamId', { type: () => ID }) spamId: string,
    @Args('seen') seen: boolean,
    @Context('accessToken') accessToken: string | null
  ): Promise<SpamPayload> {
    return this.resolvePayloadTask(this.spamService.markSpamAsSeen({ accessToken, seen, spamId }));
  }

  @Mutation(() => StringPayload)
  async recordSpamClick(
    @Args('spamId', { type: () => ID }) spamId: string
  ): Promise<StringPayload> {
    return this.resolvePayloadTask(this.spamService.recordSpamClick({ spamId }));
  }

  @ResolveField(() => Node, { nullable: true })
  async item(@Parent() spam: Spam) {
    return this.marketingService.getMarketingItem(spam);
  }

  @ResolveField(() => Boolean, { nullable: true })
  async seen(@Parent() spam: Spam, @Context('accessToken') accessToken: string) {
    const member = await this.accountService.memberFromAccessToken(accessToken);
    if (member?.username) return this.spamService.seenLoader(member.username)?.load(spam.id);
  }
}
