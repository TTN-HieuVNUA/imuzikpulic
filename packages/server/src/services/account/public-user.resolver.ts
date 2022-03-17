import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { LoggingService } from '../../infra/logging';
import { UrlService } from '../../infra/util';
import { BaseResolver } from './../../api/base.resolver';
import { PublicUser } from './account.schemas';
import { Member } from './models/member.entity';

@Resolver(() => PublicUser)
export class PublicUserResolver extends BaseResolver {
  constructor(loggingService: LoggingService, private urlService: UrlService) {
    super(loggingService.getLogger('member-resolver'));
  }
  @ResolveField(() => String, { nullable: true })
  async imageUrl(@Parent() member: Member) {
    return this.urlService.memberAvatarUrl(member.avatarImage);
  }
}
