import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('promotion_type', ['promotionType'], {})
@Index('start_time', ['packageId'], {})
@Entity('promotion_log', { schema: 'imuzikp3' })
export class PromotionLog {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id?: string;

  @Column('varchar', { name: 'msisdn', length: 20 })
  msisdn: string;

  @Column('tinyint', { name: 'promotion_type', width: 1 })
  promotionType: number;

  @Column('int', { name: 'promotion_id', default: () => "'0'" })
  promotionId: string;

  @Column('bigint', { name: 'package_id', nullable: true })
  packageId?: string | null;

  @Column('varchar', { name: 'app_id', nullable: true, length: 100 })
  appId?: string | null;

  @Column('varchar', { name: 'tone_code', nullable: true, length: 20 })
  toneCode?: string | null;

  @Column('datetime', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date | null;

  @Column('varchar', { name: 'error_code', nullable: true, length: 20 })
  errorCode: string | null;
}
