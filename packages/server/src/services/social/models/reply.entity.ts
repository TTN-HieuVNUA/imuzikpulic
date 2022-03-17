import { Field, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import { ObjectID } from 'mongodb';
import { Column } from 'typeorm';

export const REPLY_STATUS = {
  VISIBLE: 1,
  HIDDEN: 2,
};

@ObjectType()
export class Reply {
  static TYPE = 'REPLY';
  @Column()
  id: ObjectID;

  @Field(() => ID, { name: 'id' })
  get getId() {
    return toGlobalId(Reply.TYPE, this.id.toHexString());
  }

  @Field(() => String)
  @Column()
  content: string;

  @Column()
  status: number;

  @Column()
  userId: string;

  @Column()
  @Field(() => Date)
  createdAt: Date;

  @Column()
  @Field(() => Date)
  updatedAt: Date;
}
