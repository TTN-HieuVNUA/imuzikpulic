import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('gcm_spam_id', ['spamId'], {})
@Entity('api_gcm_user', { schema: 'imuzikp3' })
export class SpamSeen {
  @Column('varchar', { name: 'msisdn', length: 20 })
  msisdn: string;

  @Column('bigint', { name: 'gcm_spam_id', unsigned: true })
  spamId: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;
}
