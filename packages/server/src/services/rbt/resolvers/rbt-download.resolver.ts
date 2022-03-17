import { Injectable } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { BaseResolver } from '../../../api/base.resolver';
import { LoggingService } from '../../../infra/logging';
import { UrlService } from '../../../infra/util';
import { RingBackTone } from '../../music';
import { RbtDownload } from '../rbt.schemas';

@Injectable()
@Resolver(() => RbtDownload)
export class RbtDownloadResolver extends BaseResolver {
  constructor(loggingService: LoggingService, private urlService: UrlService) {
    super(loggingService.getLogger('api'));
  }

  @ResolveField(() => String)
  fileUrl(@Parent() e: RingBackTone) {
    return this.urlService.mediaUrl(e.vtLink);
  }
}
