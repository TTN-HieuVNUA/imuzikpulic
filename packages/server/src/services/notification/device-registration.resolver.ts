import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { StringPayload } from '../../api';
import { BaseResolver } from '../../api/base.resolver';
import { LoggingService } from '../../infra/logging';
import { NotificationService } from './notification.service';

@Resolver()
export class DeviceRegistrationResolver extends BaseResolver {
  constructor(private notificationService: NotificationService, loggingService: LoggingService) {
    super(loggingService.getLogger('spam-resolver'));
  }

  @Mutation(() => StringPayload)
  async registerDevice(
    @Args('registerId') registerId: string,
    @Args('deviceType') deviceType: string,
    @Context('accessToken') accessToken: string | null
  ): Promise<StringPayload> {
    return this.resolvePayloadTask(
      this.notificationService.registerDevice({
        accessToken,
        registerId,
        deviceType,
      })
    );
  }
}
