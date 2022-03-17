import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { GroupTimeSetting, TimeTypeFromInt } from '../rbt.schemas';

@Resolver(GroupTimeSetting)
export class GroupTimeSettingResolver {
  @ResolveField('timeType')
  timeType(@Parent() parent: { timeType: string }) {
    return TimeTypeFromInt[parent.timeType];
  }
}
