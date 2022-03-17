import { Injectable } from '@nestjs/common';
import { format, isAfter } from 'date-fns';
import { either, taskEither } from 'fp-ts';
import { flow } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import { Logger } from 'log4js';

import { requireCondition } from '../../api';
import {
  DEFAULT_GROUP_NOTE,
  RBT_EMPTY_GNAME,
  RBT_EXIST_GNAME,
  RBT_GROUP_ID_ILLEGAL,
  RBT_GROUP_ID_NOT_SETTING_MUSIC,
  RBT_GROUP_MEMBER_NAME_ILLEGAL,
  RBT_GROUP_MEMBER_NUMBER_ILLEGAL,
  RBT_GROUP_SETTING_MUSIC_NO_SELECT,
  RBT_ILLEGAL_GNAME,
  RBT_LIMIT_GNAME,
  RBT_SETTING_TIME_ILLEGAL,
  RBT_SETTING_TONES_ILLEGAL,
  RBT_WRONG_GROUP_CODE,
  ReturnError,
} from '../../error-codes';
import { LoggingService } from '../../infra/logging';
import { ExternalRbtService } from '../../infra/telecom';
import { DEFAULT_TONE, GROUP_TONE } from '../../infra/telecom/constants';
import { AccountService } from './../account/account.service';
import { getExternalStatus, handleFailure, requireRegistered } from './common';
import { DEFAULT_GROUP } from './constants';
import { RbtService } from './rbt.service';

const GROUP_NAME_PATTERN = /^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9_ ]*$/;

const requireGroupName = <T extends { groupName: string }>(
  condition: (args: T) => boolean,
  code: string
) => requireCondition(condition, code);

const requireGroupCode = <T extends { groupCode: string }>(
  condition: (args: T) => boolean,
  code: string
) => requireCondition(condition, code);

const requireToneCodes = <T extends { toneCodes: string[] }>(
  condition: (args: T) => boolean,
  code: string
) => requireCondition(condition, code);

const requireMemberName = <T extends { memberName: string }>(
  condition: (args: T) => boolean,
  code: string
) => requireCondition(condition, code);

const requireMemberNumber = <T extends { memberNumber: string }>(
  condition: (args: T) => boolean,
  code: string
) => requireCondition(condition, code);

const getGroupSetting = async (
  externalRbtService: ExternalRbtService,
  msisdn: string,
  groupCode: string
) => {
  const settings = await externalRbtService.querySetting(msisdn);
  return groupCode === DEFAULT_GROUP.groupCode
    ? settings.find((s) => s.setType === DEFAULT_TONE)
    : settings.find((s) => s.callerNumber === groupCode);
};
@Injectable()
export class RbtGroupService {
  private readonly logger: Logger;
  constructor(
    private externalRbtService: ExternalRbtService,
    private accountService: AccountService,
    private rbtService: RbtService,
    loggingService: LoggingService
  ) {
    this.logger = loggingService.getLogger('crbt');
  }

