import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { LoggingService } from './../../../infra/logging/logging.service';
import { RingBackToneCreation } from '../models/ring-back-tone-creation.entity';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class RingBackToneCreationLoaderService extends DataLoaderService<
  'id' | 'tone_code' | 'slug',
  RingBackToneCreation,
  'song_id'
> {
  constructor(
    @InjectRepository(RingBackToneCreation)
    ringBackToneCreationRepository: Repository<RingBackToneCreation>,
    loggingService: LoggingService,
    config: Config,
    redisService?: RedisService
  ) {
    super(
      ringBackToneCreationRepository,
      loggingService.getLogger('rbt-loader-service'),
      {},
      ms(config.CACHE_TIMEOUT),
      ['id', 'tone_code','slug'],
      ['song_id'],
      redisService
    );
  }
}
