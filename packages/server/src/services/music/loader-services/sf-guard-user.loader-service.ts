import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Repository } from 'typeorm';

import { Config } from '../../../infra/config';
import { DataLoaderService } from '../../../infra/util/data-loader.service';
import { SfGuardUser,USER_ACTIVE } from '../../rbt-creation/models/sf-guard-user.entity';

import { LoggingService } from './../../../infra/logging/logging.service';

@Injectable()
export class SfGuardUserLoaderService extends DataLoaderService<'id', SfGuardUser> {
  constructor(
    @InjectRepository(SfGuardUser)
    singerRepository: Repository<SfGuardUser>,
    loggingService: LoggingService,
    config: Config
  ) {
    super(
      singerRepository,
      loggingService.getLogger('sf-guard-user-loader-service'),
      { is_active: USER_ACTIVE },
      ms(config.CACHE_TIMEOUT),
      ['id']
    );
  }
}
