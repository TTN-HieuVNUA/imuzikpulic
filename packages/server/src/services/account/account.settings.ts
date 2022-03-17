import { Injectable } from '@nestjs/common';
import ms = require('ms');

import { Config, SettingService } from '../../infra/config';

@Injectable()
export class AccountSettings {
  constructor(private ss: SettingService, private config: Config) {}

  // From DB
  getRefreshTokenTimeoutAsync = async () => this.ss.getDuration('REFRESH_TOKEN_TIMEOUT', '7d');
  getAccessTokenTimeoutAsync = async () => this.ss.getDuration('ACCESS_TOKEN_TIMEOUT', '2h');
  getCaptchaTimeoutAsync = async () => this.ss.getDuration('CAPTCHA_TIMEOUT', '10m');

  getFailedLoginLimitWithoutCaptchaAsync = async () =>
    this.ss.getNumber('FAILED_LOGIN_LIMIT_WITHOUT_CAPTCHA', 3);
  getFailedLoginLimitWithCaptchaAsync = async () =>
    this.ss.getNumber('FAILED_LOGIN_LIMIT_WITH_CAPTCHA', 3);
  getFailedLoginLimitDurationAsync = async () =>
    this.ss.getDuration('FAILED_LOGIN_LIMIT_DURATION', '10m');

  getAvatarSizeLimitAsync = async () => this.ss.getNumber('AVATAR_SIZE_LIMIT', 500 * 1000);

  // From ENV
  getMemberCacheTimeout = () => ms(this.config.MEMBER_CACHE_TIMEOUT);
  getUploadPath = () => this.config.UPLOAD_PATH;
  getUploadPrefix = () => this.config.UPLOAD_PREFIX;
  getMediaRootImageMember = () => this.config.MEDIA_ROOT_IMAGE_MEMBER;
}
