import { ArgsType, Field, ID, InterfaceType, ObjectType } from '@nestjs/graphql';
import { ConnectionCursor } from 'graphql-relay';

import { ConnectionArgs, PageInfo } from '../../paging/connection-paging.schemas';

export { fromGlobalId, toGlobalId } from 'graphql-relay';
@InterfaceType()
export abstract class Node {
  @Field(() => ID, { name: 'id' })
  relayId: string;
}

@ObjectType()
export class NodeEdge {
  @Field(() => Node, { nullable: true })
  node: Node | null;

  @Field({ description: 'Used in `before` and `after` args' })
  cursor!: ConnectionCursor;
}

@ObjectType()
export class NodeConnection {
  @Field()
  totalCount: number;

  @Field(() => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => [NodeEdge])
  edges!: Array<NodeEdge>;
}

@ArgsType()
export class NodeConnectionArgs extends ConnectionArgs {
  // @Field(type => NodeWhereInput, { nullable: true })
  // where?: NodeWhereInput;
  // @Field(type => NodeOrderByInput, { nullable: true })
  // orderBy?: NodeOrderByInput;
}
