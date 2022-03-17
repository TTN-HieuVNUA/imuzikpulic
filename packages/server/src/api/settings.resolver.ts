import { Query, Resolver } from '@nestjs/graphql';

import { SettingService } from '../infra/config/setting.service';
import { VIP_BRAND_ID } from '../infra/telecom/constants';
import { PhoneNumberService } from '../infra/telecom/phone-number/phone-number.service';
import { ServerSettings } from './server-settings.schema';

@Resolver(() => ServerSettings)
export class ServerSettingsResolver {
  constructor(
    private settingService: SettingService,
    private phoneNumberService: PhoneNumberService
  ) {}
  @Query(() => ServerSettings)
  async serverSettings(): Promise<ServerSettings> {
    return {
      serviceNumber: await this.settingService.get(
        'SERVICE_NUMBER',
        'Soạn tin MK gửi 1221 (miễn phí) để lấy mật khẩu.'
      ),
      isForceUpdate: (await this.settingService.get('APP_FORCE_UPDATE', '0')) === '1',
      clientAutoPlay: (await this.settingService.get('CLIENT_AUTO_PLAY', '1')) === '1',
      msisdnRegex: await this.phoneNumberService.getViettelPhoneNumberRegexAsync(),
      contactEmail: await this.settingService.get('CONTACT_EMAIL', 'contact@viettel.vn'),
      facebookUrl: await this.settingService.get(
        'FACEBOOK_URL',
        'https://www.facebook.com/nhaccho.imuzik/?fref=ts'
      ),
      vipBrandId: VIP_BRAND_ID,
    };
  }
}
