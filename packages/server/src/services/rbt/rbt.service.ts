import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { either, taskEither } from 'fp-ts';
import { flow } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import { Logger } from 'log4js';
import { Repository } from 'typeorm';

import {
  AUTH_REQUIRE_VIETTEL,
  BRAND_NOT_EXIST,
  NOT_ENOUGH_PARAM,
  RBT_NOT_DELETED,
  RBT_NOT_SELECTED,
  REGISTER_NOT_HOME_PHONE,
  ReturnError,
  VCRBT_REVERSE_IS_OFF,
  VCRBT_REVERSE_IS_ON,
} from '../../error-codes';
import { LoggingService } from '../../infra/logging';
import { ExternalRbtService } from '../../infra/telecom';
import {
  ACTION_REGISTER,
  ACTION_REVERSE_OFF,
  ACTION_REVERSE_ON,
  ACTION_SUSPENDING,
  ACTION_UNREGISTER,
  ACTION_UPGRADE_TO_PLUS,
  MONTHLY_BRAND_ID,
  PLUS_BRAND_ID,
  VIP_BRAND_ID,
} from '../../infra/telecom/constants';
import { PhoneNumberService } from '../../infra/telecom/phone-number/phone-number.service';
import { RingBackTone } from '../music';
import { MusicService } from '../music/music.service';
import { AccountService, UserPayload } from './../account/account.service';
import {
  getExternalStatus,
  handleFailure,
  requireNotPaused,
  requireNotRegistered,
  requireRegistered,
  requireRegisteredOrPaused,
} from './common';
import { CRBT_BRANDS, FREE_BRAND_ID, HOME_PHONE_BRAND_ID } from './constants';
import {
  LogRingBackTone,
  RBT_ACTION_BUY,
  RBT_ACTION_DELETE,
  RBT_ACTION_PRESENT,
} from './log-models/log-ring-back-tone.entity';
import { LogRbtServiceEntity } from './models/log-rbt-service.entity';
import { PromotionService } from './promotion.service';
import { MyRbtInfo, RbtPackage } from './rbt.schemas';

const PACKAGES = [
  {
    id: '75',
    name: 'Gói ngày',
    brandId: '75',
    period: 'ngày',
    price: '1000',
    note: 'Đã bao gồm VAT - Tải nhạc chờ không giới hạn',
  },
  {
    id: '86',
    name: 'Gói tuần',
    brandId: '86',
    period: 'tuần',
    price: '5000',
    note:
      '2500đ/tuần đầu tiên, 5000đ/các tuần tiếp theo, đã bao gồm VAT - Tải nhạc chờ không giới hạn',
  },
  {
    id: '1',
    name: 'Gói tháng',
    brandId: '1',
    period: 'tháng',
    price: '9000',
    note: 'Đã bao gồm VAT - Tải nhạc chờ không giới hạn',
  },
  {
    id: '77',
    name: 'Gói tháng Highschool',
    brandId: '77',
    period: 'tháng',
    price: '4500',
    note: 'Đã bao gồm VAT - Tải nhạc chờ không giới hạn',
  },
  {
    id: '3',
    name: 'Gói tháng HomePhone',
    brandId: '3',
    period: 'tháng',
    price: '6000',
    note: 'Đã bao gồm VAT - Tải nhạc chờ không giới hạn',
  },
  {
    id: PLUS_BRAND_ID,
    name: 'Gói Imuzik Plus',
    brandId: PLUS_BRAND_ID,
    period: 'tháng',
    price: '10000',
    note:
      'Gói cước tháng plus 10.000 đ/tháng (Ngoài tính năng nhạc chờ thông thường, bổ sung tính năng nhạc chờ cho người gọi). Đã bao gồm VAT - Tải nhạc chờ không giới hạn',
  },
  {
    id: VIP_BRAND_ID,
    name: 'Gói VIP',
    brandId: VIP_BRAND_ID,
    period: 'tháng',
    price: '15000',
    note:
      'Gói cước tháng VIP 15.000 đ/tháng (Ngoài tính năng nhạc chờ thông thường, bổ sung tính năng nhạc chờ cho người gọi). Đã bao gồm VAT - Tải nhạc chờ không giới hạn',
  },
].map((p) => Object.assign(new RbtPackage(), p));

