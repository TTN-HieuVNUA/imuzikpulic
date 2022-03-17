import { Injectable } from '@nestjs/common';
import { Args, Context, ID, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { BaseResolver } from '../../../api/base.resolver';
import { StringPayload } from '../../../api/common.schemas';
import { LoggingService } from '../../../infra/logging';
import { RingBackTone } from '../../music/models';
import { RbtGroupService } from '../rbt-group.service';
import {
  CallGroup,
  GroupInfo,
  GroupPayload,
  MyRbt,
  RbtDownload,
  RbtPackage,
  TimeType,
} from '../rbt.schemas';
import { RbtService } from '../rbt.service';

@Injectable()
@Resolver(() => MyRbt)
export class MyRbtResolver extends BaseResolver {
  constructor(
    private rbtService: RbtService,
    private rbtGroupService: RbtGroupService,
    loggingService: LoggingService
  ) {
    super(loggingService.getLogger('api'));
  }

  @Query(() => MyRbt, { nullable: true })
  async myRbt(@Context('accessToken') accessToken: string | null) {
    return this.resolveNullableTask(this.rbtService.getStatus({ accessToken }));
  }

  @Query(() => [RbtPackage], { nullable: true })
  async rbtPackages() {
    return await this.resolveNullableTask(this.rbtService.rbtPackages());
  }

  @Mutation(() => StringPayload)
  async pauseRbt(@Context('accessToken') accessToken: string | null) {
    return await this.resolvePayloadTask(this.rbtService.pause({ accessToken }));
  }

  @Mutation(() => StringPayload)
  async activateRbt(@Context('accessToken') accessToken: string | null) {
    return await this.resolvePayloadTask(this.rbtService.activate({ accessToken }));
  }

  @Mutation(() => StringPayload)
  async cancelRbt(@Context('accessToken') accessToken: string | null) {
    return await this.resolvePayloadTask(this.rbtService.cancel({ accessToken }));
  }

  @Mutation(() => StringPayload)
  async deleteRbt(
    @Context('accessToken') accessToken: string | null,
    @Args('personId') personId: string,
    @Args('rbtCode') toneCode: string,
    @Context('channel') channel: string
  ) {
    return await this.resolvePayloadTask(
      this.rbtService.delete({ accessToken, personId, toneCode, channel })
    );
  }

  @Mutation(() => StringPayload)
  async registerRbt(
    @Context('accessToken') accessToken: string | null,
    @Args('brandId', { type: () => ID }) brandId: string
  ) {
    return await this.resolvePayloadTask(this.rbtService.register({ accessToken, brandId }));
  }

  @Mutation(() => StringPayload)
  async downloadRbt(
    @Context('accessToken') accessToken: string | null,
    @Args('rbtCodes', { type: () => [String] }) toneCodes: string[],
    @Context('channel') channel: string,
    @Args('brandId', { nullable: true }) brandId?: string
  ) {
    return await this.resolvePayloadTask(
      this.rbtService.download({ accessToken, toneCodes, brandId, channel })
    );
  }

  @Mutation(() => StringPayload)
  async giftRbt(
    @Context('accessToken') accessToken: string | null,
    @Args('msisdn') givenTargetMsisdn: string,
    @Args('rbtCodes', { type: () => [String] }) toneCodes: string[],
    @Context('channel') channel: string
  ) {
    return await this.resolvePayloadTask(
      this.rbtService.gift({ accessToken, toneCodes, givenTargetMsisdn, channel })
    );
  }

  @Mutation(() => StringPayload)
  async setReverseRbt(
    @Context('accessToken') accessToken: string | null,
    @Args('active') active: boolean
  ) {
    return await this.resolvePayloadTask(this.rbtService.reverse({ accessToken, active }));
  }

  @Mutation(() => GroupPayload)
  async createRbtGroup(
    @Context('accessToken') accessToken: string | null,
    @Args('groupName') groupName: string
  ) {
    return await this.resolvePayloadTask(this.rbtGroupService.createGroup({ accessToken, groupName }));
  }

  @Mutation(() => StringPayload)
  async deleteRbtGroup(
    @Context('accessToken') accessToken: string | null,
    @Args('groupId', { type: () => ID }) groupCode: string
  ) {
    return await this.resolvePayloadTask(this.rbtGroupService.deleteGroup({ accessToken, groupCode }));
  }

  @Mutation(() => StringPayload)
  async addRbtGroupMember(
    @Context('accessToken') accessToken: string | null,
    @Args('groupId', { type: () => ID }) groupCode: string,
    @Args('memberName') memberName: string,
    @Args('memberNumber') memberNumber: string
  ) {
    return await this.resolvePayloadTask(
      this.rbtGroupService.addGroupMember({
        accessToken,
        memberName,
        memberNumber,
        groupCode,
      })
    );
  }
  @Mutation(() => StringPayload)
  async removeRbtGroupMember(
    @Context('accessToken') accessToken: string | null,
    @Args('groupId', { type: () => ID }) groupCode: string,
    @Args('memberNumber') memberNumber: string
  ) {
    return await this.resolvePayloadTask(
      this.rbtGroupService.removeGroupMember({
        accessToken,
        memberNumber,
        groupCode,
      })
    );
  }

  @Mutation(() => StringPayload)
  async setRbtGroupTones(
    @Context('accessToken') accessToken: string | null,
    @Args('groupId', { type: () => ID }) groupCode: string,
    @Args('rbtCodes', { type: () => [String] }) toneCodes: string[]
  ) {
    return await this.resolvePayloadTask(
      this.rbtGroupService.setGroupTones({
        accessToken,
        groupCode,
        toneCodes,
      })
    );
  }
  @Mutation(() => StringPayload)
  async setRbtGroupTime(
    @Context('accessToken') accessToken: string | null,
    @Args('groupId', { type: () => ID }) groupCode: string,
    @Args('timeType', { type: () => TimeType }) timeType: TimeType,
    @Args('startTime', { nullable: true }) startTime: Date,
    @Args('endTime', { nullable: true }) endTime: Date
  ) {
    return await this.resolvePayloadTask(
      this.rbtGroupService.setTime({
        accessToken,
        groupCode,
        startTime,
        endTime,
        timeType: `${timeType}`,
      })
    );
  }

  @Query(() => GroupInfo, { nullable: true })
  async groupInfo(
    @Context('accessToken') accessToken: string | null,
    @Args('groupId', { type: () => ID }) groupCode: string
  ) {
    return await this.resolveNullableTask(this.rbtGroupService.getGroupInfo({ accessToken, groupCode }));
  }
  @Query(() => [RingBackTone], { nullable: true })
  async copyRbt(
    @Context('accessToken') accessToken: string | null,
    @Args('msisdn') givenTargetMsisdn: string
  ) {
    return await this.resolveNullableTask(
      this.rbtService.copyRingTones({ accessToken, givenTargetMsisdn })
    );
  }
  @ResolveField(() => [RbtDownload], { nullable: true })
  async downloads(@Context('accessToken') accessToken: string | null) {
    return await this.resolveNullableTask(this.rbtService.getRingTones({ accessToken }));
  }
  @ResolveField(() => [CallGroup], { nullable: true })
  async callGroups(@Context('accessToken') accessToken: string | null) {
    return await this.resolveNullableTask(this.rbtGroupService.getCallGroups({ accessToken }));
  }
}
