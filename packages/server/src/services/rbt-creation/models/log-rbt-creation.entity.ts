import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vt_log_ring_back_tone_creation', { schema: 'imuzikp3' })
export class LogRbtCreationEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('tinyint', { name: 'type_creation', nullable: true })
  type_creation: number | null;

  @Column('varchar', { name: 'msisdn', nullable: true })
  msisdn: string | null;

  @Column('boolean', { name: 'success', nullable: true })
  success: boolean | null;

  @Column('varchar', { name: 'status_code', nullable: true })
  status_code: string | null;

  @Column('varchar', { name: 'content', nullable: true })
  content: string | null;

  @Column('datetime', { name: 'created_at' })
  created_at: Date;
}
