import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Node, toGlobalId } from '../../../api/nodes';

export enum RbtCreationType {
  available = 1,
  unavailable,
  FREEDOM,
}

@Index('tone_name', ['tone_name'], {})
@Index('tone_id', ['tone_id'], { unique: true })
@Index('tone_code', ['tone_code'], { unique: true })
@Index('tone_status', ['tone_status'], {})
@Index('composer', ['composer'], {})
@Entity('vt_ring_back_tone_creation', { schema: 'imuzikp3' })
@ObjectType({ implements: Node })
export class RingBackToneCreation {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  @Field(() => ID)
  id: string;

  static TYPE = 'RBTC';
  //server imuzik

  @Column('tinyint', { name: 'type_creation', nullable: false, default: () => "'0'" })
  @Field({ name: 'type_creation', nullable: true })
  type_creation: number;

  @Column('bigint', { name: 'song_id', nullable: true, default: () => "'0'" })
  @Field(() => Number)
  song_id: string | null;

  @Column('varchar', { name: 'tone_name', nullable: true, length: 255 })
  @Field({ name: 'tone_name', nullable: true })
  tone_name: string;

  @Column('varchar', { name: 'tone_name_generation', nullable: true, length: 255 })
  @Field({ name: 'tone_name_generation', nullable: true })
  tone_name_generation: string;

  @Column('varchar', { name: 'singer_name', nullable: true, length: 255 })
  @Field(() => String)
  singer_name: string | null;

  @Column('varchar', { name: 'composer', nullable: true, length: 255 })
  @Field(() => String, { name: 'composer', nullable: true })
  composer: string | null;

  @Column('varchar', { name: 'slug', nullable: true, length: 255 })
  @Field(() => String)
  slug: string;

  @Column('bigint', { name: 'cp_id', nullable: true })
  @Field(() => Number)
  cp_id: string | null;

  @Column('varchar', { name: 'msisdn', nullable: true, length: 255 })
  @Field(() => String)
  msisdn: string | null;

  @Column('bigint', { name: 'member_id', nullable: false })
  @Field({ name: 'member_id', nullable: false })
  member_id: string;

  @Column('int', { name: 'duration', nullable: true, default: () => "'30'" })
  @Field({ name: 'duration' })
  duration: number;

  @Column('bigint', { name: 'tone_price', nullable: true })
  @Field(() => Number, { name: 'tone_price', nullable: true })
  tone_price: string | null;

  @Column('varchar', { name: 'tone_code', nullable: true, unique: true, length: 255 })
  @Field(() => String, { name: 'tone_code', nullable: true })
  tone_code: string | null;

  @Column('bigint', { name: 'tone_id', nullable: true })
  @Field(() => Number, { name: 'tone_id', nullable: true })
  tone_id: string | null;

  @Column('datetime', { name: 'available_datetime', nullable: true })
  @Field({ nullable: true })
  available_datetime: Date;

  @Column('tinyint', { name: 'tone_status', nullable: true })
  @Field(() => Number)
  tone_status: number;

  @Column('varchar', { name: 'local_file', nullable: true, length: 255 })
  @Field({ name: 'local_file', nullable: true })
  local_file: string;

  @Column('varchar', { name: 'ftp_file', nullable: true, length: 255 })
  @Field(() => String, { name: 'ftp_file', nullable: true })
  ftp_file: string | null;

  @Column('tinyint', { name: 'is_synchronize', nullable: true })
  is_synchronize: number;

  @Column('datetime', { name: 'updated_at', nullable: false })
  @Field({ name: 'updated_at', nullable: false })
  updated_at: Date;

  @Column('datetime', { name: 'created_at', nullable: false })
  @Field({ name: 'created_at', nullable: false })
  created_at: Date;
}
