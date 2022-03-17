import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { ContentProviderDetail } from '../models';
import { LoggingService } from './../../../infra/logging/logging.service';

@Injectable()
export class ContentProviderDetailLoaderService extends DataLoaderService<
  'id' | 'cp_code',
  ContentProviderDetail,
  'cp_group'
> {
  constructor(
    @InjectRepository(ContentProviderDetail)
    contentProviderDetailRepository: Repository<ContentProviderDetail>,
    loggingService: LoggingService,
    config: Config
  ) {
    super(
      contentProviderDetailRepository,
      loggingService.getLogger('cpd-loader-service'),
      {},
      ms(config.CACHE_TIMEOUT),
      ['id', 'cp_code'],
      ['cp_group']
    );
  }
}
