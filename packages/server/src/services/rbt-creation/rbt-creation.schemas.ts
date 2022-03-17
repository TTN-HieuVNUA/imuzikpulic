import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Payload } from '../../api';
import { RingBackToneCreation } from '../music/models/ring-back-tone-creation.entity';
import {
  ConnectionArgs,
  ConnectionType,
  EdgeType,
} from '../../api/paging/connection-paging.schemas';

@ObjectType({ implements: Payload })
export class RbtCreationPayload extends Payload<RingBackToneCreation> {
  @Field(() => RingBackToneCreation, { nullable: true })
  result: RingBackToneCreation | null;
}

@ObjectType()
export class RingBackToneCreationEdge extends EdgeType(RingBackToneCreation) {}

@ObjectType()
export class RingBackToneCreationConnection extends ConnectionType(
  RingBackToneCreation,
  RingBackToneCreationEdge
) {
  @Field()
  totalCount: number;
}
@ArgsType()
export class RingBackToneCreationConnectionArgs extends ConnectionArgs {}
