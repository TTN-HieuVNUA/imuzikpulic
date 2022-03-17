import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export const ARTICLE_ACTIVE = 3;
@Index('PK_id_idx', ['id'], {})
@Entity('vt_article', { schema: 'imuzikp3' })
@ObjectType()
export class Article {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Field(() => ID)
  id: string;



  @Field(() => String, { nullable: true })
  @Column('varchar', { name: 'slug', nullable: true,length: 255 })
  slug: string | null;

  @Field(() => String, { nullable: true })
  @Column('varchar', { name: 'image_path', nullable: true,length: 255 })
  image_path?: string | null;

  @Column('tinyint', { name: 'status', nullable: false })
  status: number | null;

  @Column('tinyint', { name: 'attr', nullable: false })
  attr: number | null;

  @Column('tinyint', { name: 'type', nullable: false })
  type: number | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp', { name: 'published_time', nullable: true })
  published_time?: Date | null;

  @Column('bigint', { name: 'view_number', nullable: true })
  view_number?: number | null;

  @Column('varchar', { name: 'inner_related_article', nullable: true })
  inner_related_article?: string | null;

  @Column('varchar', { name: 'outer_related_article', nullable: true })
  outer_related_article?: string | null;

  @Column('bigint', { name: 'created_by', nullable: true })
  created_by?: number | null;

  @Column('bigint', { name: 'updated_by', nullable: true })
  updated_by?: number | null;
  
  @Column('timestamp', { name: 'created_at', nullable: false })
  created_at: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: false })
  updated_at: Date | null;

  @Column('varchar', { name: 'idsyn', nullable: true })
  idsyn?: string | null;
  
  @Column('tinyint', { name: 'approve_level', nullable: true })
  approve_level?: number | null;
  
  

}
