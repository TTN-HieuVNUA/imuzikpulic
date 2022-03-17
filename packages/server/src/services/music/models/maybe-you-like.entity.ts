import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('maybe_you_like_ibfk_1', ['songId'], {})
@Index('priority', ['priority'], {})
@Entity('maybe_you_like', { schema: 'imuzikp3' })
export class MaybeYouLike {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: string;

  @Column('bigint', { name: 'song_id', nullable: true })
  songId: string | null;

  @Column('bigint', { name: 'priority', nullable: true })
  priority: string | null;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('bigint', { name: 'created_by', nullable: true })
  createdBy: string | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('bigint', { name: 'updated_by', nullable: true })
  updatedBy: string | null;
}
