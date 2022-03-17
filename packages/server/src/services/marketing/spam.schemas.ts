import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

import { ConnectionArgs, ConnectionType, EdgeType, Payload } from '../../api';
import { Spam } from './models/spam.entity';

@ObjectType()
export class SpamEdge extends EdgeType(Spam) {}

@ObjectType()
export class SpamConnection extends ConnectionType(Spam, SpamEdge) {
  @Field()
  totalCount: number;
}

@ArgsType()
export class SpamConnectionArgs extends ConnectionArgs {
  // @Field(type => SpamWhereInput, { nullable: true })
  // where?: SpamWhereInput;
  // @Field(type => SpamOrderByInput, { nullable: true })
  // orderBy?: SpamOrderByInput;
}

@ObjectType({ implements: Payload })
export class SpamPayload extends Payload<Spam> {
  @Field(() => Spam, { nullable: true })
  result: Spam | null;
}
