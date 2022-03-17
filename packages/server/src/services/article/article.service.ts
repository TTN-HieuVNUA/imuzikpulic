import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from '../../infra/config';
import { DataLoaderService, TypeOfClassMethod } from '../../infra/util';
import { LoggingService } from './../../infra/logging/logging.service';
import { Article,ARTICLE_ACTIVE } from './models/article.entity';



import ms = require('ms');

import LRU = require('lru-cache');
@Injectable()
export class ArticleService {
  
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
   
    private readonly loggingService: LoggingService,
    private config: Config
  ) {}
  private articleLoaderService = new DataLoaderService(
    this.articleRepository,
    this.loggingService.getLogger('article-service'),
    { status: ARTICLE_ACTIVE },
    ms(this.config.CACHE_TIMEOUT),
    ['id']
  );

  findArticleById(id: string) {
    return this.articleLoaderService.loadBy('id', id);
  }
 

  cachedPaginatedArticleList: TypeOfClassMethod<
    DataLoaderService<'id', Article>,
    'cachedPaginatedList'
  > = (key, query) => this.articleLoaderService.cachedPaginatedList(key, query);

  
}
