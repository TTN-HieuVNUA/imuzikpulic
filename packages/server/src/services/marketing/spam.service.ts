import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { either, taskEither } from 'fp-ts';
import { flow } from 'fp-ts/lib/function';
import { In, Repository } from 'typeorm';
import { NOTIFICATION_NOT_EXIST, ReturnError } from '../../error-codes';
import { Config } from '../../infra/config';
import { DataLoaderService } from '../../infra/util';
import { LoggingService } from './../../infra/logging/logging.service';
import { AccountService } from './../account/account.service';
import { SpamSeen } from './models/spam-seen.entity';
import { Spam, SPAM_SENT, SPAM_STATUS_ACTIVE } from './models/spam.entity';
import DataLoader = require('dataloader');
import ms = require('ms');

@Injectable()
export class SpamLoaderService extends DataLoaderService<'id', Spam> {
  constructor(
    @InjectRepository(Spam) spamRepository: Repository<Spam>,
    config: Config,
    loggingService: LoggingService
  ) {
    super(
      spamRepository,
      loggingService.getLogger('spam-service'),
      { isSent: SPAM_SENT, status: SPAM_STATUS_ACTIVE },
      ms(config.CACHE_TIMEOUT),
      ['id']
    );
  }
}
@Injectable()
export class SpamService {
  constructor(
    private spamLoaderService: SpamLoaderService,

    private accountService: AccountService,
    @InjectRepository(Spam) private spamRepository: Repository<Spam>,
    @InjectRepository(SpamSeen) private spamSeenRepository: Repository<SpamSeen>
  ) {}

  private seenLoaders: { [key: string]: DataLoader<string, boolean> } = {};
  seenLoader(msisdn: string): DataLoader<string, boolean> | undefined {
    if (!this.seenLoaders[msisdn]) {
      this.seenLoaders[msisdn] = new DataLoader(async (keys: readonly string[]) => {
        const views = await this.spamSeenRepository.find({
          msisdn,
          spamId: In([...keys]),
        });
        return keys.map((key) => !!views.find((seen) => seen.spamId === key));
      });
    }
    return this.seenLoaders[msisdn];
  }

  markSpamAsSeen = flow(
    this.accountService.requireLogin<{ spamId: string; seen: boolean }>(),
    taskEither.chain((ctx) => async () => {
      const spam = await this.spamLoaderService.loadBy('id', ctx.spamId);
      return spam
        ? either.right({ ...ctx, spam })
        : either.left(new ReturnError(NOTIFICATION_NOT_EXIST));
    }),
    taskEither.chain(({ spam, msisdn, spamId, seen }) => async () => {
      const alreadySeen = await this.seenLoader(msisdn)?.load(spamId);
      if (seen !== alreadySeen) {
        if (seen) {
          const spamSeen = new SpamSeen();
          spamSeen.msisdn = msisdn;
          spamSeen.spamId = spamId;
          await this.spamSeenRepository.save(spamSeen);
        } else {
          await this.spamSeenRepository.delete({ msisdn, spamId });
        }
        this.seenLoader(msisdn)?.clear(spamId);
        this.seenLoader(msisdn)?.prime(spamId, seen);
      }
      return either.right(spam);
    })
  );

  recordSpamClick = ({ spamId }: { spamId: string }) => async () => {
    await this.spamRepository.update({ spamId }, { number: () => 'number + 1' });
    return either.right(null);
  };
}
