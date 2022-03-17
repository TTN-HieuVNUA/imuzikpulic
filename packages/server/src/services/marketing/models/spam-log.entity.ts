import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('send_time_idx', ['sendTime'], {})
@Index('msisdn_idx', ['msisdn'], {})
@Index('register_id_idx', ['registerId'], {})
@Index('error_code_idx', ['errorCode'], {})
@Entity('api_gcm_spam_log', { schema: 'imuzikp3' })
export class SpamLog {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'msisdn', nullable: true, length: 20, default: () => "'0'" })
  msisdn: string | null;

  @Column('varchar', { name: 'register_id', length: 255 })
  registerId: string;

  @Column('bigint', { name: 'os_type', nullable: true, default: () => "'0'" })
  osType: string | null;

  @Column('bigint', { name: 'spam_id', nullable: true, default: () => "'0'" })
  spamId: string | null;

  @Column('bigint', { name: 'is_test', nullable: true, default: () => "'0'" })
  isTest: string | null;

  @Column('varchar', { name: 'error_code', nullable: true, length: 50, default: () => "'0'" })
  errorCode: string | null;

  @Column('datetime', { name: 'send_time', nullable: true })
  sendTime: Date | null;
}
