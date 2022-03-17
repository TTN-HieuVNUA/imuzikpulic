import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { Song, SONG_STATUS } from '../models';
import { LoggingService } from './../../../infra/logging/logging.service';

@Injectable()
export class SongLoaderService extends DataLoaderService<'id' | 'slug', Song> {
  constructor(
    @InjectRepository(Song)
    songRepository: Repository<Song>,
    loggingService: LoggingService,
    config: Config
  ) {
    super(
      songRepository,
      loggingService.getLogger('song-loader-service'),
      { status: SONG_STATUS.ACTIVE },
      ms(config.CACHE_TIMEOUT),
      ['id', 'slug']
    );
  }
}
