import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { RingBackTone } from '../models';
import { LoggingService } from './../../../infra/logging/logging.service';

@Injectable()
export class RingBackToneLoaderService extends DataLoaderService<
  'id' | 'huaweiToneCode',
  RingBackTone,
  'vtSongId'
> {
  constructor(
    @InjectRepository(RingBackTone)
    ringBackToneRepository: Repository<RingBackTone>,
    loggingService: LoggingService,
    config: Config
  ) {
    super(
      ringBackToneRepository,
      loggingService.getLogger('rbt-loader-service'),
      {},
      ms(config.CACHE_TIMEOUT),
      ['id', 'huaweiToneCode'],
      ['vtSongId']
    );
  }
}
