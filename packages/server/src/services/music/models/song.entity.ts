import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Node } from '../../../api/nodes';

export const SONG_STATUS = {
  ACTIVE: 3,
};
//TODO: update vt_song set download_number = (select sum(huawei_order_times) from vt_ring_back_tone where vt_song_id = vt_song.id);
@Index('vt_song_sluggable_idx', ['slug', 'name'], { unique: true })
@Index('created_by_idx', ['createdBy'], {})
@Index('updated_by_idx', ['updatedBy'], {})
@Index('abcd_idx', ['status'], {})
@Index('updated_at', ['updatedAt'], {})
@Entity('vt_song')
@ObjectType({ implements: Node })
export class Song implements Node {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  static TYPE = 'SONG';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(Song.TYPE, this.id);
  }

  @Column('varchar', { name: 'name', length: 255 })
  @Field()
  name: string;

  @Column('bigint', { name: 'ims_id', nullable: true })
  imsId: string | null;

  @Column('varchar', { name: 'ims_name', nullable: true, length: 255 })
  imsName: string | null;

  @Column('varchar', { name: 'file_path', length: 255 })
  filePath: string;

  fileUrl: string;

  @Column('tinyint', { name: 'status', default: () => "'1'" })
  status: number;

  @Column('tinyint', { name: 'type', default: () => "'0'" })
  type: number;

  @Column('tinyint', { name: 'attr', default: () => "'0'" })
  attr: number;

  @Column('bigint', {
    name: 'view_number',
    nullable: true,
    default: () => "'0'",
  })
  viewNumber: string | null;

  @Field(() => Number, { nullable: true })
  @Column('bigint', {
    name: 'download_number',
    nullable: true,
    default: () => "'0'",
  })
  downloadNumber: number | null;

  @Column('varchar', { name: 'caption', nullable: true, length: 255 })
  caption: string | null;

  @Column('text', { name: 'lyric', nullable: true })
  lyric: string | null;

  @Column('bigint', { name: 'lyric_id', nullable: true })
  lyricId: string | null;

  @Column('varchar', { name: 'lyric_username', nullable: true, length: 255 })
  lyricUsername: string | null;

  @Column('tinyint', { name: 'is_lyric_full', width: 1, default: () => "'0'" })
  isLyricFull: boolean;

  @Column('text', { name: 'rbt_tone_ids', nullable: true })
  rbtToneIds: string | null;

  @Column('text', { name: 'ringtone_ids', nullable: true })
  ringtoneIds: string | null;

  @Column('text', { name: 'mp_ids', nullable: true })
  mpIds: string | null;

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

  @Column('varchar', { name: 'slug', nullable: true, length: 255 })
  @Field(() => String, { nullable: true })
  slug: string | null;

  @Column('varchar', { name: 'image_path', nullable: true, length: 255 })
  imagePath: string | null;

  @Column('bigint', { name: 'film_id', nullable: true, unsigned: true })
  filmId: string | null;

  @Column('text', { name: 'singer_list', nullable: true })
  singerList: string | null;

  @Column('tinyint', {
    name: 'is_keeng',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isKeeng: boolean | null;

  @Column('varchar', { name: 'keeng_file_path', nullable: true, length: 255 })
  keengFilePath: string | null;
}
