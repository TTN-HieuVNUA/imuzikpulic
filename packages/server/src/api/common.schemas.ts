import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Payload<ResultT> {
  @Field()
  success: boolean;
  @Field({ nullable: true })
  errorCode?: string;
  @Field({ nullable: true })
  message?: string;
  result: ResultT | null;
}

@ObjectType({ implements: Payload })
export class StringPayload extends Payload<string> {
  @Field(() => String, { nullable: true })
  result: string | null;
}