@Injectable()
export class RbtService {
  private logger: Logger;
  private crbtLogger: Logger;
  constructor(
    private externalRbtService: ExternalRbtService,
    private musicService: MusicService,
    private accountService: AccountService,
    private phoneNumberService: PhoneNumberService,
    private promotionService: PromotionService,
    @InjectRepository(LogRbtServiceEntity,'log_db')
    private logRbtServiceRepository: Repository<LogRbtServiceEntity>,
    @InjectRepository(LogRingBackTone, 'log_db')
    private logRingBackToneRepository: Repository<LogRingBackTone>,
    loggingService: LoggingService
  ) {
    this.logger = loggingService.getLogger();
    this.crbtLogger = loggingService.getLogger('crbt');
  }

  async logRbt(user: UserPayload | null, action: string, returnCode: string, brandId?: string) {
    const log = new LogRbtServiceEntity();
    log.username = user?.username ?? null;
    log.phonenumber = user?.phoneNumber ?? null;
    log.action = action;
    log.returnCode = returnCode;
    log.brandId = brandId ?? null;
    log.createdAt = new Date();
    await this.logRbtServiceRepository.save(log);
  }

  async logDownload(
    rbt: RingBackTone | null,
    user: UserPayload,
    data: {
      action: number;
      returnCode: string;
      channel: string;
      targetMsisdn?: string;
      isFree?: boolean;
    }
  ) {
    const log = new LogRingBackTone();
    log.toneId = rbt?.huaweiToneId ?? null;
    log.toneName = rbt?.huaweiToneName ?? null;
    log.toneAvailableDate = rbt?.huaweiAvailableDatetime ?? null;
    log.tonePrice = data.isFree ? '0' : rbt?.huaweiPrice ?? null;
    log.action = data.action;
    log.memberId = user.id;
    log.username = user.username;
    log.fromPhonenumber = user.phoneNumber;
    log.toPhonenumber = data.targetMsisdn ?? '';
    log.returnCode = data.returnCode;
    log.source = data.channel;
    log.createdAt = new Date();
    await this.logRingBackToneRepository.save(log);
  }

  rbtPackage = (brandId: string | null) => PACKAGES.find((p) => p.brandId === brandId) ?? null;

  rbtPackages = () =>
    pipe(
      taskEither.right(PACKAGES),
      taskEither.chain((packages) => async () => {
        const promotion = await this.promotionService.getRegisterPromotionByApp('api');
        if (promotion) {
          const promotedPackages = new Set(promotion.packageIdList);
          return either.right(packages.filter((p) => promotedPackages.has(p.brandId)));
        }
        return either.right(packages);
      })
    );

  getStatus = flow(
    this.accountService.requireLogin<{}>(),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain((ctx) => async () => {
      let info: MyRbtInfo;
      switch (ctx.status) {
        case '2': {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const brandId = ctx.userInfos?.[0]?.brand!;

          info = {
            status: 1,
            name: CRBT_BRANDS[brandId]?.name,
            note: CRBT_BRANDS[brandId]?.fee,
            brandId,
            reverse: {
              id: '1',
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              status: ctx.userInfos![0].serviceOrders,
              title:
                brandId === '1'
                  ? 'NÂNG CẤP GÓI CƯỚC NHẠC CHỜ NÂNG CAO - IMUZIK PLUS (Phí nâng cấp 1000d/tháng)'
                  : 'BẬT/TẮT TÍNH NĂNG NHẠC CHỜ CHO NGƯỜI GỌI (REVERSE)',
              description:
                'Tính năng cho phép Quý khách nghe nhạc chờ do chính mình cài đặt khi thực hiện cuộc gọi tới thuê bao khác',
            },
            packageName:
              'Bạn đang sử dụng ' + CRBT_BRANDS[brandId]?.name + ' ' + CRBT_BRANDS[brandId]?.price,
          };
          break;
        }
        case '5': {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const brandId = ctx.userInfos?.[0]?.brand!;
          info = {
            status: 2,
            name: CRBT_BRANDS[brandId]?.name,
            note: CRBT_BRANDS[brandId]?.fee,
            brandId,
            packageName:
              'Bạn đang tạm ngưng ' +
              CRBT_BRANDS[brandId]?.name +
              ' ' +
              CRBT_BRANDS[brandId]?.price,
          };
          break;
        }
        default:
          info = {
            status: 0,
            brandId: '0',
            packageName: '',
            popup: {
              id: '1',
              brandId: '1',
              title: 'Đăng ký dịch vụ nhạc chờ',
              content:
                'Quý khách chưa đăng ký dịch vụ nhạc chờ iMuzik, thực hiện đăng ký có thể tải/tặng nhạc chờ!',
              note: '* Phí dịch vụ 9.000đ/tháng, gia hạn hàng tháng.',
            },
          };
      }
      return either.right(info);
    })
  );

