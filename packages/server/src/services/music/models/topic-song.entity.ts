import { Column, Entity, Index } from 'typeorm';

@Index('fk_topic_song_song_id', ['songId'], {})
@Entity('topic_song', { schema: 'imuzikp3' })
export class TopicSong {
  @Column('bigint', { primary: true, name: 'topic_id' })
  topicId: string;

  @Column('bigint', { primary: true, name: 'song_id' })
  songId: string;

  // @OneToOne(() => Song)
  // @JoinColumn({ name: 'song_id' })
  // song: Song;

  @Column('bigint', { name: 'priority', nullable: true })
  priority: string | null;

  @Column('timestamp', { name: 'created_at', default: () => "'0000-00-00 00:00:00'" })
  createdAt: Date;

  @Column('timestamp', { name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
