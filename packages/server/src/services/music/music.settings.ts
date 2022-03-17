import { Injectable } from '@nestjs/common';

import { SettingService } from '../../infra/config/setting.service';
import { Chart } from './music.schemas';

@Injectable()
export class MusicSettings {
  constructor(private settingService: SettingService) {}

  async getRbtExpiredDays() {
    return parseInt(await this.settingService.get('RBT_EXPIRED_DAYS', '30'), 10) || 30;
  }

  async getICharts(): Promise<Chart[]> {
    return JSON.parse(
      await this.settingService.get(
        'ICHARTS',
        JSON.stringify([
          { id: '1', name: 'Nhạc trẻ', slug: 'nhac-tre' },
          { id: '2', name: 'Quốc tế', slug: 'quoc-te' },
          { id: '3', name: 'Trữ tình', slug: 'tru-tinh' },
          { id: '12', name: 'Sáng tạo', slug: 'sang-tao' },
        ])
      )
    ).map((c: { id: string; name: string; slug: string }) => Object.assign(new Chart(), c));
  }
}
