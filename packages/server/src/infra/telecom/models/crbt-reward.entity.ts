import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('isdn', ['msisdn'], {})
@Index('expried', ['expriedTime'], {})
@Entity('crbt_reward', { schema: 'imuzikp3' })
export class CrbtRewardEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('varchar', { name: 'msisdn', length: 15 })
  msisdn: string;

  @Column('timestamp', {
    name: 'expried_time',
    nullable: true,
    default: () => "'0000-00-00 00:00:00'",
  })
  expriedTime: Date | null;

  @Column('timestamp', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('float', { name: 'price', nullable: true, precision: 12, default: () => "'0'" })
  price: number | null;

  @Column('timestamp', { name: 'req_time', nullable: true, default: () => "'0000-00-00 00:00:00'" })
  reqTime: Date | null;
}
