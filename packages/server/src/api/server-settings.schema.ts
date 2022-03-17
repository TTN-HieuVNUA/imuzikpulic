import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServerSettings {
  @Field()
  serviceNumber: string;
  @Field()
  isForceUpdate: boolean;
  @Field()
  clientAutoPlay: boolean;
  @Field()
  msisdnRegex: string;
  @Field()
  facebookUrl: string;
  @Field()
  contactEmail: string;
  @Field()
  vipBrandId: string;
}
