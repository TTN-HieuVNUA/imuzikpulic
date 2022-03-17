import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_setting', { schema: 'imuzikp3' })
export class SystemSetting {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'config_key', length: 255 })
  configKey: string;

  @Column('text', { name: 'config_value' })
  configValue: string;

  @Column('text', { name: 'description' })
  description: string;
}
