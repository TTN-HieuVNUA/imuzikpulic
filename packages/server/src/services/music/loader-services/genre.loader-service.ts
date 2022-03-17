import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { Genre } from '../models';
import { LoggingService } from './../../../infra/logging/logging.service';
import { GENRE_ACTIVE } from './../models/genre.entity';

@Injectable()
export class GenreLoaderService extends DataLoaderService<'id' | 'slug', Genre> {
  constructor(
    @InjectRepository(Genre)
    genreRepository: Repository<Genre>,
    loggingService: LoggingService,
    config: Config
  ) {
    super(
      genreRepository,
      loggingService.getLogger('genre-loader-service'),
      { isActive: GENRE_ACTIVE },
      ms(config.CACHE_TIMEOUT),
      ['id', 'slug']
    );
  }
}
