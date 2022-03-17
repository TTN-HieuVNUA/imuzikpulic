import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { StringPayload } from '../../api';
import { LoggingService } from '../../infra/logging';
import { BaseResolver } from './../../api/base.resolver';
import { UrlService } from './../../infra/util/url/url.service';
import { MemberPayload, UpdatePasswordArgs, UpdateProfileArgs } from './account.schemas';
import { AccountService } from './account.service';
import { Member } from './models/member.entity';
import { Sex } from './sex.enum';

@Resolver(() => Member)
export class MemberResolver extends BaseResolver {
  constructor(
    private accountService: AccountService,
    loggingService: LoggingService,
    private urlService: UrlService
  ) {
    super(loggingService.getLogger('member-resolver'));
  }

  @Query(() => Member, { nullable: true })
  async me(@Context('accessToken') accessToken: string) {
    const payload = await this.accountService.memberFromAccessToken(accessToken);
    if (payload) {
      return this.accountService.findMemberById(payload.id);
    }
  }

  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() member: Member) {
    return this.urlService.memberAvatarUrl(member.avatarImage);
  }

  @ResolveField(() => Sex, { nullable: true })
  sex(@Parent() member: Member) {
    return member.sex || null;
  }

  @Mutation(() => MemberPayload)
  async updateProfile(
    @Args() profile: UpdateProfileArgs,
    @Context('accessToken') accessToken: string | null
  ) {
    return this.resolvePayloadTask(this.accountService.updateProfile({ accessToken, profile }));
  }

  @Mutation(() => MemberPayload)
  async updateAvatar(
    @Args('avatar') avatar: string,
    @Args('extension') extension: string,
    @Context('accessToken') accessToken: string | null
  ) {
    return this.resolvePayloadTask(
      this.accountService.updateAvatar({ accessToken, avatar, extension })
    );
  }

  @Mutation(() => StringPayload)
  async updatePassword(
    @Args() passwords: UpdatePasswordArgs,
    @Context('accessToken') accessToken: string | null,
    @Context('authorizationCode') authorizationCode: string
  ) {
    return this.resolvePayloadTask(
      this.accountService.updatePassword({ accessToken, passwords, authorizationCode })
    );
  }
}
