import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from './config';
import { SettingService } from './setting.service';
import { SystemSetting } from './system-setting.entity';

@Global()
@Module({
  providers: [Config, SettingService],
  exports: [Config, SettingService],
  imports: [TypeOrmModule.forFeature([SystemSetting])],
})
export class ConfigModule {}
