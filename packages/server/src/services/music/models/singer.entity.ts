import { Field, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Node } from '../../../api/nodes';

export const SINGER_ACTIVE = 1;

@Index('vt_singer_sluggable_idx', ['slug', 'alias'], { unique: true })
@Index('created_by_idx', ['createdBy'], {})
@Index('updated_by_idx', ['updatedBy'], {})
@Entity('vt_singer', { schema: 'imuzikp3' })
@ObjectType({ implements: Node })
export class Singer {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  static TYPE = 'SINGER';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(Singer.TYPE, this.id);
  }

  @Column('varchar', { name: 'alias', length: 255 })
  @Field()
  alias: string;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  @Field({ nullable: true })
  name?: string;

  @Column('varchar', { name: 'image_path', length: 255 })
  imagePath: string;

  @Column('tinyint', { name: 'is_active', width: 1, default: () => "'0'" })
  isActive: number;

  @Column('varchar', { name: 'birthday', nullable: true, length: 255 })
  birthday?: string;

  @Column('tinyint', { name: 'attr', nullable: true, default: () => "'0'" })
  attr?: number;

  @Column('bigint', { name: 'created_by', nullable: true })
  createdBy?: string;

  @Column('bigint', { name: 'updated_by', nullable: true })
  updatedBy?: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'slug', nullable: true, length: 255 })
  @Field({ nullable: true })
  slug: string;

  @Column('tinyint', {
    name: 'is_keeng',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isKeeng?: boolean;

  @Column('varchar', { name: 'keeng_image_path', nullable: true, length: 255 })
  keengImagePath?: string;

  @Column('varchar', { name: 'big_image_path', nullable: true, length: 255 })
  bigImagePath?: string;

  @Column('int', { name: 'fan_number', default: () => "'0'" })
  fanNumber: number;

  @Column('int', { name: 'service_status' })
  serviceStatus: number;

  @Column('int', { name: 'is_show_big_image', default: () => "'0'" })
  isShowBigImage: number;

  @Column('longtext', { name: 'description', nullable: true })
  @Field({ nullable: true })
  description?: string;
}
