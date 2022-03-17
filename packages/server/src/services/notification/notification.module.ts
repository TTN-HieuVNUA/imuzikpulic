import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from '../account';
import { DeviceRegistrationResolver } from './device-registration.resolver';
import { DeviceRegistration } from './models/gcm.entity';
import { NotificationService } from './notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceRegistration]), AccountModule],
  providers: [NotificationService, DeviceRegistrationResolver],
})
export class NotificationModule {}
