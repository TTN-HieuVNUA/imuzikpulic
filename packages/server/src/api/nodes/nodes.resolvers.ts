import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { fromGlobalId } from 'graphql-relay';

import { MusicService } from '../../services/music';
import { Node } from './models/node.model';

@Resolver()
export class NodesResolvers {
  constructor(private readonly musicService: MusicService) {}

  @Query(() => Node, { nullable: true })
  async node(@Args({ name: 'id', type: () => ID }) id: string): Promise<Node | undefined | null> {
    const resolvedGlobalId = fromGlobalId(id);
    return this.musicService.findEntityById(resolvedGlobalId.type, resolvedGlobalId.id);
  }
}
