import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('kpi_log', { schema: 'imuzikp3' })
export class KpiLogEntity {
  @Column('varchar', { name: 'application_code', nullable: true, length: 200 })
  applicationCode: string | null;

  @Column('varchar', { name: 'service_code', nullable: true, length: 200 })
  serviceCode: string | null;

  @PrimaryGeneratedColumn({ type: 'int', name: 'session_id' })
  sessionId: number;

  @Column('varchar', { name: 'ip_port_parent_node', nullable: true, length: 200 })
  ipPortParentNode: string | null;

  @Column('varchar', { name: 'ip_port_current_node', nullable: true, length: 200 })
  ipPortCurrentNode: string | null;

  @Column('text', { name: 'request_content', nullable: true })
  requestContent: string | null;

  @Column('text', { name: 'response_content', nullable: true })
  responseContent: string | null;

  @Column('datetime', { name: 'start_time', nullable: true })
  startTime: Date | null;

  @Column('datetime', { name: 'end_time', nullable: true })
  endTime: Date | null;

  @Column('int', { name: 'duration', nullable: true })
  duration: number | null;

  @Column('varchar', { name: 'error_code', nullable: true, length: 100 })
  errorCode: string | null;

  @Column('varchar', { name: 'error_description', nullable: true, length: 200 })
  errorDescription: string | null;

  @Column('int', { name: 'transaction_status', nullable: true })
  transactionStatus: number | null;

  @Column('varchar', { name: 'action_name', nullable: true, length: 200 })
  actionName: string | null;

  @Column('varchar', { name: 'user_name', nullable: true, length: 255 })
  userName: string | null;

  @Column('varchar', { name: 'account', nullable: true, length: 255 })
  account: string | null;
}
