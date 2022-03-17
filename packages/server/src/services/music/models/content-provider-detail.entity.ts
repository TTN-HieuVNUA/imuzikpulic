import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import { Column, Entity, Index } from 'typeorm';

import { Node } from '../../../api/nodes';

@Index('vt_cp_detail_id_idx', ['id'])
@Index('cp_code_idx', ['cp_code'], {})
@Index('cp_group_idx', ['cp_group'], {})
@Index('created_by_idx', ['created_by'], {})
@Index('updated_by_idx', ['updated_by'], {})
@Entity('vt_cp_detail', { schema: 'imuzikp3' })
@ObjectType({ implements: Node })
export class ContentProviderDetail implements Node {
  @Column('bigint', { primary: true, name: 'vt_cp_detail_id', default: () => "'0'" })
  id: string;

  static TYPE = 'CPD';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(ContentProviderDetail.TYPE, this.id);
  }

  @Column('bigint', { name: 'cp_group' })
  @Field({ name: 'cp_group' })
  cp_group: string;

  @Column('bigint', { name: 'cp_code'})
  @Field({ name: 'cp_code' })
  cp_code: string;

  @Column('int', { name: 'status'})
  @Field({ name: 'status' })
  status: number;

  @Column('bigint', { name: 'created_by', nullable: true })
  created_by: string | null;

  @Column('bigint', { name: 'updated_by', nullable: true })
  updated_by: string | null;

  @Column('datetime', { name: 'created_at' })
  @Field(() => GraphQLISODateTime)
  created_at: Date;

  @Column('datetime', { name: 'updated_at' })
  @Field(() => GraphQLISODateTime)
  updated_at: Date;
}
