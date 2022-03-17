import { expect } from 'chai';
import { Given, Then } from 'cucumber';
import { addDays, format, subDays, subMinutes } from 'date-fns';
import Sinon = require('sinon');
import { getRepository, MoreThan } from 'typeorm';

import { PromotionLog } from '../../../src/services/rbt/models/promotion-log.entity';
import { Promotion } from '../../../src/services/rbt/models/promotion.entity';
import { USER_TONE_MANAGE } from '../../constants';
import { getTestContext } from '../../hooks';
import { addPostAssert } from './../../hooks';
import { addSoapCall } from './utils';

Given(
  'Có Download Promotion và chưa hết hạn tính từ lần download đầu tiên theo chương trình',
  async function () {
    const ctx = getTestContext(this);
    const repo = getRepository(Promotion);
    const promotion = new Promotion();
    promotion.appId = 'api';
    promotion.startTime = subDays(new Date(), 1);
    promotion.endTime = addDays(new Date(), 1);
    promotion.promotionType = 2;
    promotion.status = 2;
    promotion.promoteDays = 1;
    await repo.save(promotion);
    ctx.download.isFree = true;
    ctx.download.usedPromotion = true;
  }
);
Given('Có Download Promotion và đã hết hạn', async function () {
  const promotion = new Promotion();
  promotion.appId = 'api';
  promotion.startTime = subDays(new Date(), 2);
  promotion.endTime = addDays(new Date(), 1);
  promotion.promotionType = 2;
  promotion.status = 2;
  promotion.promoteDays = 1;
  await getRepository(Promotion).save(promotion);

  const promotionLog = new PromotionLog();
  promotionLog.appId = 'api';
  promotionLog.promotionType = 2;
  promotionLog.promotionId = promotion.id;
  promotionLog.msisdn = '919216811';
  promotionLog.errorCode = '000000';
  promotionLog.createdAt = subDays(new Date(), 2);
  await getRepository(PromotionLog).save(promotionLog);
});
Given('Không có Download Promotion', () => null);
Given('Số điện thoại không được free download', () => null);
Given('Số điện thoại được free download', function () {
  const ctx = getTestContext(this);
  Sinon.replace(ctx.config, 'FREE_DOWNLOAD_PHONE_NUMBERS', ['919216811']);
  ctx.download.isFree = true;
});
Given('Đang không thuộc ngày download miễn phí', function () {
  const ctx = getTestContext(this);
  Sinon.replace(ctx.config, 'FREE_ORDER_TONE_TYPE', 1);
  Sinon.replace(ctx.config, 'FREE_ORDER_TONE_FROM', format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  Sinon.replace(ctx.config, 'FREE_ORDER_TONE_TO', format(addDays(new Date(), 1), 'yyyy-MM-dd'));
});
Given('Đang thuộc khoảng tg download miễn phí', function () {
  const ctx = getTestContext(this);
  Sinon.replace(ctx.config, 'FREE_ORDER_TONE_TYPE', 1);
  Sinon.replace(ctx.config, 'FREE_ORDER_TONE_FROM', format(new Date(), 'yyyy-MM-dd'));
  Sinon.replace(ctx.config, 'FREE_ORDER_TONE_TO', format(new Date(), 'yyyy-MM-dd'));
  ctx.download.isFree = true;
});
Given('Đang thuộc ngày download miễn phí', function () {
  const ctx = getTestContext(this);
  Sinon.replace(ctx.config, 'FREE_ORDER_TONE_TYPE', 2);
  Sinon.replace(
    ctx.config,
    'FREE_ORDER_TONE_FROM',
    [
      format(new Date(), 'yyyy-MM-dd'),
      format(new Date(), 'yyyy-MM-dd'),
      format(new Date(), 'yyyy-MM-dd'),
    ].join(',')
  );
  ctx.download.isFree = true;
});
Then('Lưu vào PromotionLog nếu dùng', async function () {
  addPostAssert(async () => {
    expect(
      await getRepository(PromotionLog).count({
        createdAt: MoreThan(subMinutes(new Date(), 10)),
      })
    ).equals(getTestContext(this).download.usedPromotion ? 1 : 0);
  });
});
Then('Tải nhạc chờ miễn phí nếu một trong những đk trên thoả mãn', function () {
  const ctx = getTestContext(this);
  addSoapCall(
    ctx,
    USER_TONE_MANAGE,
    'orderTone',
    [
      {
        OrderToneEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          role: '1',
          roleCode: '919216811',
          phoneNumber: '919216811',
          resourceCode: '6547912',
          resourceType: '1',
          portalType: '12',
          moduleCode: '00IMUZIKweb',
          discount: ctx.download.isFree ? '1' : '0',
        },
      },
    ],
    { returnCode: '000000' }
  );
  addSoapCall(
    getTestContext(this),
    USER_TONE_MANAGE,
    'querySetting',
    [
      {
        QuerySettingEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          portalType: '12',
          calledUserType: '1',
          calledUserID: '919216811',
        },
      },
    ],
    {
      returnCode: '000000',
      querySettingInfos: [
        {
          setType: '3',
          toneBoxID: '213',
          callerNumber: '434',
          startTime: '14:00:00',
          endTime: '17:00:00',
          timeType: 2,
          settingID: 'groupSettingID',
        },
        { setType: '2', toneBoxID: '999', settingID: 'defaultSettingID', resourceType: '1' },
      ],
    }
  );
  addSoapCall(
    getTestContext(this),
    USER_TONE_MANAGE,
    'queryTbTone',
    [
      {
        QueryTbToneEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          portalType: '12',
          type: '1',
          approveType: '2',
          toneBoxID: '999',
        },
      },
    ],
    {
      returnCode: '000000',
      queryToneInfos: [
        {
          toneID: 'toneID',
          toneCode: '6547912',
          toneName: 'toneName',
          singerName: 'singerName',
          price: 'price',
          personID: 'personID',
          availableDateTime: 'availableDateTime',
        },
        {
          toneID: 'toneID',
          toneCode: 'toneCode',
          toneName: 'toneName',
          singerName: 'singerName',
          price: 'price',
          personID: 'personID',
          availableDateTime: 'availableDateTime',
        },
      ],
    }
  );
  addSoapCall(
    getTestContext(this),
    USER_TONE_MANAGE,
    'editToneBox',
    [
      {
        EditToneBoxEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          portalType: '12',
          role: '1',
          roleCode: '919216811',
          name: 'Nhóm mặc định',
          type: '1',
          toneBoxID: '999',
          toneCode: ['6547912', 'toneCode', '6547912'],
        },
      },
    ],
    { returnCode: '000000' }
  );
});
