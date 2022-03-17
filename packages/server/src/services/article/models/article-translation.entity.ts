import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('vt_article_translation_sluggable_idx', ['slug'], {})
@Entity('vt_article_translation', { schema: 'imuzikp3' })
@ObjectType()
export class ArticleTranslation {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  @Field(() => ID)
  id: string;

  @Column('varchar', { name: 'title', nullable: true })
  @Field(() => String, { nullable: true })
  title?: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { name: 'description', nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  @Column('longtext', { name: 'body', nullable: true })
  body?: string | null;

  @Field(() => String, { nullable: true })
  @Column('char', { name: 'lang', nullable: true,length: 2 })
  lang: string | null;

  @Field(() => String, { nullable: true })
  @Column('varchar', { name: 'slug', nullable: true,length: 255 })
  slug: string | null;

  @Column('bigint', { name: 'song_id', nullable: true })
  song_id?: string | null;
 


  
}
