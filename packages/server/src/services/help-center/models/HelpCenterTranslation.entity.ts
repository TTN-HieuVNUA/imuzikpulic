import { Column, Entity } from 'typeorm';

import { HelpCenter } from './HelpCenter.entity';

@Entity('vt_help_center_translation', { schema: 'imuzikp3' })
export class HelpCenterTranslation {
  @Column('bigint', { primary: true, name: 'id', default: () => "'0'" })
  id: string;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('longtext', { name: 'body' })
  body: string;

  @Column('char', { primary: true, name: 'lang', length: 2 })
  lang: string;

  helpCenter?: HelpCenter;
}
