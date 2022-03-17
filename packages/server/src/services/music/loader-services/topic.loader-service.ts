import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { Topic } from '../models';
import { LoggingService } from './../../../infra/logging/logging.service';
import { TOPIC_ACTIVE } from './../models/topic.entity';

@Injectable()
export class TopicLoaderService extends DataLoaderService<'id' | 'slug', Topic> {
  constructor(
    @InjectRepository(Topic)
    topicRepository: Repository<Topic>,
    loggingService: LoggingService,
    config: Config
  ) {
    super(
      topicRepository,
      loggingService.getLogger('topic-loader-service'),
      { isActive: TOPIC_ACTIVE },
      ms(config.CACHE_TIMEOUT),
      ['id', 'slug']
    );
  }
}
