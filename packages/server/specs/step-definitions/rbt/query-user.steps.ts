import { Given } from 'cucumber';
import sinon = require('sinon');

import { REGISTERED, SUSPENDING, UN_REGISTERED } from '../../../src/infra/telecom/constants';
import { getTestContext } from '../../hooks';
import { USER_MANAGE } from './../../constants';
import { addSoapCall } from './utils';

Given('Chưa đăng ký dịch vụ', function () {
  const ctx = getTestContext(this);
  addSoapCall(
    ctx,
    USER_MANAGE,
    'query',
    [
      {
        QueryUserEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          startRecordNum: '1',
          endRecordNum: '1',
          queryType: '2',
          phoneNumber: '919216811',
        },
      },
    ],
    {
      returnCode: '000000',
      userInfos: null,
    }
  );
});
Given('Chưa đăng ký dịch vụ và có {int} dữ liệu', function (count: number) {
  const ctx = getTestContext(this);
  addSoapCall(
    ctx,
    USER_MANAGE,
    'query',
    [
      {
        QueryUserEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          startRecordNum: '1',
          endRecordNum: '1',
          queryType: '2',
          phoneNumber: '919216811',
        },
      },
    ],
    {
      returnCode: '000000',
      userInfos:
        count === 0
          ? null
          : [
              {
                status: UN_REGISTERED,
                serviceOrders: 1,
                brand: 1,
              },
            ],
    }
  );
});
Given('Đang tạm dừng dịch vụ', function () {
  const ctx = getTestContext(this);
  const client = {
    queryAsync: sinon.stub().returns(
      Promise.resolve([
        {
          returnCode: '000000',
          userInfos: [
            {
              status: SUSPENDING,
              serviceOrders: 1,
              brand: 1,
            },
          ],
        },
      ])
    ),
  };
  ctx.soapCalls[USER_MANAGE].push({
    client,
    assert() {
      sinon.assert.calledOnceWithExactly(client.queryAsync, {
        QueryUserEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          startRecordNum: '1',
          endRecordNum: '1',
          queryType: '2',
          phoneNumber: '919216811',
        },
      });
    },
  });
});
Given('Dịch vụ đang active', function () {
  const ctx = getTestContext(this);
  const client = {
    queryAsync: sinon.stub().returns(
      Promise.resolve([
        {
          returnCode: '000000',
          userInfos: [
            {
              status: REGISTERED,
              serviceOrders: 1,
              brand: 1,
            },
          ],
        },
      ])
    ),
  };
  ctx.soapCalls[USER_MANAGE].push({
    client,
    assert() {
      sinon.assert.calledOnceWithExactly(client.queryAsync, {
        QueryUserEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          startRecordNum: '1',
          endRecordNum: '1',
          queryType: '2',
          phoneNumber: '919216811',
        },
      });
    },
  });
});

Given('Lấy trạng thái không thành công', function () {
  const ctx = getTestContext(this);
  addSoapCall(
    ctx,
    USER_MANAGE,
    'query',
    [
      {
        QueryUserEvt: {
          portalAccount: 'sample_app_code',
          portalPwd: 'sample_app_password',
          startRecordNum: '1',
          endRecordNum: '1',
          queryType: '2',
          phoneNumber: '919216811',
        },
      },
    ],
    null,
    'Socket hang up'
  );
});
