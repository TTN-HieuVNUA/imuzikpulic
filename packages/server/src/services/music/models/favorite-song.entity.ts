import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('member_id_idx', ['memberId'], {})
@Index('song_id_idx', ['songId'], {})
@Entity('vt_favourite_song_join', { schema: 'imuzikp3' })
export class FavoriteSong {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'member_id', nullable: true })
  memberId: string | null;

  @Column('bigint', { name: 'song_id', nullable: true })
  songId: string | null;

  @Column('datetime', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
