import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { pipe } from 'fp-ts/lib/pipeable';
import { StringPayload } from '../../api';
import { Node } from '../../api/nodes';
import { LoggingService } from '../../infra/logging';
import { BaseResolver } from './../../api/base.resolver';
import { NodeConnection, NodeConnectionArgs } from './../../api/nodes/models/node.model';
import { ConnectionPagingService } from './../../api/paging/connection-paging.service';
import { MusicService } from './../music/music.service';
import { NodeType } from './search.schemas';
import { SearchService } from './search.service';

@Injectable()
export class SearchResolver extends BaseResolver {
  constructor(
    private searchService: SearchService,
    private musicService: MusicService,
    private connectionPagingService: ConnectionPagingService,
    loggingService: LoggingService
  ) {
    super(loggingService.getLogger('search-resolver'));
  }
  @Query(() => NodeConnection)
  async search(
    @Args('query') query: string,
    @Args('type', { type: () => NodeType, nullable: true }) type: string,
    @Args() connectionArgs: NodeConnectionArgs
  ): Promise<NodeConnection> {
    return this.connectionPagingService.findAndPaginate<Node | null, { totalCount: number }>(
      connectionArgs,
      async (skip, take) => {
        const [hits, total] = await this.searchService.search(query, skip, take, type);
        const nodes = await Promise.all(
          hits.map(async ({ id, type }: { id: number; type: string }) =>
            this.musicService.findEntityById(type, id.toString())
          )
        );
        return [nodes, total];
      },
      { extraFields: ({ count: totalCount }) => ({ totalCount }) }
    );
  }

  @Query(() => [String])
  async hotKeywords(): Promise<string[]> {
    return this.searchService.getHotKeywords();
  }

  @Mutation(() => StringPayload)
  async recordKeyword(@Args('keyword') keyword: string) {
    return pipe(keyword, this.searchService.recordKeyword, this.resolvePayloadTask);
  }
}
