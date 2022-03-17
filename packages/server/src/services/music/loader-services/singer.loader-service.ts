import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { Singer } from '../models';
import { LoggingService } from './../../../infra/logging/logging.service';
import { SINGER_ACTIVE } from './../models/singer.entity';

@Injectable()
export class SingerLoaderService extends DataLoaderService<'id' | 'slug', Singer> {
  constructor(
    @InjectRepository(Singer)
    singerRepository: Repository<Singer>,
    loggingService: LoggingService,
    config: Config
  ) {
    super(
      singerRepository,
      loggingService.getLogger('singer-loader-service'),
      { isActive: SINGER_ACTIVE },
      ms(config.CACHE_TIMEOUT),
      ['id', 'slug']
    );
  }
}
