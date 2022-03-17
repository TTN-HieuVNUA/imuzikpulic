import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader = require('dataloader');
import LRU = require('lru-cache');
import ms = require('ms');
import { In, Repository } from 'typeorm';

import { lruCacheMap } from '../util';
import { Config } from './config';
import { SystemSetting } from './system-setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SystemSetting) private systemSettingRepository: Repository<SystemSetting>,
    private config: Config
  ) {}

  private lru = new LRU<string, string | null>({
    maxAge: ms(this.config.SYSTEM_SETTING_CACHE_TIMEOUT),
  });

  private settingLoader = new DataLoader<string, string | null>(
    async (keys) => {
      const settings = await this.systemSettingRepository.find({ configKey: In([...keys]) });
      return keys.map((key) => settings.find((s) => s.configKey === key)?.configValue ?? null);
    },
    { cacheMap: lruCacheMap(this.lru) }
  );

  async get(key: string, defaultValue: string): Promise<string> {
    try {
      return (await this.settingLoader.load(key)) ?? defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  async getNumber(key: string, defaultValue: number): Promise<number> {
    try {
      return parseInt((await this.settingLoader.load(key)) ?? '', 10) ?? defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }
  async getDuration(key: string, defaultValue: string): Promise<number> {
    try {
      return ms((await this.settingLoader.load(key)) ?? defaultValue);
    } catch (e) {
      return ms(defaultValue);
    }
  }
}
