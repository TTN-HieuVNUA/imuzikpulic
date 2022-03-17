import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader = require('dataloader');
import { either, taskEither } from 'fp-ts';
import { flow } from 'fp-ts/lib/function';
import LRUCache = require('lru-cache');
import ms = require('ms');
import { In, Repository } from 'typeorm';

import { Config } from '../../infra/config';
import { lruCacheMap } from '../../infra/util';
import { AccountService } from './../account/account.service';
import { MAX_REGISTER_ID_CACHE_SIZE } from './constants';
import { DeviceRegistration } from './models/gcm.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(DeviceRegistration)
    private deviceRegistrationRepository: Repository<DeviceRegistration>,
    private accountService: AccountService,
    private config: Config
  ) {}
  registrationLoader = new DataLoader<string, boolean>(
    async (keys) => {
      const registrations = await this.deviceRegistrationRepository.find({
        registerId: In([...keys]),
      });
      return keys.map((key) => !!registrations.find((r) => r.registerId === key));
    },
    {
      cacheMap: lruCacheMap(
        new LRUCache({ maxAge: ms(this.config.CACHE_TIMEOUT), max: MAX_REGISTER_ID_CACHE_SIZE })
      ),
    }
  );

  registerDevice = flow(
    this.accountService.requireLogin<{ deviceType: string; registerId: string }>(),
    taskEither.chain(({ msisdn, deviceType, registerId }) => async () => {
      const registered = await this.registrationLoader.load(registerId);
      if (!registered) {
        const registration = new DeviceRegistration();
        registration.msisdn = msisdn;
        registration.deviceType = deviceType;
        registration.registerId = registerId;
        await this.deviceRegistrationRepository.save(registration);
        this.registrationLoader.clear(registerId);
        this.registrationLoader.prime(registerId, true);
      }
      return either.right('');
    })
  );
}
