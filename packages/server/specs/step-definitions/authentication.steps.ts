import { INestApplication } from '@nestjs/common';
import { Given, Then } from 'cucumber';

import { AccountService } from '../../src/services/account';
import { Member } from '../../src/services/account/models/member.entity';
import { getTestContext } from './../hooks';

Given('Chưa đăng nhập', () => null);
Given('Đã đăng nhập', async function () {
  const ctx = getTestContext(this);
  const app: INestApplication = ctx.app;
  const accountService = app.get(AccountService);
  const member = new Member();
  member.phoneNumber = member.username = '919216811';
  const { accessToken } = await accountService.login(member);
  ctx.headers['Authorization'] = `Bearer ${accessToken}`;
});

Then('Yêu cầu đăng nhập', function () {
  const ctx = getTestContext(this);
  return ctx.req?.expect(200).expect({
    data: {
      downloadRbt: {
        success: false,
        message: 'Require login.',
        errorCode: '000002',
        result: null,
      },
    },
  });
});
