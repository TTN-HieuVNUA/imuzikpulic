import { Field, ID, ObjectType, registerEnumType, ResolveField, Resolver } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';

import { Payload } from '../../api';
import { Node } from '../../api/nodes';
import { RingBackTone } from '../music';

@ObjectType()
export class ReverseRbt {
  @Field(() => ID)
  id: string;
  @Field()
  status: string;
  @Field()
  title: string;
  @Field()
  description: string;
}
@ObjectType()
export class RbtPopup {
  @Field(() => ID)
  id: string;
  @Field()
  brandId: string;
  @Field()
  title: string;
  @Field()
  content: string;
  @Field()
  note: string;
}

@ObjectType()
export class RbtDownload {
  @Field()
  id: string;
  @Field()
  toneCode: string;
  @Field()
  toneName: string;
  @Field()
  singerName: string;
  @Field()
  price: string;
  @Field({ nullable: true })
  personID: string;
  @Field()
  availableDateTime: string;
  @Field(() => RingBackTone, { nullable: true })
  tone?: RingBackTone;
}

export interface MyRbtInfo {
  status: number;
  name?: string;
  note?: string;
  brandId: string;
  reverse?: ReverseRbt;
  packageName: string;
  popup?: RbtPopup;
}

@ObjectType()
export class CallGroup {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
}

@ObjectType({ implements: Payload })
export class GroupPayload extends Payload<CallGroup> {
  @Field(() => CallGroup, { nullable: true })
  result: CallGroup | null;
}

@ObjectType()
export class GroupMember {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  number: string;
}

@ObjectType()
export class UsedTone {
  @Field(() => ID)
  id: string;
  @Field()
  used: boolean;
  @Field(() => RbtDownload)
  tone: RbtDownload;
}
export enum TimeType {
  ALWAYS = 1,
  DAILY,
  WEEKLY,
  MONTHLY,
  YEARLY,
  RANGE,
}

export const TimeTypeFromInt: { [t: string]: TimeType | undefined } = {
  1: TimeType.ALWAYS,
  2: TimeType.DAILY,
  3: TimeType.WEEKLY,
  4: TimeType.MONTHLY,
  5: TimeType.YEARLY,
  6: TimeType.RANGE,
};

registerEnumType(TimeType, {
  name: 'TimeType',
});

@Resolver('TimeType')
export class TimeTypeResolver {
  @ResolveField('ALWAYS')
  getAlways() {
    return '1';
  }
  @ResolveField('DAILY')
  getDaily() {
    return '2';
  }
  @ResolveField('WEEKLY')
  getWeekly() {
    return '3';
  }
  @ResolveField('MONTHLY')
  getMonthly() {
    return '4';
  }
  @ResolveField('YEARLY')
  getYearly() {
    return '5';
  }
  @ResolveField('RANGE')
  getRange() {
    return '6';
  }
}

@ObjectType()
export class GroupTimeSetting {
  @Field(() => ID)
  id: string;
  @Field(() => TimeType)
  timeType: TimeType;
  @Field({ nullable: true })
  startTime?: string;
  @Field({ nullable: true })
  endTime?: string;
}
@ObjectType()
export class GroupInfo {
  @Field(() => ID)
  id: string;
  @Field({ nullable: true })
  note?: string;
  @Field(() => [GroupMember])
  members: GroupMember[];
}

@ObjectType()
export class MyRbt {
  @Field()
  status: number;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  note?: string;
  @Field()
  brandId: string;

  @Field(() => ReverseRbt, { nullable: true })
  reverse?: ReverseRbt;
  @Field()
  packageName: string;
  @Field(() => RbtPopup, { nullable: true })
  popup?: RbtPopup;
}

@ObjectType({ implements: Node })
export class RbtPackage implements Node {
  static TYPE = 'Package';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(RbtPackage.TYPE, this.brandId);
  }
  @Field()
  name: string;
  @Field()
  brandId: string;
  @Field()
  period: string;
  @Field()
  price: string;
  @Field()
  note?: string;
}
