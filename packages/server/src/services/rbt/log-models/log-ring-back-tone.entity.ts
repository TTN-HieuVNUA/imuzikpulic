import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export const RBT_ACTION_BUY = 1;
export const RBT_ACTION_PRESENT = 2;
export const RBT_ACTION_DELETE = 3;

@Index('tone_id', ['toneId'], {})
@Index('tone_name', ['toneName'], {})
@Index('tone_code', ['toneCode'], {})
@Index('from_phonenumber', ['fromPhonenumber'], {})
@Index('return_code', ['returnCode'], {})
@Index('created_at', ['createdAt'], {})
@Entity('vt_log_ring_back_tone', { schema: 'imuzikp3' })
export class LogRingBackTone {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'tone_id', nullable: true })
  toneId: string | null;

  @Column('varchar', { name: 'tone_name', nullable: true, length: 255 })
  toneName: string | null;

  @Column('varchar', { name: 'tone_code', nullable: true, length: 100 })
  toneCode: string | null;

  @Column('bigint', { name: 'tone_price', nullable: true })
  tonePrice: string | null;

  @Column('date', { name: 'tone_availabledate', nullable: true })
  toneAvailableDate: Date | null;

  @Column('tinyint', { name: 'action', nullable: true })
  action: number | null;

  @Column('bigint', { name: 'member_id' })
  memberId: string;

  @Column('varchar', { name: 'username', nullable: true, length: 255 })
  username: string | null;

  @Column('varchar', { name: 'from_phonenumber', nullable: true, length: 20 })
  fromPhonenumber: string | null;

  @Column('varchar', { name: 'to_phonenumber', nullable: true, length: 20 })
  toPhonenumber: string | null;

  @Column('varchar', { name: 'return_code', nullable: true, length: 255 })
  returnCode: string | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('int', { name: 'reported', nullable: true, default: () => "'0'" })
  reported: number | null;

  @Column('varchar', { name: 'source', nullable: true, length: 255 })
  source: string | null;
}
