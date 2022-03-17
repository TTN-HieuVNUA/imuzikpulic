import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('created_by_idx', ['createdBy'], {})
@Index('updated_by_idx', ['updatedBy'], {})
@Entity('vt_help_center_category', { schema: 'imuzikp3' })
export class HelpCenterCategory {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('tinyint', { name: 'is_active', width: 1, default: () => "'0'" })
  isActive: boolean;

  @Column('bigint', { name: 'parent_id' })
  parentId: string;

  @Column('bigint', { name: 'created_by', nullable: true })
  createdBy: string | null;

  @Column('bigint', { name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('int', { name: 'order_number', default: () => "'1'" })
  orderNumber: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'slug', nullable: true, length: 255 })
  slug: string | null;
}
