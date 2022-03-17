import { Injectable } from '@nestjs/common';
import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { BaseResolver } from '../../../api/base.resolver';
import { LoggingService } from '../../../infra/logging';
import { AccountService } from '../../account';
import { RbtGroupService } from '../rbt-group.service';
import { GroupInfo, GroupTimeSetting, UsedTone } from '../rbt.schemas';

@Injectable()
@Resolver(() => GroupInfo)
export class GroupInfoResolver extends BaseResolver {
  constructor(
    loggingService: LoggingService,
    private accountService: AccountService,
    private rbtGroupService: RbtGroupService
  ) {
    super(loggingService.getLogger('api'));
  }

  @ResolveField(() => [UsedTone], { nullable: true })
  async usedTones(@Context('accessToken') accessToken: string | null, @Parent() parent: any) {
    return this.resolveNullableTask(
      this.rbtGroupService.getUsedTones({ accessToken, groupCode: parent.id })
    );
  }
  @ResolveField(() => GroupTimeSetting, { nullable: true })
  async timeSetting(@Context('accessToken') accessToken: string | null, @Parent() parent: any) {
    return this.resolveNullableTask(
      this.rbtGroupService.getTimeSetting({ accessToken, groupCode: parent.id })
    );
  }
}
