import { Injectable } from '@nestjs/common';

import { Config, SettingService } from './../config';
import { LoggingService } from './../logging';

const DEFAULT_VIETTEL_PHONE_NUMBER_REGEX = /^(0|84|\+84|)[1-9]([0-9]{8})$/;
@Injectable()
export class TelecomSettings {
  constructor(
    private ss: SettingService,
    private config: Config,
    private loggingServer: LoggingService
  ) {}
  private logger = this.loggingServer.getLogger('telecom-settings');
  // From DB
  getViettelPhoneNumberRegexAsync = async () => {
    try {
      return new RegExp(
        await this.ss.get('VIETTEL_PHONE_NUMBER_REGEX', DEFAULT_VIETTEL_PHONE_NUMBER_REGEX.source)
      );
    } catch (e) {
      this.logger.error(e);

      return DEFAULT_VIETTEL_PHONE_NUMBER_REGEX;
    }
  };

  // From ENV
}
