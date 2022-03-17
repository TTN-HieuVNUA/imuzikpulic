import { Column, Entity, Index } from 'typeorm';

@Index('vt_help_center_category_translation_sluggable_idx', ['slug', 'name', 'lang'], {
  unique: true,
})
@Index('slug', ['slug'], {})
@Entity('vt_help_center_category_translation', { schema: 'imuzikp3' })
export class HelpCenterCategoryTranslation {
  @Column('bigint', { primary: true, name: 'id', default: () => "'0'" })
  id: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('char', { primary: true, name: 'lang', length: 2 })
  lang: string;

  @Column('varchar', { name: 'slug', nullable: true, length: 255 })
  slug: string | null;
}
