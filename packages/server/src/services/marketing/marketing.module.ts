import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilModule } from '../../infra/util/util.module';
import { RingBackTone, Song } from '../music';
import { RingBackToneLoaderService, SongLoaderService } from '../music/loader-services';
import { ApiHelperModule } from './../../api/api-helper.module';
import { AccountModule } from './../account/account.module';
import { MusicModule } from './../music/music.module';
import { RbtModule } from './../rbt/rbt.module';
import { AdvertisementService } from './advertisement.service';
import { BannerService } from './banner.service';
import { MarketingService } from './marketing.service';
import { Advertisement } from './models/advertisement.entity';
import { BannerItem } from './models/banner-item.entity';
import { BannerPackage } from './models/banner-package.entity';
import { Banner } from './models/banner.entity';
import { SpamLog } from './models/spam-log.entity';
import { SpamSeen } from './models/spam-seen.entity';
import { Spam } from './models/spam.entity';
import { AdvertisementResolver } from './resolvers/advertisement.resolver';
import { BannerItemResolver } from './resolvers/banner-item.resolver';
import { BannerResolver } from './resolvers/banner.resolver';
import { SpamResolver } from './resolvers/spam.resolver';
import { SpamLoaderService, SpamService } from './spam.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Banner,
      BannerItem,
      Spam,
      SpamLog,
      SpamSeen,
      Advertisement,
      BannerPackage,
      RingBackTone,
      Song,
    ]),
    UtilModule,
    MusicModule,
    AccountModule,
    ApiHelperModule,
    RbtModule,
  ],
  providers: [
    BannerService,
    BannerResolver,
    BannerItemResolver,
    SpamService,
    SpamLoaderService,
    SpamResolver,
    AdvertisementService,
    AdvertisementResolver,
    MarketingService,
    RingBackToneLoaderService,
    SongLoaderService,
  ],
})
export class MarketingModule {}