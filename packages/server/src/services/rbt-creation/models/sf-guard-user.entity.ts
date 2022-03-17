import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const USER_ACTIVE = 1;

@Entity('sf_guard_user', { schema: 'imuzikp3' })
export class SfGuardUser {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'cp_id', nullable: true })
  cp_id: number | null;


  @Column('varchar', { name: 'first_name', nullable: true })
  first_name: string | null;

  @Column('varchar', { name: 'last_name', nullable: true })
  last_name: string | null;

  @Column('varchar', { name: 'phone', nullable: true })
  phone: string | null;

  @Column('tinyint', { name: 'is_active', nullable: true })
  is_active: number | null;
}
