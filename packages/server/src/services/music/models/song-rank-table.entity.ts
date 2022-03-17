import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('song_id_idx', ['songId'], {})
@Entity('vt_song_rank_table', { schema: 'imuzikp3' })
export class SongRankTable {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'song_id', nullable: true })
  songId: string | null;

  @Column('tinyint', { name: 'ranktable_id' })
  ranktableId: number;

  @Column('bigint', {
    name: 'vote_times',
    nullable: true,
    default: () => "'0'",
  })
  voteTimes: string | null;

  @Column('bigint', {
    name: 'fake_vote_times',
    nullable: true,
    default: () => "'0'",
  })
  fakeVoteTimes: string | null;

  @Column('tinyint', {
    name: 'last_rank',
    nullable: true,
    default: () => "'0'",
  })
  lastRank: number | null;

  @Column('varchar', { name: 'image_path', nullable: true, length: 255 })
  imagePath: string | null;

  @Column('varchar', { name: 'tone_code', nullable: true, length: 255 })
  toneCode: string | null;
}
