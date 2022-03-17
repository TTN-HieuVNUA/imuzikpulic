import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
@Index('singer_likes_idx', ['singerId'])
@Index('user_singer_likes_idx', ['userId', 'singerId'], { unique: true })
export class SingerLike {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  singerId: string;

  @Column()
  userId: string;

  @Column()
  createdAt: Date;
}
