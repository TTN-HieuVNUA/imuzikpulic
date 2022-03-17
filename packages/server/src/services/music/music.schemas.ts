import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { Payload } from '../../api/common.schemas';
import { Node, toGlobalId } from '../../api/nodes';
import {
  ConnectionArgs,
  ConnectionType,
  EdgeType,
} from '../../api/paging/connection-paging.schemas';
import { OrderByDirection } from '../../api/paging/order-by-direction';
import { Genre, Singer, Song, Topic } from './models';
import { ContentProvider } from './models/content-provider.entity';

@ObjectType()
export class SongEdge extends EdgeType(Song) {}

@ObjectType()
export class SongConnection extends ConnectionType(Song, SongEdge) {
  @Field()
  totalCount: number;
}

@InputType()
export class SongOrderByInput {
  @Field(() => OrderByDirection, { nullable: true })
  updatedAt?: OrderByDirection;

  @Field(() => OrderByDirection, { nullable: true })
  downloadNumber?: OrderByDirection;
}

@ArgsType()
export class SongConnectionArgs extends ConnectionArgs {
  // @Field(type => SongWhereInput, { nullable: true })
  // where?: SongWhereInput;
  @Field(() => SongOrderByInput, { nullable: true })
  orderBy?: SongOrderByInput;
}

@ObjectType()
export class SingerEdge extends EdgeType(Singer) {}

@ObjectType()
export class SingerConnection extends ConnectionType(Singer, SingerEdge) {
  @Field()
  totalCount: number;
}

@ArgsType()
export class SingerConnectionArgs extends ConnectionArgs {
  // @Field(type => SingerWhereInput, { nullable: true })
  // where?: SingerWhereInput;
  // @Field(type => SingerOrderByInput, { nullable: true })
  // orderBy?: SingerOrderByInput;
}

@ObjectType()
export class GenreEdge extends EdgeType(Genre) {}

@ObjectType()
export class GenreConnection extends ConnectionType(Genre, GenreEdge) {
  @Field()
  totalCount: number;
}

@ArgsType()
export class GenreConnectionArgs extends ConnectionArgs {
  // @Field(type => SongWhereInput, { nullable: true })
  // where?: SongWhereInput;
  // @Field(type => SongOrderByInput, { nullable: true })
  // orderBy?: SongOrderByInput;
}

@ObjectType()
export class ContentProviderEdge extends EdgeType(ContentProvider) {}

@ObjectType()
export class ContentProviderConnection extends ConnectionType(
  ContentProvider,
  ContentProviderEdge
) {
  @Field()
  totalCount: number;
}

@ArgsType()
export class ContentProviderConnectionArgs extends ConnectionArgs {
  // @Field(type => SongWhereInput, { nullable: true })
  // where?: SongWhereInput;
  // @Field(type => SongOrderByInput, { nullable: true })
  // orderBy?: SongOrderByInput;
}

@ObjectType()
export class TopicEdge extends EdgeType(Topic) {}

@ObjectType()
export class TopicConnection extends ConnectionType(Topic, TopicEdge) {
  @Field()
  totalCount: number;
}

@ArgsType()
export class TopicConnectionArgs extends ConnectionArgs {
  // @Field(type => SongWhereInput, { nullable: true })
  // where?: SongWhereInput;
  // @Field(type => SongOrderByInput, { nullable: true })
  // orderBy?: SongOrderByInput;
}

@ObjectType({ implements: Node })
export class Chart implements Node {
  id: string;

  static TYPE = 'Chart';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(Chart.TYPE, this.id);
  }
  @Field()
  slug: string;

  @Field()
  name: string;
}

@ObjectType({ implements: Payload })
export class SongPayload extends Payload<Song> {
  @Field(() => Song, { nullable: true })
  result: Song | null;
}
