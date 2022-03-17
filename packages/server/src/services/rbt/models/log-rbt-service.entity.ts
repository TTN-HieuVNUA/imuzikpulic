import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vt_log_rbt_service', { schema: 'imuziklog' })
export class LogRbtServiceEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'member_id', nullable: true })
  memberId: string | null;

  @Column('text', { name: 'username', nullable: true })
  username: string | null;

  @Column('text', { name: 'phonenumber', nullable: true })
  phonenumber: string | null;

  @Column('bigint', { name: 'action', nullable: true })
  action: string | null;

  @Column('text', { name: 'return_code', nullable: true })
  returnCode: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('varchar', { name: 'source', nullable: true, length: 255 })
  source: string | null;

  @Column('int', { name: 'brand_id', nullable: true, default: () => "'0'" })
  brandId: string | null;
}
