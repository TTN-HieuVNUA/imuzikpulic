import { Module } from '@nestjs/common';
import { GqlModuleAsyncOptions, GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import depthLimit = require('graphql-depth-limit');
import { RedisModule } from 'nestjs-redis';
import { join } from 'path';

import { ApiModule } from './api';
import { CachingModule } from './cache';
import { LoggingModule, TelecomModule, UtilModule } from './infra';
import { Config } from './infra/config';
import { LoggingService } from './infra/logging';
import { PhoneNumberService } from './infra/telecom';
import {
  AccountModule,
  HelpCenterModule,
  MarketingModule,
  MusicModule,
  NotificationModule,
  RbtModule,
  SearchModule,
  SocialModule,
  ArticleModule,
} from './services';
import { AccountService } from './services/account';
import { RbtCreationModule } from './services/rbt-creation/rbt-creation.module';


const graphqlOptions: GqlModuleAsyncOptions = {
  imports: [AccountModule, TelecomModule],
  inject: [AccountService, PhoneNumberService],
  useFactory: (accountService: AccountService, phoneNumberService: PhoneNumberService) => ({
    // installSubscriptionHandlers: true,
    path: 'api-v2/graphql',
    validationRules: [depthLimit(6)],
    autoSchemaFile: 'schema.gql',
    cors: false,
    playground: false,
    uploads: false,
    context: ({ req, res }: { req: Request; res: Response }) => {
      return {
        ...phoneNumberService.graphqlContext(req),
        ...accountService.graphqlContext(req),
        res,
        channel: req.headers['x_channel'] || 'unknown',
      };
    },
  }),
};

const typeOrmOptions: TypeOrmModuleAsyncOptions[] = [
  {
    inject: [Config, LoggingService],
    useFactory: (config: Config, loggingService: LoggingService) => ({
      type: 'mysql',
      host: config.MYSQL_HOST,
      port: config.MYSQL_PORT,
      username: config.MYSQL_USERNAME,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DATABASE,
      synchronize: process.env.NODE_ENV === 'test',
      // synchronize: true,
      // autoLoadEntities: true,
      entities: [
        __dirname + '/**/account/**/*.entity{.ts,.js}',
        __dirname + '/**/marketing/**/*.entity{.ts,.js}',
        __dirname + '/**/article/**/*.entity{.ts,.js}',
        __dirname + '/**/config/**/*.entity{.ts,.js}',
        __dirname + '/**/help-center/**/*.entity{.ts,.js}',
        __dirname + '/**/music/**/*.entity{.ts,.js}',
        __dirname + '/**/notification/**/*.entity{.ts,.js}',
        __dirname + '/**/rbt/models/*.entity{.ts,.js}',
        __dirname + '/**/telecom/**/crbt-reward.entity{.ts,.js}',
        __dirname + '/**/rbt-creation/models/*.entity{.ts,.js}',
      ],
      logging: ['query', 'error', 'info', 'log'],
      logger: loggingService.getDbLogger('main-db'),
    }),
  },
  {
    name: 'log_db',
    inject: [Config, LoggingService],
    useFactory: (config: Config, loggingService: LoggingService) => ({
      type: 'mysql',
      host: config.MYSQL_LOGDB_HOST,
      port: config.MYSQL_LOGDB_PORT,
      username: config.MYSQL_LOGDB_USERNAME,
      password: config.MYSQL_LOGDB_PASSWORD,
      database: config.MYSQL_LOGDB_DATABASE,
      synchronize: process.env.NODE_ENV === 'test',
      // synchronize: true,
      entities: [
        __dirname + '/**/telecom/**/kpi-log.entity{.ts,.js}',
        __dirname + '/**/rbt/**/log-ring-back-tone.entity{.ts,.js}',
        __dirname + '/**/rbt/**/log-rbt-service.entity{.ts,.js}',
      ],
      logging: ['query', 'error', 'info', 'log'],
      logger: loggingService.getDbLogger('log-db'),
    }),
  },
  {
    name: 'social_db',
    inject: [Config, LoggingService],
    useFactory: (config: Config, loggingService: LoggingService) => ({
      type: 'mongodb',
      host: config.MONGO_HOST,
      port: config.MONGO_PORT,
      username: config.MONGO_USERNAME,
      password: config.MONGO_PASSWORD,
      database: config.MONGO_DATABASE,
      synchronize: process.env.NODE_ENV === 'test',
      // synchronize: true,
      entities: [__dirname + '/**/social/**/*.entity{.ts,.js}'],
      logging: ['query', 'error', 'info', 'log'],
      logger: loggingService.getDbLogger('social-db'),
    }),
  },
];

@Module({
  imports: [
    AccountModule,
    MarketingModule,
    GraphQLModule.forRootAsync(graphqlOptions),
    ...typeOrmOptions.map((options) => TypeOrmModule.forRootAsync(options)),
    MusicModule,
    UtilModule,
    HelpCenterModule,
    TelecomModule,
    RbtModule,
    NotificationModule,
    CachingModule,
    LoggingModule,
    ApiModule,
    SocialModule,
    SearchModule,
    ArticleModule,
    RbtCreationModule,
    RedisModule.forRootAsync({
      inject: [Config],
      useFactory: (config: Config) => config.REDIS,
    }),
    ServeStaticModule.forRootAsync({
      inject: [Config],
      useFactory: async (config: Config) => {
        console.log(join(__dirname, '..', config.UPLOAD_PATH));
        return [
          {
            rootPath: join(__dirname, '..', config.UPLOAD_PATH),
            serveRoot: '/' + config.UPLOAD_PATH,
          },
        ];
      },
    }),
  ],
})
export class AppModule {}
