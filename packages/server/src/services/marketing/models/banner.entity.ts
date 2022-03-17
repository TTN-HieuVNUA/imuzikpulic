import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const BANNER_ACTIVE = 1;
@Entity('vt_banner', { schema: 'imuzikp3' })
@ObjectType()
export class Banner {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'width', nullable: true })
  width?: number;

  @Column('int', { name: 'height', nullable: true })
  height?: number;

  @Column('tinyint', { name: 'is_slide', nullable: true, width: 1 })
  isSlide?: boolean;

  @Column('tinyint', { name: 'is_active', nullable: true, width: 1 })
  isActive?: number;

  @Column('int', { name: 'max_items', nullable: true })
  @Field({ nullable: true })
  maxItems?: number;

  @Column('varchar', { name: 'style', nullable: true, length: 255 })
  style?: string;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt?: Date;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt?: Date;
}
