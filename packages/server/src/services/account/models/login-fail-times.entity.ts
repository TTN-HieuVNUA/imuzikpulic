import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vt_login_fail_times')
export class LoginFailTimes {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'phone_number', length: 200 })
  phoneNumber: string;

  @Column('datetime', { name: 'created_time', default: () => 'CURRENT_TIMESTAMP' })
  createdTime: Date;
}
