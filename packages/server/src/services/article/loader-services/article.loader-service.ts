import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { Article } from '../models/article.entity';
import { LoggingService } from './../../../infra/logging/logging.service';
import { ARTICLE_ACTIVE } from './../models/article.entity';

@Injectable()
export class ArticleLoaderService extends DataLoaderService<'id' | 'slug', Article> {
  constructor(
    @InjectRepository(Article)
    articleRepository: Repository<Article>,
    loggingService: LoggingService,
    config: Config
  ) {
    super(
      articleRepository,
      loggingService.getLogger('article-loader-service'),
      { status: ARTICLE_ACTIVE },
      ms(config.CACHE_TIMEOUT),
      ['id', 'slug']
    );
  }
}
