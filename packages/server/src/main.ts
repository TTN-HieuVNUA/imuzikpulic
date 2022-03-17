import { NestFactory } from '@nestjs/core';
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import dotenv = require('dotenv');
import helmet = require('helmet');

import { AppModule } from './app.module';
import { Config } from './infra/config';
import { join } from 'path';
import * as express from 'express';
// import * as bodyparser from 'koa-bodyparser-graphql';
// @ts-ignore
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(cookieParser());
  
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(graphqlUploadExpress({ maxFileSize: 20000000, maxFiles: 10 }));
  app.use('/demoSong', express.static(join(process.cwd(), 'demoSong/')));
  app.use('/rbtCreation', express.static(join(process.cwd(), 'RbtCreation/')));
  const config = app.get(Config);
  await app.listen(config.PORT);
}
bootstrap();
