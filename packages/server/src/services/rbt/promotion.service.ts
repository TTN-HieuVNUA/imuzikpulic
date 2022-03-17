import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays, isAfter } from 'date-fns';
import { LessThan, MoreThan, Repository } from 'typeorm';

import { SUCCESS } from '../../error-codes';
import { LoggingService } from '../../infra/logging';
import { PromotionLog } from './models/promotion-log.entity';
import { Promotion } from './models/promotion.entity';

const DOWNLOAD_PROMOTION_TYPE = 2;
const REGISTER_PROMOTION_TYPE = 1;
@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion) private promotionRepository: Repository<Promotion>,
    @InjectRepository(PromotionLog) private promotionLogRepository: Repository<PromotionLog>,
    private loggingService: LoggingService
  ) {}

  private async hasPromotion(appId: string, promotionType: number) {
    return await this.promotionRepository.findOne({
      where: {
        status: 2,
        promotionType,
        appId,
        startTime: LessThan(new Date()),
        endTime: MoreThan(new Date()),
      },
      order: {
        id: 'DESC',
      },
    });
  }
  async getRegisterPromotionByApp(appId = 'api') {
    return await this.hasPromotion(appId, REGISTER_PROMOTION_TYPE);
  }

  async getRegisterPromotion(brandId: string, msisdn: string, appId = 'api') {
    const promotion = await this.getRegisterPromotionByApp(appId);
    // || {
    //   packageIds: brandId,
    //   id: '1',
    //   appId: 'api',
    // };
    if (promotion) console.log(promotion);
    if (promotion?.packageIdList.includes(brandId)) {
      if (
        (await this.promotionLogRepository.count({
          where: {
            msisdn,
            promotionId: promotion.id,
            promotionType: REGISTER_PROMOTION_TYPE,
            errorCode: SUCCESS,
            ...(appId ? { appId } : null),
          },
        })) === 0
      )
        return promotion;
    }
  }
  async getDownloadRbtPromotion(msisdn: string, appId = 'api') {
    const promotion = await this.hasPromotion(appId, DOWNLOAD_PROMOTION_TYPE);
    //  || {
    //   id: '10',
    //   promoteDays: 100,
    //   appId: 'api',
    // };
    if (promotion) {
      const firstDownload =
        (
          await this.promotionLogRepository.findOne({
            where: {
              msisdn,
              promotionType: DOWNLOAD_PROMOTION_TYPE,
              promotionId: promotion.id,
              errorCode: '000000', // thanh cong
            },
            order: {
              createdAt: 'ASC',
            },
          })
        )?.createdAt ?? new Date();
      const endTime = addDays(firstDownload, promotion.promoteDays ?? 0);
      if (isAfter(endTime, new Date())) {
        return promotion;
      }
    }
  }

  async logPromotionUsage(
    promotion: Promotion,
    data: {
      msisdn: string;
      errorCode: string;
      toneCode?: string;
      packageId?: string;
    }
  ) {
    try {
      const log = new PromotionLog();
      Object.assign(log, data);
      log.appId = promotion.appId;
      log.promotionType = promotion.promotionType;
      log.promotionId = promotion.id;
      log.createdAt = new Date();
      await this.promotionLogRepository.save(log);
    } catch (e) {
      this.loggingService.getLogger().error('DOWNLOAD RBT WITH PROMOTION ERROR: ' + e.message);
    }
  }
}
