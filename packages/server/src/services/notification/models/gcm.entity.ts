import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('imei_idx', ['msisdn'], {})
@Index('status', ['status'], {})
@Entity('api_gcm', { schema: 'imuzikp3' })
export class DeviceRegistration {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'msisdn', nullable: true, length: 20 })
  msisdn: string | null;

  @Column('text', { name: 'register_id', nullable: true })
  registerId: string | null;

  @Column('tinyint', { name: 'status', nullable: true, default: () => "'1'" })
  status: number | null;

  @Column('bigint', { name: 'type', nullable: true })
  deviceType: string | null;
}
