import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';

import { getTestContext } from '../hooks';
import { GRAPHQL_URL, USER_MANAGE, USER_TONE_MANAGE } from './../constants';
import { addSoapCall } from './rbt/utils';

Given('Đăng ký thành công', function () {
  const ctx = getTestContext(this);
  addSoapCall(
    ctx,
    USER_MANAGE,
    'subscribe',
    [
      {
        SubscribeEvt: {
          portalType: '12',
          role: '1',
          roleCode: '919216811',
          phoneNumber: '919216811',
          validateCode: '',
          tradeMark: '472',
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
        },
      },
    ],
    { returnCode: '000000' }
  );
});
Given('Đăng ký thất bại', function () {
  const ctx = getTestContext(this);
  addSoapCall(
    ctx,
    USER_MANAGE,
    'subscribe',
    [
      {
        SubscribeEvt: {
          portalType: '12',
          role: '1',
          roleCode: '919216811',
          phoneNumber: '919216811',
          validateCode: '',
          tradeMark: '472',
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
        },
      },
    ],
    { returnCode: '100004' }
  );
});

Given('Kích hoạt dịch vụ thành công', function () {
  addSoapCall(
    getTestContext(this),
    USER_MANAGE,
    'activateAndPause',
    [
      {
        ActivateAndPauseEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          portalType: '4',
          role: '1',
          roleCode: '919216811',
          type: '1',
          phoneNumber: '919216811',
        },
      },
    ],
    { returnCode: '000000' }
  );
});
Given('Kích hoạt dịch vụ thất bại', function () {
  addSoapCall(
    getTestContext(this),
    USER_MANAGE,
    'activateAndPause',
    [
      {
        ActivateAndPauseEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          portalType: '4',
          role: '1',
          roleCode: '919216811',
          type: '1',
          phoneNumber: '919216811',
        },
      },
    ],
    { returnCode: '100004' }
  );
});
Given('Tải không thành công', function () {
  addSoapCall(
    getTestContext(this),
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
          discount: '0',
        },
      },
    ],
    { returnCode: '100004' }
  );
});
Given('Tải nhạc chờ thành công', function () {
  addSoapCall(
    getTestContext(this),
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
          discount: '0',
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
Then('Thông báo không lấy được trạng thái', function () {
  const ctx = getTestContext(this);
  return ctx.req?.expect(200).expect({
    data: {
      downloadRbt: {
        success: false,
        message: 'Unknown Error',
        errorCode: '999999',
        result: null,
      },
    },
  });
});
Then('Thông báo không tải được do chưa đăng kí', function () {
  return getTestContext(this)
    .req?.expect(200)
    .expect({
      data: {
        downloadRbt: {
          success: false,
          message:
            'Tải không thành công do Quý khách chưa đăng ký dịch vụ nhạc chờ! Quý khách vui lòng soạn DK1 gửi 1221 hoặc liên hệ 198 (miễn phí)',
          errorCode: '100004',
          result: null,
        },
      },
    });
});
Then('Thông báo tải không thành công', function () {
  return getTestContext(this)
    .req?.expect(200)
    .expect((res) => {
      expect(res.body.data.downloadRbt).contains({
        success: true,
        message: 'Successful',
        errorCode: null,
      });
      expect(res.body.data.downloadRbt.result).contains('Lỗi đường truyền');
    });
});
Then('Thông báo tải thành công', function () {
  return getTestContext(this)
    .req?.expect(200)
    .expect((res) => {
      expect(res.body.data.downloadRbt).contains({
        success: true,
        message: 'Successful',
        errorCode: null,
      });
      expect(res.body.data.downloadRbt.result).not.contains('Lỗi đường truyền');
      expect(res.body.data.downloadRbt.result).contains('thành công');
    });
});

When('Tải nhạc chờ', async function () {
  const ctx = getTestContext(this);
  ctx.req = ctx.agent.post(GRAPHQL_URL).set(ctx.headers).send({
    query: `
        mutation {
          downloadRbt(rbtCodes: ["470", "6547912"]) {
            success
            message
            errorCode
            result
          }
        }
      `,
  });
});
