import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RingBackToneCreation } from '../music/models/ring-back-tone-creation.entity';
import { ContentProvider, MusicModule, RingBackTone } from '../music';
import { RingBackToneCreationResolver } from './resolvers/ring-back-tone-creation.resolver';
import { TelecomModule, UtilModule } from '../../infra';
import { AccountModule } from '../account';
import { ApiHelperModule } from '../../api';
import { SocialModule } from '../social/social.module';
import { RbtCreationService } from './rbt-creation.service';
import { LogRbtCreationEntity } from './models/log-rbt-creation.entity';
import { FTP } from '../../infra/ftp/ftp-hepper';
import { RbtService } from '../rbt/rbt.service';
import { PromotionService } from '../rbt/promotion.service';
import { LogRbtServiceEntity } from '../rbt/models/log-rbt-service.entity';
import { LogRingBackTone } from '../rbt/log-models/log-ring-back-tone.entity';
import { Promotion } from '../rbt/models/promotion.entity';
import { PromotionLog } from '../rbt/models/promotion-log.entity';
import { ContentProviderLoaderService, RingBackToneLoaderService } from '../music/loader-services';
import { SfGuardUserLoaderService } from '../music/loader-services/sf-guard-user.loader-service';
import { SfGuardUser } from './models/sf-guard-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RingBackToneCreation,RingBackTone,SfGuardUser, LogRbtCreationEntity,ContentProvider]),
    MusicModule,
    UtilModule,
    AccountModule,
    ApiHelperModule,
    SocialModule,
    TypeOrmModule.forFeature([Promotion, PromotionLog]),
    TypeOrmModule.forFeature([LogRingBackTone], 'log_db'),
    TypeOrmModule.forFeature([LogRbtServiceEntity], 'log_db'),
    TelecomModule,
    MusicModule,
  ],
  providers: [RingBackToneCreationResolver,
     RbtCreationService,
     FTP,
     RbtService,
     PromotionService,
     ContentProviderLoaderService,
     RingBackToneLoaderService,
     SfGuardUserLoaderService
    ],
  exports: [],
})
export class RbtCreationModule {}
