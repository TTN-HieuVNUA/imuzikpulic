import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { ArticleTranslation } from '../models/article-translation.entity';
import { LoggingService } from './../../../infra/logging/logging.service';

@Injectable()
export class ArticleTranslationLoaderService extends DataLoaderService<'id' | 'slug', ArticleTranslation> {
  constructor(
    @InjectRepository(ArticleTranslation)
    articleTranslationRepository: Repository<ArticleTranslation>,
    loggingService: LoggingService,
    config: Config
  ) {
    super(
      articleTranslationRepository,
      loggingService.getLogger('article-translation-loader-service'),
      {  },
      ms(config.CACHE_TIMEOUT),
      ['id', 'slug']
    );
  }
}
