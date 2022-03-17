import { Injectable } from '@nestjs/common';
import * as Relay from 'graphql-relay';

import { Config } from '../../infra/config';
import { ConnectionArgs } from './connection-paging.schemas';

type PagingMeta =
  | { pagingType: 'forward'; after?: string; first: number }
  | { pagingType: 'backward'; before?: string; last: number }
  | { pagingType: 'none' };

function getMeta(args: ConnectionArgs): PagingMeta {
  const { first = 0, last = 0, after, before } = args;
  const isForwardPaging = !!first || !!after;
  const isBackwardPaging = !!last || !!before;

  return isForwardPaging
    ? { pagingType: 'forward', after, first }
    : isBackwardPaging
    ? { pagingType: 'backward', before, last }
    : { pagingType: 'none' };
}

@Injectable()
export class ConnectionPagingService {
  constructor(private config: Config) {}
  /**
   * Create a 'paging parameters' object with 'limit' and 'offset' fields based on the incoming
   * cursor-paging arguments.
   */
  private getPagingParameters(args: ConnectionArgs) {
    const meta = getMeta(args);

    switch (meta.pagingType) {
      case 'forward': {
        return {
          limit: meta.first,
          offset: meta.after ? Relay.cursorToOffset(meta.after) + 1 : 0,
        };
      }
      case 'backward': {
        const { last, before } = meta;
        let limit = last;
        let offset = before ? Relay.cursorToOffset(before) - last : 0;

        // Check to see if our before-page is underflowing past the 0th item
        if (offset < 0) {
          // Adjust the limit with the underflow value
          limit = Math.max(last + offset, 0);
          offset = 0;
        }

        return { offset, limit };
      }
      default:
        return {};
    }
  }

  quantize(num: number, bucket = 5) {
    return Math.ceil(num / bucket) * bucket;
  }
  async findAndPaginate<T, E>(
    connArgs: ConnectionArgs,
    findAndCount: (skip: number, take: number) => Promise<[T[], number]>,
    options: {
      extraFields: (args: { entities: T[]; count: number }) => E;
    }
  ) {
    const { limit, offset } = this.getPagingParameters(connArgs);
    const skip = Math.min(this.config.LIST_LIMIT, offset || 0);
    const take = Math.min(
      this.quantize(limit || 10),
      this.config.TAKE_LIMIT,
      this.config.LIST_LIMIT - skip
    );
    const [entities, count] = await findAndCount(skip, take || 1);

    const res = Relay.connectionFromArraySlice(entities, connArgs, {
      arrayLength: Math.min(count, this.config.LIST_LIMIT),
      sliceStart: skip || 0,
    });
    return {
      ...res,
      ...options.extraFields({ entities, count }),
    };
  }
}
