import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import cookieParser = require('cookie-parser');
import { After, AfterAll, Before, BeforeAll } from 'cucumber';
import dotenv = require('dotenv');
import { flatten, map } from 'fp-ts/lib/Array';
import { Logger } from 'log4js';
import { pipe } from 'rxjs';
import * as sinon from 'sinon';
import * as soap from 'soap';
import * as request from 'supertest';
import { Connection, getConnectionManager, getRepository } from 'typeorm';

import { Config } from '../src/infra/config/config';
import { LoggingService } from '../src/infra/logging';
import { RingBackTone } from '../src/services/music/models/ring-back-tone.entity';
import { AppModule } from './../src/app.module';
import { CRBT_PRESENT, RADIUS, USER_MANAGE, USER_TONE_MANAGE } from './constants';

let app: INestApplication;
export interface TestContext {
  app: INestApplication;
  config: Config;
  headers: { [key: string]: string };
  createClientAsync?: sinon.SinonStub;
  req?: request.Test;
  soapCalls: { [key: string]: { client: { [key: string]: sinon.SinonStub }; assert: () => any }[] };
  agent: request.SuperTest<request.Test>;
  logger?: Logger;
  missingClientCount: number;
  download: {
    isFree?: boolean;
    usedPromotion?: boolean;
  };
}

export const getTestContext = (world: any) => world.ctx as TestContext;

Before({ tags: '@ignore' }, async function () {
  return 'skipped';
});
const asserts: (() => any)[] = [];

export const addPostAssert = (a: () => Promise<void> | void) => asserts.push(a);

Before(async function () {
  const ctx: TestContext = {
    app,
    config: app.get(Config),
    agent: request(app.getHttpServer()),
    headers: {},
    soapCalls: {
      [RADIUS]: [],
      [USER_MANAGE]: [],
      [USER_TONE_MANAGE]: [],
      [CRBT_PRESENT]: [],
    },
    logger: app.get(LoggingService).getLogger('test'),
    missingClientCount: 0,
    download: {},
  };
  this.ctx = ctx;
  sinon.replace(soap, 'createClientAsync', (url, ...args) => {
    if (ctx.soapCalls[url]?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { client, assert } = ctx.soapCalls[url].shift()!;
      asserts.push(assert);
      return client;
    } else {
      ctx.logger?.error('Unavailable Client:', url, args);
      ctx.missingClientCount += 1;
      throw new Error('Socket hang up');
    }
  });
});
Before(async function () {
  await Promise.all(
    pipe(
      map((c: Connection) => c.entityMetadatas.map((m) => c.getRepository(m.target).clear())),
      flatten
    )(getConnectionManager().connections)
  );
  const repo = getRepository(RingBackTone);
  const rbt = new RingBackTone();
  rbt.huaweiToneCode = '6547912';
  await repo.save(rbt);
});

export const inspect = <T>(t: T) => {
  console.log(t);
  return t;
};

After(async function () {
  sinon.restore();
  const ctx: TestContext = this.ctx;
  if (ctx?.missingClientCount > 0) {
    throw new Error(`Missing client ${ctx.missingClientCount} times`);
  }
  while (asserts.length > 0) {
    await asserts.shift()?.();
  }
  while (asserts.length > 0) asserts.pop();
  await this.req?.app.close();
});

BeforeAll(async function () {
  dotenv.config({ path: '.env.test' });
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.use(cookieParser());
  await app.init();
});

AfterAll(function () {
  return Promise.all(getConnectionManager().connections.map((c) => c.close()));
});
