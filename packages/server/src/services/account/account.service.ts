import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { isBefore, subMilliseconds } from 'date-fns';
import { Request } from 'express';
import { either, taskEither } from 'fp-ts';
import { flow } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import fs = require('fs');
import _ = require('lodash');
import path = require('path');
import sha1 = require('sha1');
import * as svgCaptcha from 'svg-captcha';
import { MoreThan, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { requireCondition } from '../../api';
import {
  AUTH_INVALID_USERNAME_PASSWORD,
  AUTH_PASS_IS_REQUIRE,
  AUTH_REQUIRE_VIETTEL,
  AUTH_USER_CAPTCHA_INVALID,
  AUTH_USER_CAPTCHA_REQUIRE,
  AUTH_USER_IS_LOCKED,
  AUTH_USER_IS_OVER,
  AUTH_USER_IS_REQUIRE,
  AUTH_USER_NOT_ACTIVE,
  CHECK_ADDRESS,
  CHECK_BIRTHDAY,
  CHECK_FULL_NAME,
  EXTENSION_IMAGE,
  REQUIRE_LOGIN,
  ReturnError,
  VALIDATE_NEW_PASSWORD,
  VALIDATE_PASSWORD,
  VALIDATE_REPEAT_PASSWORD,
} from '../../error-codes';
import { LoggingService } from '../../infra/logging';
import { PhoneNumberService } from '../../infra/telecom/phone-number/phone-number.service';
import { DataLoaderService } from '../../infra/util';
import { PublicUser, UpdatePasswordArgs, UpdateProfileArgs } from './account.schemas';
import { AccountSettings } from './account.settings';
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from './constants';
import { LoginFailTimes } from './models/login-fail-times.entity';
import { Member } from './models/member.entity';

const requireProfile = <T extends { profile: UpdateProfileArgs; currentProfile: Member | null }>(
  condition: (args: T) => boolean,
  code: string,
  message?: string
) => (args: T) => async () => {
  return condition(args)
    ? either.right(args)
    : either.left(new ReturnError(code, message, args.currentProfile));
};

const requirePasswords = <T extends { passwords: UpdatePasswordArgs }>(
  condition: (args: T) => boolean,
  code: string,
  message?: string
) => requireCondition(condition, code, message);

export type UserPayload = Pick<Member, 'id' | 'username' | 'phoneNumber' | 'imagePath'>;

export type AccessTokenPayload = {
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
  refreshTokenExpiry: number;
  member: UserPayload;
};
@Injectable()
export class AccountService {
  constructor(
    private phoneNumberService: PhoneNumberService,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(LoginFailTimes) private loginFailTimesRepository: Repository<LoginFailTimes>,
    @Inject(CACHE_MANAGER) private cache: Cache,
    private jwtService: JwtService,
    private loggingService: LoggingService,
    private accountSettings: AccountSettings
  ) {}
  logger = this.loggingService.getLogger('account-service');

  graphqlContext = (req: Request) => ({
    authorizationCode: req.headers['authorization_code'],
    accessToken:
      (req.cookies[ACCESS_TOKEN_COOKIE_KEY] || req.headers['authorization']?.split(' ')[1]) ?? null,
    refreshToken: req.cookies[REFRESH_TOKEN_COOKIE_KEY] ?? null,
  });

  requireLogin = <T = {}>() => (ctx: T & { accessToken: string | null }) => async () => {
    const user = ctx.accessToken && (await this.memberFromAccessToken(ctx.accessToken));
    return user && user.phoneNumber
      ? either.right({ ...ctx, user, msisdn: user.phoneNumber })
      // ? either.right({name:"test-login"})
      // : either.left(ctx.accessToken);
      : either.left(new ReturnError(REQUIRE_LOGIN));
  };

  private memberLoaderService = new DataLoaderService(
    this.memberRepository,
    this.logger,
    {},
    this.accountSettings.getMemberCacheTimeout(),
    ['username', 'id']
  );

  findMemberById = (id: string) => this.memberLoaderService.loadBy('id', id);
  findMemberByUsername = (username: string) =>
    this.memberLoaderService.loadBy('username', username);

  async getPublicUser(id: string) {
    const member = await this.findMemberById(id);
    return member && Object.assign(new PublicUser(), member);
  }

  login = async (member: UserPayload, currentRefreshToken?: string | null) => {
    const payload: UserPayload = {
      id: member.id,
      username: member.username,
      phoneNumber: member.phoneNumber,
      imagePath: member.imagePath,
    };

    const now = new Date().getTime();

    const refreshTokenExpiry = await this.jwtService
      .verifyAsync(currentRefreshToken ?? '', { audience: 'refresh' })
      .then((p: { exp: number }) => p.exp * 1000)
      .catch(() => null);

    // TODO: Consider issuing new refreshToken and invalidate the old one

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: (await this.accountSettings.getAccessTokenTimeoutAsync()) / 1000,
        audience: 'access',
      }),
      accessTokenExpiry: now + (await this.accountSettings.getAccessTokenTimeoutAsync()),
      refreshToken:
        refreshTokenExpiry && currentRefreshToken
          ? currentRefreshToken
          : await this.jwtService.signAsync(payload, {
              expiresIn: (await this.accountSettings.getRefreshTokenTimeoutAsync()) / 1000,
              audience: 'refresh',
              jwtid: uuidV4(),
            }),
      refreshTokenExpiry:
        refreshTokenExpiry ?? now + (await this.accountSettings.getRefreshTokenTimeoutAsync()),
      member,
    };
  };

  private loginTE = <M extends UserPayload>(currentRefreshToken?: string) => (member: M) =>
    taskEither.rightTask<ReturnError, AccessTokenPayload>(async () =>
      this.login(member, currentRefreshToken)
    );

  async memberFromAccessToken(accessToken: string) {
    try {
      return await this.jwtService.verifyAsync<UserPayload>(accessToken, { audience: 'access' });
    } catch (e) {
      return null;
    }
  }

  memberFromTokenTE = (audience: string) => (token: string) => async () => {
    let member: UserPayload;
    try {
      member = await this.jwtService.verifyAsync<UserPayload>(token, { audience });
    } catch (e) {
      this.logger.debug(e);
      return either.left(new ReturnError(REQUIRE_LOGIN));
    }
    return either.right(member);
  };

  refreshTokenTE = (refreshToken: string) =>
    pipe(
      refreshToken,
      this.memberFromTokenTE('refresh'),
      taskEither.chain(this.loginTE(refreshToken))
    );

  private captchaKey(authorizationCode: string, username: string) {
    return `captcha:${username}:${authorizationCode}`;
  }

  async generateCaptcha(authorizationCode: string, enteredUsername: string) {
    const username = this.phoneNumberService.normalizeMsisdn(enteredUsername);
    const captcha = svgCaptcha.create({ size: 6 });
    this.logger.debug(`username:${username} captcha:${captcha.text}`);
    const signature = sha1(authorizationCode + username + captcha.text);
    await this.cache.set(this.captchaKey(authorizationCode, username), signature, {
      ttl: await this.accountSettings.getCaptchaTimeoutAsync(),
    });
    return {
      data: captcha.data,
    };
  }

  private async clearCaptcha(authorizationCode: string, username: string) {
    await this.cache.del(this.captchaKey(authorizationCode, username));
  }

  private async validateCaptcha(authorizationCode: string, username: string, captcha: string) {
    return (
      sha1(authorizationCode + username + captcha) ===
      (await this.cache.get(this.captchaKey(authorizationCode, username)))
    );
  }

  private async getRecentFailedCount(member: Member) {
    return this.loginFailTimesRepository.count({
      phoneNumber: member.phoneNumber ?? undefined,
      createdTime: MoreThan(
        subMilliseconds(new Date(), await this.accountSettings.getFailedLoginLimitDurationAsync())
      ),
    });
  }

  authenticateTE = (
    authorizationCode: string,
    enteredUsername: string,
    password: string,
    captcha: string,
    msisdn: string,
    ip: string
  ) =>
    pipe(
      { msisdn, ip },
      this.autoLoginTE,
      taskEither.fold(
        () => async () => {
          const username = this.phoneNumberService.normalizeMsisdn(enteredUsername);
          if (!username) return either.left(new ReturnError(AUTH_USER_IS_REQUIRE));
          if (!password) return either.left(new ReturnError(AUTH_PASS_IS_REQUIRE));
          if (!(await this.phoneNumberService.isViettelPhoneNumberAsync(username)))
            return either.left(new ReturnError(AUTH_REQUIRE_VIETTEL));
          const member = await this.memberRepository.findOne({ username });
          this.logger.debug(username, member ? 'found' : 'not-found');
          if (!member) return either.left(new ReturnError(AUTH_INVALID_USERNAME_PASSWORD));
          if (!member.actived) return either.left(new ReturnError(AUTH_USER_NOT_ACTIVE));

          const failCount = await this.getRecentFailedCount(member);

          const noCaptchaLimit = await this.accountSettings.getFailedLoginLimitWithoutCaptchaAsync();
          const totalLimit =
            noCaptchaLimit + (await this.accountSettings.getFailedLoginLimitWithCaptchaAsync());

          if (failCount >= totalLimit) return either.left(new ReturnError(AUTH_USER_IS_LOCKED));

          if (failCount >= noCaptchaLimit) {
            if (!captcha) return either.left(new ReturnError(AUTH_USER_CAPTCHA_REQUIRE));
            if (!(await this.validateCaptcha(authorizationCode, username, captcha))) {
              return either.left(new ReturnError(AUTH_USER_CAPTCHA_INVALID));
            } else {
              await this.clearCaptcha(authorizationCode, username);
            }
          }
          this.logger.debug(`username:${username} password:${password}`);
          this.logger.debug(`generatePasswordHash ok:${Member.generatePasswordHash(password)}`);
          console.log("Log-Pass:"+Member.generatePasswordHash(password));

          if (!member.validatePassword(password)) {
            const fail = new LoginFailTimes();
            fail.phoneNumber = member.username ?? '';
            fail.createdTime = new Date();
            await this.loginFailTimesRepository.save(fail);
            if ((await this.getRecentFailedCount(member)) >= totalLimit) {
              return either.left(new ReturnError(AUTH_USER_IS_OVER));
            }
            return either.left(new ReturnError(AUTH_INVALID_USERNAME_PASSWORD));
          }
          return either.right(member);
        },
        (member) => taskEither.right(member)
      ),
      taskEither.chain(this.loginTE())
    );

  autoLoginTE = (args: { msisdn: string; ip: string }) => async () => {
    const { msisdn, ip } = args;
    const validatedMsisdn = await this.phoneNumberService.validateMsisdn(msisdn, ip);
    if (validatedMsisdn) {
      let member = await this.memberRepository.findOne({ phoneNumber: validatedMsisdn });
      if (!member) {
        member = new Member();
        member.username = validatedMsisdn;
        member.password = Member.generatePasswordHash(uuidV4());
        member.phoneNumber = validatedMsisdn;
        member.actived = 1;
        member.locked = false;
        member.isFirstLogin = 1;
        member.createdAt = member.updatedAt = new Date();
        this.memberRepository.save(member);
      }
      return either.right(member);
    }
    return either.left(null);
  };
  updatePassword = flow(
    this.requireLogin<{ passwords: UpdatePasswordArgs; authorizationCode: string }>(),
    taskEither.chain(
      requirePasswords(
        ({ passwords: { currentPassword } }) => !!currentPassword,
        VALIDATE_PASSWORD,
        'Không được để trống trường password.'
      )
    ),
    taskEither.chain(
      requirePasswords(
        ({ passwords: { newPassword } }) => !!newPassword,
        VALIDATE_NEW_PASSWORD,
        'Không được để trống trường mật khẩu mới.'
      )
    ),
    taskEither.chain(
      requirePasswords(
        ({ passwords: { repeatPassword } }) => !!repeatPassword,
        VALIDATE_REPEAT_PASSWORD,
        'Không được để trống trường nhập lại mật khẩu mới.'
      )
    ),
    taskEither.chain(
      requirePasswords(
        ({ passwords: { newPassword } }) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%-+!~&^*=]).{6,20}$/.test(newPassword),
        VALIDATE_NEW_PASSWORD,
        'Mật khẩu phải từ 6-20 ký tự và bao gồm chữ thường, chữ HOA, số và ký tự đặc biệt'
      )
    ),
    taskEither.chain(
      requirePasswords(
        ({ passwords: { newPassword, currentPassword } }) => newPassword !== currentPassword,
        VALIDATE_REPEAT_PASSWORD,
        'Mật khẩu mới không được giống mật khẩu cũ'
      )
    ),
    taskEither.chain(
      requirePasswords(
        ({ passwords: { newPassword, repeatPassword } }) => newPassword === repeatPassword,
        VALIDATE_REPEAT_PASSWORD,
        'Xác nhận mật khẩu không khớp với mật khẩu mới'
      )
    ),
    taskEither.chain(
      ({
        msisdn,
        passwords: { newPassword, currentPassword, captcha },
        authorizationCode,
      }) => async () => {
        const member = await this.memberRepository.findOne({ username: msisdn });
        if (member) {
          if (!member.validatePassword(currentPassword)) {
            return either.left(new ReturnError(VALIDATE_PASSWORD, 'Mật khẩu cũ không đúng.'));
          }
          if (!captcha) return either.left(new ReturnError(AUTH_USER_CAPTCHA_REQUIRE));
          if (!(await this.validateCaptcha(authorizationCode, msisdn, captcha))) {
            return either.left(new ReturnError(AUTH_USER_CAPTCHA_INVALID));
          } else {
            await this.clearCaptcha(authorizationCode, msisdn);
          }

          member.password = Member.generatePasswordHash(msisdn+newPassword);
          await this.memberRepository.save(member);
        }
        return either.right('Thay đổi mật khẩu thành công');
      }
    )
  );
  updateProfile = flow(
    this.requireLogin<{ profile: UpdateProfileArgs }>(),
    taskEither.chain((args) => async () =>
      either.right({ ...args, currentProfile: await this.findMemberByUsername(args.msisdn) })
    ),
    taskEither.chain(
      requireProfile(
        ({ profile }) => !profile.birthday || isBefore(profile.birthday, new Date()),
        CHECK_BIRTHDAY,
        'Ngày sinh không được lớn hơn hoặc bằng ngày hiện tại.'
      )
    ),
    taskEither.chain(
      requireProfile(
        ({ profile }) => profile.fullName.length <= 255,
        CHECK_FULL_NAME,
        'Bạn chỉ có thể nhập tối đa 255 ký tự.'
      )
    ),
    taskEither.chain(
      requireProfile(
        ({ profile }) => profile.address.length <= 255,
        CHECK_ADDRESS,
        'Bạn chỉ có thể nhập tối đa 255 ký tự.'
      )
    ),
    taskEither.chain(({ msisdn, profile }) => async () => {
      const oldMember = await this.memberRepository.findOne({ phoneNumber: msisdn });
      if (oldMember) {
        // TODO: birthday is having random hour and tz at the moment
        const updatedMember = Object.assign(new Member(), oldMember, profile);
        updatedMember.updatedAt = new Date();
        await this.memberRepository.save(updatedMember);
        // TODO: user querying to other nodes might still get stale data. consider switch to redis
        // for this memberLoader
        this.memberLoaderService.clear(oldMember);
        this.memberLoaderService.prime(updatedMember);
        return either.right(updatedMember);
      }
      return either.right(null);
    })
  );
  updateAvatar = flow(
    this.requireLogin<{ avatar: string; extension: string }>(),
    taskEither.chain((ctx) => async () => {
      if (ctx.avatar.length > (await this.accountSettings.getAvatarSizeLimitAsync()))
        return either.left(new ReturnError(EXTENSION_IMAGE, 'Ảnh vượt quá kích thước cho phép'));

      const uploadBase = path.join(
        '.',
        this.accountSettings.getUploadPath(),
        this.accountSettings.getUploadPrefix(),
        this.accountSettings.getMediaRootImageMember()
      );
      if (!fs.existsSync(uploadBase)) {
        fs.mkdirSync(uploadBase, { recursive: true, mode: '0777' });
      }
      const fileName = `${uuidV4()}.${ctx.extension}`;
      const base64Data = _.last(ctx.avatar.split(/base64,/)) ?? '';
      if (base64Data.length === 0)
        return either.left(new ReturnError(EXTENSION_IMAGE, 'Ảnh sai định dạng'));
      await fs.promises.writeFile(path.join(uploadBase, fileName), base64Data, 'base64');

      const member = await this.memberRepository.findOne({ phoneNumber: ctx.msisdn });
      if (member) {
        member.avatarImage = fileName;
        // member.avatarImage = "test";
        member.updatedAt = new Date();
        await this.memberRepository.save(member);
        // TODO: user querying to other nodes might still get stale data. consider switch to redis
        // for this memberLoader
        this.memberLoaderService.clear(member);
        this.memberLoaderService.prime(member);
        return either.right(member);
      }
      return either.right(null);
    })
  );
}
