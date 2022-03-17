import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from '../../infra/config';
import { ConfigModule } from '../../infra/config/config.module';
import { TelecomModule } from '../../infra/telecom/telecom.module';
import { UtilModule } from './../../infra/util/util.module';
import { AccountService } from './account.service';
import { AccountSettings } from './account.settings';
import { AuthenticationResolver } from './authentication.resolver';
import { MemberResolver } from './member.resolver';
import { LoginFailTimes } from './models/login-fail-times.entity';
import { Member } from './models/member.entity';
import { PublicUserResolver } from './public-user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, LoginFailTimes]),
    CacheModule.register(),
    TelecomModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [Config],
      useFactory: (config: Config) => ({ secret: config.JWT_SECRET }),
    }),
    UtilModule,
  ],
  providers: [
    AccountService,
    AuthenticationResolver,
    MemberResolver,
    AccountSettings,
    PublicUserResolver,
  ],
  exports: [AccountService],
})
export class AccountModule {}
