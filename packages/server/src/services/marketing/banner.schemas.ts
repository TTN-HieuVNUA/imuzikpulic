import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

import { ConnectionArgs, ConnectionType, EdgeType, Payload } from '../../api';
import { BannerItem } from './models/banner-item.entity';

@ObjectType()
export class BannerItemEdge extends EdgeType(BannerItem) {}

@ObjectType()
export class BannerItemConnection extends ConnectionType(BannerItem, BannerItemEdge) {
  @Field()
  totalCount: number;
}

@ArgsType()
export class BannerItemConnectionArgs extends ConnectionArgs {
  // @Field(type => BannerItemWhereInput, { nullable: true })
  // where?: BannerItemWhereInput;
  // @Field(type => BannerItemOrderByInput, { nullable: true })
  // orderBy?: BannerItemOrderByInput;
}

@ObjectType({ implements: Payload })
export class BannerItemPayload extends Payload<BannerItem> {
  @Field(() => BannerItem, { nullable: true })
  result: BannerItem | null;
}
