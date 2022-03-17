/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { configure, getLogger, Logger as FourLogger } from 'log4js';
import { Logger, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/no-empty-function */
class DbLogger implements Logger {
  constructor(private logger: FourLogger) {}
  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.debug(
      `query=${query}` + (parameters ? ` parameters: ${JSON.stringify(parameters)}` : ``)
    );
  }
  /**
   * Logs query that is failed.
   */
  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.error(`query=${query} parameters: ${JSON.stringify(parameters)}`);
  }
  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.warn(`time=${time} query=${query} parameters: ${JSON.stringify(parameters)}`);
  }
  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {}
  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string, queryRunner?: QueryRunner): any {}
  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
    this.logger[level](message);
  }
}

@Injectable()
export class LoggingService {
  constructor() {
    const isTesting = process.env.NODE_ENV === 'test';
    const isDev = process.env.NODE_ENV === 'development';
    if (isTesting || isDev) {
      const level = process.env.DEBUG ? 'debug' : isTesting ? 'off' : 'info';
      configure({
        appenders: { err: { type: 'stdout' } },
        //appenders: { err: { type: 'stderr' } },
        //appenders: { File: { type: 'console' } },
        categories: {
          // default: { appenders: ['console'], level },
          default: { appenders: ['err'], level },
        },
      });
      return;
    }
    configure({
      appenders: {
        everything: { type: 'dateFile', filename: 'logs/full-logs-server.log', pattern: '.yyyy-MM-dd-hh', compress: true }
      },
      categories: {
        default: { appenders: [ 'everything' ], level: 'debug'}
      }
    })
  }
  getLogger = getLogger;
  debugLogger(category: string) {
    const logger = this.getLogger(category);
    return {
      info: logger.debug.bind(logger),
      debug: logger.debug.bind(logger),
      warn: logger.debug.bind(logger),
      error: logger.debug.bind(logger),
    };
  }
  getDbLogger(category: string) {
    return new DbLogger(this.getLogger(category));
  }
}
