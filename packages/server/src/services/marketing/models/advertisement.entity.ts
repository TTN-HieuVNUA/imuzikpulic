import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('advertisment', { schema: 'imuzikp3' })
@ObjectType()
export class Advertisement {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  @Field(() => ID)
  id: string;

  @Column('varchar', { name: 'name', length: 255 })
  @Field()
  name: string;

  @Column('varchar', { name: 'channel', nullable: true, length: 15, default: () => "'all'" })
  channel: string | null;

  @Column('varchar', { name: 'position', length: 255 })
  position: string;

  @Column('int', { name: 'show_times', nullable: true, default: () => "'1'" })
  showTimes: number | null;

  @Column('varchar', { name: 'link', nullable: true, length: 1000 })
  @Field(() => String, { nullable: true })
  link: string | null;

  @Column('int', { name: 'target_type', nullable: true, default: () => "'0'" })
  targetType: number | null;

  @Column('varchar', { name: 'content', nullable: true, length: 1000 })
  @Field(() => String, { nullable: true })
  content: string | null;

  @Column('varchar', { name: 'image_path', nullable: true, length: 1000 })
  imagePath: string | null;

  @Column('datetime', { name: 'start_time', nullable: true })
  startTime: Date | null;

  @Column('datetime', { name: 'end_time', nullable: true })
  endTime: Date | null;

  @Column('varchar', { name: 'item_type', nullable: true, length: 255 })
  @Field(() => String, { name: 'type', nullable: true })
  itemType: string | null;

  @Column('varchar', { name: 'item_id', nullable: true, length: 1000 })
  itemId: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  @Field(() => Date, { nullable: true })
  createdAt: Date | null;

  @Column('int', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;

  @Column('int', { name: 'updated_by', nullable: true })
  updatedBy: number | null;
}
