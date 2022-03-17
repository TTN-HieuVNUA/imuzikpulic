import { Injectable } from '@nestjs/common';
import { ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { BaseResolver } from '../../../api/base.resolver';
import { LoggingService } from '../../../infra/logging';
import { UrlService } from '../../../infra/util/url/url.service';
import { CallGroup } from '../rbt.schemas';

@Injectable()
@Resolver(() => CallGroup)
export class GroupResolver extends BaseResolver {
  constructor(loggingService: LoggingService, private urlService: UrlService) {
    super(loggingService.getLogger('api'));
  }

  @ResolveField(() => ID)
  id(@Parent() g: any) {
    return g?.groupCode;
  }
  @ResolveField(() => String)
  name(@Parent() g: any) {
    return g?.groupName;
  }
}
