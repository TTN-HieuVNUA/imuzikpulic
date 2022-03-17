import { Column, Entity, Index } from 'typeorm';

@Index('vt_song_singer_join_singer_id_vt_singer_id', ['singerId'], {})
@Entity('vt_song_singer_join', { schema: 'imuzikp3' })
export class SongSinger {
  @Column('bigint', { primary: true, name: 'song_id', default: () => "'0'" })
  songId: string;

  @Column('bigint', { primary: true, name: 'singer_id', default: () => "'0'" })
  singerId: string;
}