  getRingTones = flow(
    this.accountService.requireLogin<{}>(),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegistered),
    taskEither.chain((ctx) => async () => {
      const tones = await this.externalRbtService.getUserTones(ctx.msisdn);
      this.crbtLogger.info(
        `getUserTones-0001: ${JSON.stringify(tones)}`
      );
      return either.right(
        (
          await Promise.all(
            tones.map(async (tone) => ({
              ...tone,
              tone: await this.musicService.findRbtByToneCode(tone.toneCode),
              id: tone.personID,
            }))
          )
        ).filter((t) => t.tone)
      );
    })
  );

  copyRingTones = flow(
    this.accountService.requireLogin<{ givenTargetMsisdn: string }>(),
    taskEither.chain(({ givenTargetMsisdn, ...ctx }) => async () => {
      const targetMsisdn = this.phoneNumberService.normalizeMsisdn(givenTargetMsisdn);
      return (await this.phoneNumberService.isViettelPhoneNumberAsync(targetMsisdn))
        ? either.right({ ...ctx, targetMsisdn })
        : either.left(new ReturnError(AUTH_REQUIRE_VIETTEL));
    }),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegistered),
    taskEither.chain((ctx) => async () => {
      const tones = await this.externalRbtService.getUserTones(ctx.targetMsisdn);
      return either.right(
        (
          await Promise.all(tones.map((tone) => this.musicService.findRbtByToneCode(tone.toneCode)))
        ).filter((t) => t)
      );
    })
  );

  pause = flow(
    this.accountService.requireLogin<{}>(),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegisteredOrPaused),
    taskEither.chain(requireNotPaused),
    taskEither.chain((ctx) => async () => {
      const res = await this.externalRbtService.activateOrPause(ctx.msisdn, 'pause');
      await this.logRbt(ctx.user, ACTION_SUSPENDING, res.returnCode, ctx.userInfos?.[0].brand);
      return either.right(res);
    }),
    taskEither.chain(handleFailure)
  );

  activate = flow(
    this.accountService.requireLogin<{}>(),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegisteredOrPaused),
    taskEither.chain(requireNotRegistered),
    taskEither.chain((ctx) => async () => {
      const res = await this.externalRbtService.activateOrPause(ctx.msisdn, 'activate');
      await this.logRbt(ctx.user, ACTION_REGISTER, res.returnCode, ctx.userInfos?.[0].brand);
      return either.right(res);
    }),
    taskEither.chain(handleFailure)
  );

  cancel = flow(
    this.accountService.requireLogin<{}>(),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegisteredOrPaused),
    taskEither.chain((ctx) => async () => {
      const res = await this.externalRbtService.cancel(ctx.msisdn);
      await this.logRbt(ctx.user, ACTION_UNREGISTER, res.returnCode, ctx.userInfos?.[0].brand);
      return either.right(res);
    }),
    taskEither.chain(handleFailure)
  );

  delete = flow(
    this.accountService.requireLogin<{ personId: string; toneCode: string; channel: string }>(),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegistered),
    taskEither.chain((ctx) => async () =>
      ctx.personId && ctx.toneCode
        ? either.right(ctx)
        : either.left(new ReturnError(NOT_ENOUGH_PARAM))
    ),
    taskEither.chain((ctx) => async () => {
      const res = await this.externalRbtService.deleteTone(ctx.msisdn, ctx.personId);

      this.logDownload(await this.musicService.findRbtByToneCode(ctx.toneCode), ctx.user, {
        action: RBT_ACTION_DELETE,
        channel: ctx.channel,
        returnCode: res.returnCode,
      });

      return res.success ? either.right(null) : either.left(new ReturnError(RBT_NOT_DELETED));
    })
  );

  register = flow(
    this.accountService.requireLogin<{ brandId: string }>(),
    taskEither.chain((ctx) => async () =>
      ctx.brandId ? either.right(ctx) : either.left(new ReturnError(BRAND_NOT_EXIST))
    ),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireNotRegistered), // TODO: is this needed
    taskEither.chain(requireNotPaused),
    taskEither.chain((ctx) => async () =>
      ctx.brandId === HOME_PHONE_BRAND_ID && !this.phoneNumberService.isHomePhone(ctx.msisdn)
        ? either.left(new ReturnError(REGISTER_NOT_HOME_PHONE))
        : either.right(ctx)
    ),
    // TODO: brandID == 77 check high school
    taskEither.chain((ctx) => async () => {
      const { brandId, msisdn } = ctx;
      const promotion = await this.promotionService.getRegisterPromotion(ctx.brandId, ctx.msisdn);
      this.crbtLogger.debug(`promotion=${promotion}`);
      if (promotion) {
        this.crbtLogger.info(`subscribe: ${ctx.msisdn} - Du dieu kien dang ky Free`);
        const freeReg = await this.externalRbtService.subscribe(msisdn, FREE_BRAND_ID);

        await this.logRbt(ctx.user, ACTION_REGISTER, freeReg.returnCode, FREE_BRAND_ID);
        await this.promotionService.logPromotionUsage(promotion, {
          msisdn,
          errorCode: freeReg.returnCode,
          packageId: brandId,
        });

        if (!freeReg.success) {
          return either.left(new ReturnError(freeReg.returnCode, freeReg.message));
        }
        const editRes = await this.externalRbtService.editBrand(msisdn, brandId);
        if (!editRes.success) {
          this.crbtLogger.info(
            `subscribe: Chuyen Brand_ID=${FREE_BRAND_ID} ==> Brand_ID=${brandId} that bai!. Crbt response: ${editRes.returnCode}`
          );
          await this.externalRbtService.cancel(msisdn);
        } else {
          this.crbtLogger.info(
            `subscribe: Chuyen Brand_ID=${FREE_BRAND_ID} ==> Brand_ID=${brandId} thanh cong!`
          );
        }
        return either.right(editRes);
      }
      const res = await this.externalRbtService.subscribe(msisdn, brandId);
      await this.logRbt(ctx.user, ACTION_REGISTER, res.returnCode, FREE_BRAND_ID);
      return either.right(res);
    }),
    taskEither.chain(handleFailure)
  );

  reverse = flow(
    this.accountService.requireLogin<{ active: boolean }>(),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegisteredOrPaused),
    taskEither.chain(requireNotPaused),
    taskEither.chain((ctx) => async () => {
      const { active, msisdn } = ctx;
      const current = ctx.userInfos?.[0]?.serviceOrders;
      const brandId = ctx.userInfos?.[0]?.brand;
      if (current === '2' && active) return either.left(new ReturnError(VCRBT_REVERSE_IS_ON));
      if (current === '1' && !active) return either.left(new ReturnError(VCRBT_REVERSE_IS_OFF));
      if (brandId === MONTHLY_BRAND_ID && active) {
        const res = await this.externalRbtService.subscribe(msisdn, PLUS_BRAND_ID);
        this.logger.info(
          `ACTION_UPGRADE_TO_PLUS > ${msisdn} > ${PLUS_BRAND_ID} > ${res.returnCode}`
        );
        await this.logRbt(ctx.user, ACTION_UPGRADE_TO_PLUS, res.returnCode, PLUS_BRAND_ID);
        return either.right(res);
      } else if (active) {
        const res = await this.externalRbtService.addSubscribeReverse(msisdn);
        await this.logRbt(ctx.user, ACTION_REVERSE_ON, res.returnCode, ctx.userInfos?.[0].brand);
        return either.right(res);
      } else {
        const res = await this.externalRbtService.unSubscribeReverse(msisdn);
        await this.logRbt(ctx.user, ACTION_REVERSE_OFF, res.returnCode, ctx.userInfos?.[0].brand);
        return either.right(res);
      }
    }),
    taskEither.chain(handleFailure)
  );

  download = flow(
    this.accountService.requireLogin<{ toneCodes: string[]; brandId?: string; channel: string }>(),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain((ctx) => async () => {
      const { status, msisdn, brandId } = ctx;
      let registerSuccess = false;
      if (status === '5' || status === 'unregistered') {
        const res =
          status === 'unregistered'
            ? await this.externalRbtService.subscribe(msisdn, brandId || VIP_BRAND_ID)
            : await this.externalRbtService.activateOrPause(msisdn, 'activate');
        await this.logRbt(
          ctx.user,
          ACTION_REGISTER,
          res.returnCode,
          status === 'unregistered' ? brandId || VIP_BRAND_ID : ctx.userInfos?.[0].brand
        );
        if (!res.success) {
          const message =
            'Tải không thành công do Quý khách chưa đăng ký dịch vụ nhạc chờ! Quý khách vui lòng soạn DK1 gửi 1221 hoặc liên hệ 198 (miễn phí)';
          return either.left(new ReturnError(res.returnCode, message));
        }
        registerSuccess = true;
      }
      return either.right({ ...ctx, registerSuccess });
    }),
    taskEither.chain((ctx) => async () => {
      const { msisdn, toneCodes, registerSuccess } = ctx;
      const promotion = await this.promotionService.getDownloadRbtPromotion(msisdn);
      this.crbtLogger.debug('downloadPromotion=', promotion);
      const isFree = !!promotion;
      const messages = [];
      console.log("Log-Download[toneCodes]:"+JSON.stringify(toneCodes));
      this.crbtLogger.info(`Log-Download[toneCodes]: ${JSON.stringify(toneCodes)}`);
      for (const toneCode of toneCodes) {
        const rbt = await this.musicService.findRbtByToneCode(toneCode);
        console.log("Log-Download[findRbtByToneCode]:"+JSON.stringify(rbt));
        this.crbtLogger.info(`Log-Download[findRbtByToneCode]: ${JSON.stringify(rbt)}`);
        let message = '';
        if (rbt) {
          const res = await this.externalRbtService.orderTone(
            msisdn,
            toneCode,
            '1',
            rbt.huaweiToneId,
            isFree
          );

          this.logDownload(rbt, ctx.user, {
            action: RBT_ACTION_BUY,
            channel: ctx.channel,
            returnCode: res.returnCode,
            isFree,
          });

          if (isFree && promotion) {
            await this.promotionService.logPromotionUsage(promotion, {
              msisdn,
              errorCode: res.returnCode,
              toneCode,
            });
          }
          this.crbtLogger.info(`Log-Download[orderTone]: ${JSON.stringify(rbt)}`);
          if (res.success) {
            if (registerSuccess) {
              message = `Quý khách đã đăng ký dịch vụ và tải bài hát ${rbt.huaweiToneName} (${toneCode}) thành công!`;
            } else {
              message = `Quý khách đã tải bài hát ${rbt.huaweiToneName} (${toneCode}) thành công!`;
            }
          } else {
            message = `${rbt.huaweiToneName} (${toneCode}) - ${res.message}`;
          }
        } else {
          message = `Mã nhạc chờ ${toneCode} - không tồn tại!`;
        }
        this.crbtLogger.info(`Log-Download[message]: ${JSON.stringify(message)}`);
        messages.push(message);
      }

      return either.right(messages.join('\n\n'));
    })
  );

  gift = flow(
    this.accountService.requireLogin<{
      toneCodes: string[];
      givenTargetMsisdn: string;
      channel: string;
    }>(),
    taskEither.chain(({ givenTargetMsisdn, ...ctx }) => async () => {
      const targetMsisdn = this.phoneNumberService.normalizeMsisdn(givenTargetMsisdn);
      return (await this.phoneNumberService.isViettelPhoneNumberAsync(targetMsisdn))
        ? either.right({ ...ctx, targetMsisdn })
        : either.left(new ReturnError(AUTH_REQUIRE_VIETTEL));
    }),
    taskEither.chain((ctx) => async () =>
      ctx.toneCodes.length ? either.right(ctx) : either.left(new ReturnError(RBT_NOT_SELECTED))
    ),
    taskEither.chain(getExternalStatus(this.externalRbtService)),
    taskEither.chain(requireRegistered),
    taskEither.chain((ctx) => async () => {
      const { msisdn, toneCodes, targetMsisdn } = ctx;
      const messages = [];
      for (const toneCode of toneCodes) {
        const rbt = await this.musicService.findRbtByToneCode(toneCode);
        let message = '';
        if (rbt) {
          const res = await this.externalRbtService.presentTone(msisdn, targetMsisdn, toneCode);

          this.logDownload(rbt, ctx.user, {
            action: RBT_ACTION_PRESENT,
            channel: ctx.channel,
            returnCode: res.returnCode,
            targetMsisdn,
          });

          if (res.success) {
            message = `Yêu cầu tặng Nhạc chờ mã ${toneCode} đang được xử lý. Vui lòng đợi tin nhắn xác nhận từ hệ thống!`;
          } else {
            message = `${toneCode} - ${res.message}`;
          }
        } else {
          message = `Mã nhạc chờ ${toneCode} - không tồn tại!`;
        }
        messages.push(message);
      }
      return either.right(messages.join('\n\n'));
    })
  );
}
