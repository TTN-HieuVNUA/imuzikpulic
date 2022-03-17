import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('FK_vt_banner_item', ['bannerId'], {})
@Entity('vt_banner_item', { schema: 'imuzikp3' })
@ObjectType()
export class BannerItem {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Field(() => ID)
  id: string;

  @Column('int', { name: 'banner_id', nullable: true })
  bannerId: number | null;
  @Column('tinyint', { name: 'is_active', nullable: true, width: 1 })
  isActive: number | null;

  @Column('tinyint', { name: 'is_flash', nullable: true, width: 1 })
  isFlash: boolean | null;

  @Column('timestamp', { name: 'published_time', nullable: true })
  @Field(() => Date, { nullable: true })
  publishedTime: Date | null;

  @Column('timestamp', { name: 'end_time', nullable: true })
  endTime: Date | null;

  @Column('varchar', { name: 'file_path', nullable: true, length: 255 })
  filePath: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('varchar', { name: 'wap_link', nullable: true, length: 255 })
  @Field(() => String, { nullable: true })
  wapLink: string | null;

  @Column('int', { name: 'target_type', nullable: true })
  targetType: number | null;

  @Column('int', { name: 'target_id', nullable: true })
  targetId: number | null;

  @Column('int', { name: 'view', nullable: true, default: () => "'0'" })
  view: number | null;

  @Column('int', { name: 'click', nullable: true, default: () => "'0'" })
  click: number | null;

  @Column('int', { name: 'vtt_click', nullable: true, default: () => "'0'" })
  vttClick: number | null;

  @Column('int', { name: 'vtt_view', nullable: true, default: () => "'0'" })
  vttView: number | null;

  @Column('varchar', { name: 'item_type', nullable: true, length: 255 })
  @Field(() => String, { name: 'itemType', nullable: true })
  itemType: string | null;

  @Column('varchar', { name: 'item_id', nullable: true, length: 1000 })
  @Field(() => String, { name: 'itemId', nullable: true })
  itemId: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  @Field(() => String, { nullable: true })
  name: string | null;


  @Column('varchar', { name: 'alter_text', nullable: true, length: 255 })
  @Field(() => String, { nullable: true })
  alterText: string | null;
}
