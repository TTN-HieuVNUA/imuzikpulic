import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export const SPAM_STATUS_ACTIVE = 2;
export const SPAM_SENT = 4;

@Index('send_time_idx', ['sendTime'], {})
@Index('name_idx', ['name'], {})
@Entity('api_gcm_spam', { schema: 'imuzikp3' })
@ObjectType()
export class Spam {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  spamId: string;

  @Field(() => ID)
  get id() {
    return `${this.spamId}`;
  }

  @Column('varchar', { name: 'name', length: 255 })
  @Field()
  name: string;

  @Column('varchar', { name: 'content', length: 640 })
  @Field()
  content: string;

  @Column('tinyint', { name: 'status', nullable: true, width: 1, default: () => "'0'" })
  status: number | null;

  @Column('int', { name: 'channel' })
  channel: number;

  @Column('tinyint', { name: 'is_sent', nullable: true, width: 1, default: () => "'0'" })
  isSent: number | null;

  @Column('datetime', { name: 'send_time' })
  @Field({ nullable: true })
  sendTime: Date;

  @Column('varchar', { name: 'path', nullable: true, length: 255 })
  path: string | null;

  @Column('int', { name: 'number', nullable: true, default: () => "'0'" })
  number: number | null;

  @Column('bigint', { name: 'current_line', nullable: true })
  currentLine: string | null;

  @Column('varchar', { name: 'rule', nullable: true, length: 1000 })
  rule: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Field(() => Date, { nullable: true })
  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('int', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @Column('int', { name: 'updated_by' })
  updatedBy: number;

  @Field(() => String, { name: 'itemType', nullable: true })
  @Column('varchar', { name: 'item_type', nullable: true, length: 255 })
  itemType: string | null;

  @Field(() => String, { name: 'itemId', nullable: true })
  @Column('varchar', { name: 'item_id', nullable: true, length: 1000 })
  itemId: string | null;
}
