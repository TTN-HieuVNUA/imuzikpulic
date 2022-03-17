import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ms = require('ms');
import { Brackets, Repository } from 'typeorm';

import { Config } from '../../infra/config';
import { DataLoaderService } from '../../infra/util';
import { LoggingService } from './../../infra/logging/logging.service';
import { Advertisement } from './models/advertisement.entity';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement) private advertisementRepository: Repository<Advertisement>,
    private loggingService: LoggingService,
    private config: Config
  ) {}

  private advertisementLoaderService = new DataLoaderService(
    this.advertisementRepository,
    this.loggingService.getLogger('ads-service'),
    {},
    ms(this.config.CACHE_TIMEOUT),
    ['id']
  );

  async getActiveHeadlines(channel: string, limit = 5): Promise<Advertisement[]> {
    return (
      await this.advertisementLoaderService.cachedPaginatedList(
        `headlines:${channel}:${limit}`,
        () => this.getActiveBannerByPositionQuery('head_line', channel, limit)
      )
    )[0];
  }

  async getActivePopups(channel: string, limit = 5): Promise<Advertisement[]> {
    return (
      await this.advertisementLoaderService.cachedPaginatedList(`popup:${channel}:${limit}`, () =>
        this.getActiveBannerByPositionQuery('popup', channel, limit)
      )
    )[0];
  }

  getActiveBannerByPositionQuery(position: 'head_line' | 'popup', channel: string, limit: number) {
    return this.advertisementRepository
      .createQueryBuilder('a')
      .where('a.position = :position', { position })
      .andWhere(
        new Brackets((condition) =>
          condition.where("a.channel = 'all'").orWhere('a.channel = :channel', { channel })
        )
      )
      .andWhere('a.start_time < NOW()')
      .andWhere('a.end_time > NOW()')
      .limit(limit)
      .orderBy('a.updated_at', 'DESC')
      .getManyAndCount();
    // TODO: expired popup
    // TODO: isRegistered
  }
}
