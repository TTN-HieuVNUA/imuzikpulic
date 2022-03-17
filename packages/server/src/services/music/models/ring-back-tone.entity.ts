import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Node, toGlobalId } from '../../../api/nodes';

@Index('huawei_tone_id', ['huaweiToneId'], { unique: true })
@Index('huawei_tone_code', ['huaweiToneCode'], { unique: true })
@Index('huawei_tone_id_idx', ['huaweiToneId'], {})
@Index('vtrbt_created_at_idx', ['createdAt'], {})
@Index('vtrbt_huawei_order_times_idx', ['huaweiOrderTimes'], {})
@Index('vt_link', ['vtLink'], {})
@Index('vt_song_id_idx', ['vtSongId'], {})
@Index('idx_updated_at', ['updatedAt'], {})
@Index('idx_order_updated_at', ['vtStatus', 'huaweiStatus', 'updatedAt'], {})
@Index('idx_order_huawei', ['vtStatus', 'huaweiStatus', 'huaweiOrderTimes'], {})
@Index('huawei_price', ['huaweiPrice'], {})
@Index('vt_status', ['vtStatus'], {})
@Index('huawei_status', ['huaweiStatus'], {})
@Index('huawei_lastsync', ['huaweiLastsync'], {})
@Index('idx_order_huawei_sync', ['vtStatus', 'huaweiStatus', 'huaweiLastsync'], {})
@Entity('vt_ring_back_tone', { schema: 'imuzikp3' })
@ObjectType({ implements: Node })
export class RingBackTone {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  static TYPE = 'RBT';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(RingBackTone.TYPE, this.huaweiToneCode);
  }

  @Column('varchar', { name: 'huawei_tone_name', length: 255 })
  @Field({ name: 'name' })
  huaweiToneName: string;

  @Column('bigint', { name: 'huawei_cp_id' })
  huaweiCpId: string;

  @Column('bigint', { name: 'huawei_price' })
  @Field(() => Number, { name: 'price' })
  huaweiPrice: string;

  @Column('bigint', { name: 'huawei_tone_id', unique: true })
  huaweiToneId: string;

  @Field({ name: 'toneCode' })
  @Column('varchar', { name: 'huawei_tone_code', unique: true, length: 255 })
  huaweiToneCode: string;

  @Column('varchar', { name: 'huawei_tone_address', nullable: true, length: 255 })
  huaweiToneAddress: string | null;

  @Column('datetime', { name: 'huawei_available_datetime', nullable: true })
  @Field(() => Date, { name: 'availableAt', nullable: true })
  huaweiAvailableDatetime: Date | null;

  @Column('bigint', { name: 'huawei_order_times' })
  @Field(() => Number, { name: 'orderTimes' })
  huaweiOrderTimes: string;

  @Column('varchar', { name: 'huawei_singer_name', length: 255 })
  @Field({ name: 'singerName' })
  huaweiSingerName: string;

  @Column('tinyint', { name: 'huawei_status' })
  huaweiStatus: number;

  @Column('tinyint', { name: 'vt_status', default: () => "'1'" })
  vtStatus: number;

  @Column('bigint', { name: 'vt_order_time', nullable: true, default: () => "'0'" })
  vtOrderTime: string | null;

  @Column('bigint', { name: 'vt_present_time', nullable: true, default: () => "'0'" })
  vtPresentTime: string | null;

  @Column('tinyint', { name: 'vt_is_downloaded', width: 1, default: () => "'0'" })
  vtIsDownloaded: boolean;

  @Column('tinyint', { name: 'vt_is_converted', width: 1, default: () => "'0'" })
  vtIsConverted: boolean;

  @Column('varchar', { name: 'vt_link', nullable: true, length: 255 })
  vtLink: string | null;

  @Column('bigint', { name: 'vt_song_id', nullable: true, default: () => "'0'" })
  vtSongId: string | null;

  @Column('datetime', { name: 'created_at' })
  @Field()
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  @Field()
  updatedAt: Date;

  @Column('datetime', { name: 'huawei_lastsync', nullable: true })
  huaweiLastsync: Date | null;

  @Column('int', { name: 'vt_attr', nullable: true, default: () => "'0'" })
  vtAttr: number | null;

  @Column('int', { name: 'listen_number', nullable: true, default: () => "'0'" })
  listenNumber: number | null;

  @Column('int', { name: 'like_number', nullable: true, default: () => "'0'" })
  likeNumber: number | null;
}
