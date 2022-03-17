import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { ContentProvider } from '../models';
import { LoggingService } from './../../../infra/logging/logging.service';

@Injectable()
export class ContentProviderLoaderService extends DataLoaderService<
  'id' | 'group',
  ContentProvider
> {
  constructor(
    @InjectRepository(ContentProvider)
    contentProviderRepository: Repository<ContentProvider>,
    loggingService: LoggingService,
    config: Config
  ) {
    super(
      contentProviderRepository,
      loggingService.getLogger('cp-loader-service'),
      {},
      ms(config.CACHE_TIMEOUT),
      ['id', 'group']
    );
  }
}
