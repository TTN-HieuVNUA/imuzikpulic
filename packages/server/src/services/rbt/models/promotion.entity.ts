import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('promotion_type', ['promotionType'], {})
@Index('start_time', ['startTime'], {})
@Index('end_time', ['endTime'], {})
@Index('status', ['status'], {})
@Entity('promotion', { schema: 'imuzikp3' })
export class Promotion {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('tinyint', { name: 'promotion_type', width: 1 })
  promotionType: number;

  @Column('int', { name: 'promotion_fee', nullable: true, default: () => "'0'" })
  promotionFee: number | null;

  @Column('datetime', { name: 'start_time' })
  startTime: Date;

  @Column('datetime', { name: 'end_time' })
  endTime: Date;

  @Column('tinyint', { name: 'status', width: 1 })
  status: number;

  @Column('varchar', { name: 'app_id', nullable: true, length: 100 })
  appId: string | null;

  @Column('varchar', { name: 'package_ids', nullable: true, length: 255 })
  packageIds: string | null;

  get packageIdList() {
    return this.packageIds ? this.packageIds.split(',') : [];
  }

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('int', { name: 'promote_days', nullable: true, default: () => "'0'" })
  promoteDays: number | null;

  @Column('varchar', { name: 'sms_content', nullable: true, length: 500 })
  smsContent: string | null;
}
