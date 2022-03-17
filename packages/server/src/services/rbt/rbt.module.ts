import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TelecomModule } from '../../infra/telecom/telecom.module';
import { UtilModule } from '../../infra/util/util.module';
import { AccountModule } from '../account';
import { MusicModule } from '../music/music.module';
import { LogRingBackTone } from './log-models/log-ring-back-tone.entity';
import { LogRbtServiceEntity } from './models/log-rbt-service.entity';
import { PromotionLog } from './models/promotion-log.entity';
import { Promotion } from './models/promotion.entity';
import { PromotionService } from './promotion.service';
import { RbtGroupService } from './rbt-group.service';
import { RbtService } from './rbt.service';
import { GroupInfoResolver } from './resolvers/group-info.resolver';
import { GroupTimeSettingResolver } from './resolvers/group-time-setting.resolver';
import { GroupResolver } from './resolvers/group.resolver';
import { MyRbtResolver } from './resolvers/my-rbt.resolver';
import { RbtDownloadResolver } from './resolvers/rbt-download.resolver';

@Module({
  providers: [
    RbtService,
    PromotionService,
    RbtGroupService,
    MyRbtResolver,
    GroupResolver,
    RbtDownloadResolver,
    GroupInfoResolver,
    GroupTimeSettingResolver,
  ],
  imports: [
    TypeOrmModule.forFeature([Promotion, PromotionLog]),
    TypeOrmModule.forFeature([LogRingBackTone], 'log_db'),
    TypeOrmModule.forFeature([LogRbtServiceEntity], 'log_db'),
    TelecomModule,
    MusicModule,
    AccountModule,
    UtilModule,
  ],
  exports: [RbtService, RbtGroupService],
})
export class RbtModule {}
