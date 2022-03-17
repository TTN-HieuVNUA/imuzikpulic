import { Column, Entity, Index } from 'typeorm';

@Index('vt_music_genre_join_music_genre_id_vt_music_genre_id', ['musicGenreId'], {})
@Entity('vt_music_genre_join', { schema: 'imuzikp3' })
export class SongGenre {
  @Column('bigint', { primary: true, name: 'song_id', default: () => "'0'" })
  songId: string;

  @Column('bigint', { primary: true, name: 'music_genre_id', default: () => "'0'" })
  musicGenreId: string;
}
