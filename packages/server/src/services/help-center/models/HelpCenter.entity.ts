import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('help_center_category_id_idx', ['helpCenterCategoryId'], {})
@Index('created_by_idx', ['createdBy'], {})
@Index('updated_by_idx', ['updatedBy'], {})
@Entity('vt_help_center', { schema: 'imuzikp3' })
export class HelpCenter {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('tinyint', { name: 'is_active', width: 1, default: () => "'0'" })
  isActive: boolean;

  @Column('bigint', { name: 'help_center_category_id', nullable: true })
  helpCenterCategoryId: string | null;

  @Column('bigint', { name: 'order_number', default: () => "'1'" })
  orderNumber: string;

  @Column('bigint', { name: 'created_by', nullable: true })
  createdBy: string | null;

  @Column('bigint', { name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

}
