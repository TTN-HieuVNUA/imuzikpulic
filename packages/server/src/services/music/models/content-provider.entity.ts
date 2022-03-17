import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import { Column, Entity, Index } from 'typeorm';

import { Node } from '../../../api/nodes';

@Index('cp_code', ['code'], { unique: true })
@Index('name', ['name'], { unique: true })
@Index('created_by_idx', ['createdBy'], {})
@Index('updated_by_idx', ['updatedBy'], {})
@Entity('vt_cp', { schema: 'imuzikp3' })
@ObjectType({ implements: Node })
export class ContentProvider implements Node {
  @Column('bigint', { primary: true, name: 'cp_id', default: () => "'0'" })
  id: string;

  static TYPE = 'CP';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(ContentProvider.TYPE, this.id);
  }
  @Column('varchar', { name: 'cp_group',nullable: true , length: 255})
  @Field({ name: 'group',nullable:true })
  group: string;

  @Column('bigint', { name: 'cp_code' })
  @Field({ name: 'code' })
  code: string;

  @Column('varchar', { name: 'name', unique: true, length: 255 })
  @Field()
  name: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  @Field(() => String, { nullable: true })
  description: string | null;

  @Column('bigint', { name: 'created_by', nullable: true })
  createdBy: string | null;

  @Column('bigint', { name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @Column('datetime', { name: 'created_at' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
