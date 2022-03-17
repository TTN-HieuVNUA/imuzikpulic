import { Field, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Node } from '../../../api/nodes';

export const GENRE_ACTIVE = 1;

@Index('vt_music_genre_sluggable_idx', ['slug', 'name'], { unique: true })
@Index('created_by_idx', ['createdBy'], {})
@Index('updated_by_idx', ['updatedBy'], {})
@Entity('vt_music_genre', { schema: 'imuzikp3' })
@ObjectType({ implements: Node })
export class Genre implements Node {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  static TYPE = 'GENRE';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(Genre.TYPE, this.id);
  }

  @Column('varchar', { name: 'name', length: 255 })
  @Field()
  name: string;

  @Column('tinyint', { name: 'is_active', width: 1, default: () => "'0'" })
  isActive: number;

  @Column('bigint', { name: 'parent_id', nullable: true })
  parentId: string | null;

  @Column('bigint', { name: 'created_by', nullable: true })
  createdBy: string | null;

  @Column('bigint', { name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'slug', nullable: true, length: 255 })
  @Field(() => String, { nullable: true })
  slug: string | null;

  @Column('tinyint', { name: 'regions', nullable: true, width: 1 })
  regions: boolean | null;

  @Column('varchar', { name: 'image_path', nullable: true, length: 255 })
  imagePath: string | null;

  @Column('tinyint', {
    name: 'is_hot',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isHot: boolean | null;
}
