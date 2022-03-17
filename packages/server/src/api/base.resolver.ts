import { either } from 'fp-ts';
import { fold, TaskEither } from 'fp-ts/lib/TaskEither';
import { Logger } from 'log4js';

import { ReturnError, SUCCESS_MESSAGE, SYSTEM_ERROR } from '../error-codes';
import { Payload } from './common.schemas';

export const requireCondition = <T>(
  condition: (args: T) => boolean,
  code: string,
  message?: string
) => <K extends T>(args: K) => async () => {
  return condition(args) ? either.right(args) : either.left(new ReturnError(code, message));
};

export class BaseResolver {
  constructor(protected logger: Logger) {}
  async try<T>(func: () => Promise<T>): Promise<Payload<T>> {
    try {
      return {
        success: true,
        result: await func(),
      };
    } catch (e) {
      const error: ReturnError = e.errorCode ? e : new ReturnError(SYSTEM_ERROR);
      if (!e.errorCode) {
        this.logger.error(e.message);
      }
      return {
        success: false,
        errorCode: error.errorCode,
        message: e.message,
        result: null,
      };
    }
  }
  resolveNullableTask = async <T>(task: TaskEither<ReturnError, T>): Promise<T | null> => {
    try {
      return await fold<ReturnError, T, T | null>(
        (e: any) => async () => {
          this.logger.debug(e.message);
          return null;
        },
        (a) => async () => a
      )(task)();
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  };
  resolvePayloadTask = async <T>(task: TaskEither<ReturnError, T>): Promise<Payload<T>> => {
    //error server (when upload) here
    try {
      return await fold(
        (error: ReturnError) => async () => {
          this.logger.debug(error.message);
          return {
            success: false,
            errorCode: error.errorCode,
            message: error.message,
            result: error.result,
          } as Payload<T>;
        },
        (a: T) => async () => ({
          success: true,
          message: SUCCESS_MESSAGE,
          result: a,
        })
      )(task)();
    } catch (e) {
      this.logger.error(e);
      const error: ReturnError = new ReturnError(SYSTEM_ERROR);
      // const error: ReturnError = new ReturnError(SYSTEM_ERROR);
      return {
        success: false,
        errorCode: error.errorCode,
        message: error.message,
        result: null,
      };
    }
  };
}