  createGroup = flow(
    this.accountService.requireLogin<{ groupName: string }>(),
    taskEither.chain(requireGroupName((args) => !!args.groupName, RBT_EMPTY_GNAME)),
    taskEither.chain(requireGroupName((args) => args.groupName.length <= 250, RBT_LIMIT_GNAME)),
    taskEither.chain(
      requireGroupName((args) => GROUP_NAME_PATTERN.test(args.groupName), RBT_ILLEGAL_GNAME)
    ),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegistered),
    taskEither.chain((ctx) => async () => {
      const { msisdn, groupName } = ctx;
      const groups = await this.externalRbtService.queryGroup(msisdn);
      if (groups.find((g) => g.groupName === groupName)) {
        return either.left(new ReturnError(RBT_EXIST_GNAME));
      }
      let groupCode: string;
      if (groups.length >= 1000) {
        groupCode = `${groups.length + 1}`;
      } else {
        do {
          groupCode = `${Math.floor(Math.random() * 1000)}`;
        } while (groups.find((g) => g.groupCode == groupCode));
      }
      const addRes = await this.externalRbtService.addGroup(msisdn, groupCode, groupName);
      return addRes.success
        ? either.right({ groupCode, groupName })
        : either.left(new ReturnError(addRes.returnCode, addRes.message));
    })
  );

  deleteGroup = flow(
    this.accountService.requireLogin<{ groupCode: string }>(),
    taskEither.chain(
      requireGroupCode((args) => /^[0-9]+$/.test(args.groupCode), RBT_WRONG_GROUP_CODE)
    ),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegistered),
    taskEither.chain((ctx) => async () =>
      either.right(await this.externalRbtService.delGroup(ctx.msisdn, ctx.groupCode))
    ),
    taskEither.chain(handleFailure)
  );

  addGroupMember = flow(
    this.accountService.requireLogin<{
      groupCode: string;
      memberName: string;
      memberNumber: string;
    }>(),
    flow(
      taskEither.chain(requireGroupCode((args) => !!args.groupCode, RBT_GROUP_ID_ILLEGAL)),
      taskEither.chain(
        requireMemberNumber((args) => !!args.memberNumber, RBT_GROUP_MEMBER_NUMBER_ILLEGAL)
      ),
      taskEither.chain(
        requireMemberNumber(
          (args) => args.memberNumber.length <= 15 && args.memberNumber.length >= 7,
          RBT_GROUP_MEMBER_NUMBER_ILLEGAL
        )
      ),
      taskEither.chain(
        requireMemberName(
          (args) => !!args.memberName && args.memberName.length <= 30,
          RBT_GROUP_MEMBER_NAME_ILLEGAL
        )
      ),
      taskEither.chain(getExternalStatus(this.externalRbtService)),
      taskEither.chain(requireRegistered),
      taskEither.chain((ctx) => async () => {
        const groups = await this.externalRbtService.queryGroup(ctx.msisdn);
        return groups.find((g) => g.groupCode == ctx.groupCode)
          ? either.right(ctx)
          : either.left(new ReturnError(RBT_GROUP_ID_ILLEGAL));
      })
    ),
    taskEither.chain((ctx) => async () => {
      const members = await this.externalRbtService.queryGroupMember(ctx.msisdn, ctx.groupCode);
      return !members.find((m) => m.memberNumber == ctx.memberNumber)
        ? either.right(ctx)
        : either.left(new ReturnError(RBT_GROUP_MEMBER_NUMBER_ILLEGAL));
    }),
    taskEither.chain((ctx) => async () =>
      either.right(
        await this.externalRbtService.addGroupMember(
          ctx.msisdn,
          ctx.groupCode,
          ctx.memberNumber,
          ctx.memberName
        )
      )
    ),
    taskEither.chain(handleFailure)
  );

  removeGroupMember = flow(
    this.accountService.requireLogin<{
      groupCode: string;
      memberNumber: string;
    }>(),
    flow(
      taskEither.chain(requireGroupCode((args) => !!args.groupCode, RBT_GROUP_ID_ILLEGAL)),
      taskEither.chain(
        requireMemberNumber((args) => !!args.memberNumber, RBT_GROUP_MEMBER_NUMBER_ILLEGAL)
      ),
      taskEither.chain(
        requireMemberNumber(
          (args) => args.memberNumber.length <= 15 && args.memberNumber.length >= 7,
          RBT_GROUP_MEMBER_NUMBER_ILLEGAL
        )
      ),
      taskEither.chain(getExternalStatus(this.externalRbtService)),
      taskEither.chain(requireRegistered),
      taskEither.chain((ctx) => async () => {
        const groups = await this.externalRbtService.queryGroup(ctx.msisdn);
        return groups.find((g) => g.groupCode == ctx.groupCode)
          ? either.right(ctx)
          : either.left(new ReturnError(RBT_GROUP_ID_ILLEGAL));
      })
    ),
    taskEither.chain((ctx) => async () => {
      const members = await this.externalRbtService.queryGroupMember(ctx.msisdn, ctx.groupCode);
      return members.find((m) => m.memberNumber == ctx.memberNumber)
        ? either.right(ctx)
        : either.left(new ReturnError(RBT_GROUP_MEMBER_NUMBER_ILLEGAL));
    }),
    taskEither.chain((ctx) => async () =>
      either.right(
        await this.externalRbtService.delGroupMember(ctx.msisdn, ctx.groupCode, ctx.memberNumber)
      )
    ),
    taskEither.chain(handleFailure)
  );

  getCallGroups = flow(
    this.accountService.requireLogin<{}>(),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegistered),
    taskEither.chain(({ msisdn }) => async () => {
      const settings = await this.externalRbtService.querySetting(msisdn);
      const defaultGroups = settings.find((s) => s.setType === '2' || s.setType === '4')
        ? [DEFAULT_GROUP]
        : [];
      const res = await this.externalRbtService.queryGroup(msisdn);
      return either.right([
        ...defaultGroups,
        ...(res),
      ]);
    })
  );
  setGroupTones = flow(
    this.accountService.requireLogin<{ groupCode: string; toneCodes: string[] }>(),
    taskEither.chain(requireGroupCode((args) => !!args.groupCode, RBT_GROUP_ID_ILLEGAL)),
    taskEither.chain(
      requireToneCodes((ctx) => !!ctx.toneCodes.length, RBT_GROUP_SETTING_MUSIC_NO_SELECT)
    ),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegistered),
    taskEither.chain((ctx) => async () => {
      const { msisdn, toneCodes } = ctx;
      const tones = await this.externalRbtService.getUserTones(msisdn);
      const myToneCodes = new Set(tones.map((tones) => tones.toneCode));
      return toneCodes.find((c) => !myToneCodes.has(c))
        ? either.left(new ReturnError(RBT_SETTING_TONES_ILLEGAL))
        : either.right(ctx);
    }),
    taskEither.chain(({ msisdn, groupCode, toneCodes }) => async () => {
      const groupSetting = await getGroupSetting(this.externalRbtService, msisdn, groupCode);
      if (groupSetting)
        return either.right(
          await this.externalRbtService.editToneBox(
            msisdn,
            groupCode,
            toneCodes,
            groupSetting.toneBoxID
          )
        );
      const res = await this.externalRbtService.addToneBox(msisdn, groupCode, toneCodes);
      return res.success
        ? either.right(
            await this.externalRbtService.setTone(msisdn, res.toneBoxID!, GROUP_TONE, groupCode, {
              loopType: '2', // loopTypelay randon tonebox. fix co dinh = 2
              timeType: '1', // timeType: kieu thoi gian: 1 la ca ngay, 2 khoang trong ngay, 3 trong tuan, 4 trong thang, 5 tron gnam, 6 khoang tg xac dinh
              startTime: '2003-01-01 00:00:00', // startTime: dang set mac dinh khi timeType = 1
              endTime: '2003-01-01 00:00:00', // endTime: dang set mac dinh khi timeType = 1
            })
          )
        : either.right(res);
    }),
    taskEither.chain(handleFailure)
  );
  getGroupInfo = flow(
    this.accountService.requireLogin<{ groupCode: string }>(),
    taskEither.chain(requireGroupCode((args) => !!args.groupCode, RBT_GROUP_ID_ILLEGAL)),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegistered),
    taskEither.chain(({ groupCode, msisdn }) => async (): Promise<
      either.Either<
        ReturnError,
        { id: string; note: string | null; members: { id: string; name: string; number: string }[] }
      >
    > => {
      console.log("Log-getGroupInfo[groupCode]:"+groupCode);
      if (groupCode.toLowerCase() === DEFAULT_GROUP.groupCode)
        return either.right({
          id: groupCode,
          note: DEFAULT_GROUP_NOTE,
          members: [],
        });

      return either.right({
        id: groupCode,
        note: null,
        members: (await this.externalRbtService.queryGroupMember(msisdn, groupCode)).map((m) => ({
          id: `${groupCode}:${m.memberNumber}`,
          name: m.memberName,
          number: m.memberNumber,
        })),
      });
    })
  );
  getUsedTones = flow(
    this.accountService.requireLogin<{ groupCode: string }>(),
    taskEither.chain(requireGroupCode((args) => !!args.groupCode, RBT_GROUP_ID_ILLEGAL)),
    taskEither.chain(({ groupCode, msisdn, accessToken }) =>
      pipe(
        { accessToken },
        this.rbtService.getRingTones,
        taskEither.chain((myTones) => async () => {
          const groupSetting = await getGroupSetting(this.externalRbtService, msisdn, groupCode);
          const boxTones = groupSetting
            ? (await this.externalRbtService.queryTbTone(msisdn, groupSetting.toneBoxID)).map(
                (t) => t.toneCode
              )
            : [];
          return either.right(
            myTones.map((rbt) => ({
              tone: rbt,
              id: rbt.personID,
              used: boxTones.includes(rbt.toneCode),
            }))
          );
        })
      )
    )
  );
  getTimeSetting = flow(
    this.accountService.requireLogin<{ groupCode: string }>(),
    taskEither.chain(requireGroupCode((args) => !!args.groupCode, RBT_GROUP_ID_ILLEGAL)),
    taskEither.chain(({ groupCode, msisdn }) => async () => {
      const groupSetting = await getGroupSetting(this.externalRbtService, msisdn, groupCode);
      this.logger.debug(`groupSetting=`, groupSetting);
      return either.right({
        id: groupCode,
        ...groupSetting,
        timeType: (groupSetting && groupSetting.timeType) || '1',
      });
    })
  );
  setTime = flow(
    this.accountService.requireLogin<{
      groupCode: string;
      timeType: string;
      startTime?: Date;
      endTime?: Date;
    }>(),
    taskEither.chain(requireGroupCode((args) => !!args.groupCode, RBT_GROUP_ID_ILLEGAL)),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegistered),
    taskEither.chain((ctx) => async () => {
      const { groupCode, msisdn } = ctx;
      const groupSetting = await getGroupSetting(this.externalRbtService, msisdn, groupCode);
      return groupSetting
        ? either.right({ ...ctx, groupSetting })
        : either.left(new ReturnError(RBT_GROUP_ID_NOT_SETTING_MUSIC));
    }),
    taskEither.chain((ctx) => async () => {
      const { groupCode, msisdn } = ctx;
      const groupSetting = await getGroupSetting(this.externalRbtService, msisdn, groupCode);
      return groupSetting
        ? either.right({ ...ctx, groupSetting })
        : either.left(new ReturnError(RBT_GROUP_ID_NOT_SETTING_MUSIC));
    }),
    taskEither.chain(({ timeType, startTime, endTime, groupSetting, msisdn }) => async () => {
      if (timeType !== '1')
        if (!(startTime && endTime) || !isAfter(endTime, startTime)) {
          return either.left(new ReturnError(RBT_SETTING_TIME_ILLEGAL));
        }

      this.logger.debug(timeType, startTime, endTime?.toISOString());
      const timeSettings = {
        loopType: groupSetting.loopType,
        timeType,
        ...(timeType === '1'
          ? { startTime: null, endTime: null }
          : timeType === '2'
          ? {
              startTime: format(startTime!, 'HH:mm:ss'),
              endTime: format(endTime!, 'HH:mm:ss'),
            }
          : {
              startTime: format(startTime!, 'yyyy-MM-dd HH:mm:ss'),
              endTime: format(endTime!, 'yyyy-MM-dd HH:mm:ss'),
            }),
      };
      return either.right(
        await this.externalRbtService.editSetting(
          msisdn,
          groupSetting.settingID,
          groupSetting.setType,
          timeSettings
        )
      );
    }),
    taskEither.chain(handleFailure)
  );
}
