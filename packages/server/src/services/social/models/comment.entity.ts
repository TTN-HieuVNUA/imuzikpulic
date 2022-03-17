import { Field, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';

import { Reply, REPLY_STATUS } from './reply.entity';

export const COMMENT_STATUS = {
  VISIBLE: 1,
  HIDDEN: 2,
};

@ObjectType()
@Entity()
@Index('song_recent_idx', ['songId', 'status', 'createdAt'], {})
export class Comment {
  @ObjectIdColumn()
  id: ObjectID;

  static TYPE = 'CMT';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(Comment.TYPE, this.id.toHexString());
  }

  @Column()
  status: number;

  @Field(() => String)
  @Column()
  content: string;

  @Column()
  songId: string;

  @Column()
  userId: string;

  @Column()
  likedBy?: string[];

  @Column(() => Reply)
  replies?: Reply[];

  @Field(() => [Reply], { name: 'replies' })
  get getRelies() {
    return (this.replies ?? []).filter((r) => r.status == REPLY_STATUS.VISIBLE);
  }

  @Column()
  @Field(() => Date)
  createdAt: Date;

  @Column()
  @Field(() => Date)
  updatedAt: Date;
}
