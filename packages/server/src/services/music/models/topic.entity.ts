import { Field, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Node } from '../../../api/nodes';

export const TOPIC_ACTIVE = 1;

@Index('updated_at', ['updatedAt'], {})
@Entity('topic', { schema: 'imuzikp3' })
@ObjectType({ implements: Node })
export class Topic implements Node {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  static TYPE = 'TOPIC';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(Topic.TYPE, this.id);
  }

  @Column('varchar', { name: 'name', length: 255 })
  @Field()
  name: string;

  @Column('varchar', { name: 'slug', nullable: true, length: 255 })
  @Field({ nullable: true })
  slug: string;

  @Column('int', { name: 'is_active', nullable: true, default: () => "'0'" })
  isActive?: number;

  @Column('varchar', { name: 'image_path', nullable: true, length: 255 })
  imagePath?: string;

  @Column('varchar', { name: 'image_path_new', nullable: true, length: 255 })
  imagePathNew?: string;

  @Column('bigint', { name: 'priority', nullable: true, default: () => "'1'" })
  priority?: string;

  @Column('bigint', { name: 'listen_number', nullable: true })
  listenNumber?: string;

  @Column('bigint', { name: 'like_number', nullable: true })
  likeNumber?: string;

  @Column('timestamp', {
    name: 'created_at',
    default: () => "'0000-00-00 00:00:00'",
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column('tinyint', {
    name: 'is_hot',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isHot?: boolean;

  @Field({ nullable: true })
  description?: string;
}
