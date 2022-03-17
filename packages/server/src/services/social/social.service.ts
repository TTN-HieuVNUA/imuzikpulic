import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { either, taskEither } from 'fp-ts';
import { flow } from 'fp-ts/lib/function';
import { Task } from 'fp-ts/lib/Task';
import { Logger } from 'log4js';
import { ObjectID } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { ReturnError, SYSTEM_ERROR } from './../../error-codes';
import { LoggingService } from './../../infra/logging/logging.service';
import { AccountService } from './../account/account.service';
import { Comment, COMMENT_STATUS, Reply } from './models';
import { REPLY_STATUS } from './models/reply.entity';
import { SingerLike } from './models/singer-like.entity';

@Injectable()
export class SocialService {
  logger: Logger;
  constructor(
    @InjectRepository(Comment, 'social_db')
    private readonly commentRepository: MongoRepository<Comment>,
    @InjectRepository(SingerLike, 'social_db')
    private readonly singerLikeRepository: MongoRepository<SingerLike>,
    loggingService: LoggingService,
    private accountService: AccountService
  ) {
    this.logger = loggingService.getLogger('social-service');
  }

  private tryCatch = <R>(task: Task<R>) =>
    taskEither.tryCatch(task, (e) => {
      this.logger.error(e);
      return new ReturnError(SYSTEM_ERROR);
    });

  findComments(songId: string, skip: number, take: number) {
    return this.commentRepository.findAndCount({
      where: { songId, status: COMMENT_STATUS.VISIBLE },
      order: { updatedAt: 'DESC' },
      skip,
      take,
    });
  }

  getComment = (commentId: string) =>
    taskEither.rightTask(async () => await this.commentRepository.findOneOrFail(commentId));

  createComment = flow(
    this.accountService.requireLogin<{ songId: string; content: string }>(),
    taskEither.chain(({ songId, content, user }) =>
      this.tryCatch(async () => {
        const comment = new Comment();
        comment.songId = songId;
        comment.userId = user.id;
        comment.content = content;
        comment.status = COMMENT_STATUS.VISIBLE;
        comment.createdAt = comment.updatedAt = new Date();
        await this.commentRepository.save(comment);
        return comment;
      })
    )
  );

  deleteComment = flow(
    this.accountService.requireLogin<{ commentId: string }>(),
    taskEither.chain(({ commentId, user: { id: userId } }) =>
      this.tryCatch(async () => {
        this.commentRepository.delete({
          id: ObjectID.createFromHexString(commentId),
          userId,
        });
        return null;
      })
    )
  );

  likeComment = flow(
    this.accountService.requireLogin<{ commentId: string; like: boolean }>(),
    taskEither.chain(({ commentId, user: { id: userId }, like }) =>
      this.tryCatch(async () => {
        await this.commentRepository.updateOne(
          { _id: ObjectID.createFromHexString(commentId) },
          {
            ...(like ? { $addToSet: { likedBy: userId } } : { $pull: { likedBy: userId } }),
            $set: { updatedAt: new Date() },
          }
        );
        return (await this.commentRepository.findOne(commentId)) ?? null;
      })
    )
  );
  createReply = flow(
    this.accountService.requireLogin<{ commentId: string; content: string }>(),
    taskEither.chain(({ content, commentId, user: { id: userId } }) =>
      this.tryCatch(async () => {
        const reply = new Reply();
        reply.id = new ObjectID();
        reply.userId = userId;
        reply.content = content;
        reply.status = REPLY_STATUS.VISIBLE;
        reply.createdAt = reply.updatedAt = new Date();
        const { modifiedCount } = await this.commentRepository.updateOne(
          { _id: ObjectID.createFromHexString(commentId) },
          {
            $push: { replies: reply },
            $set: { updatedAt: new Date() },
          }
        );

        return modifiedCount > 0 ? reply : null;
      })
    )
  );
  deleteReply = flow(
    this.accountService.requireLogin<{ commentId: string; replyId: string }>(),
    taskEither.chain(({ commentId, replyId, user: { id: userId } }) =>
      this.tryCatch(async () => {
        await this.commentRepository.updateOne(
          { _id: ObjectID.createFromHexString(commentId) },
          {
            $pull: {
              replies: {
                id: ObjectID.createFromHexString(replyId),
                userId,
              },
            },
            $set: { updatedAt: new Date() },
          }
        );

        return null;
      })
    )
  );
  likeSinger = flow(
    this.accountService.requireLogin<{ singerId: string; like: boolean }>(),
    taskEither.chain(({ singerId, user: { id: userId }, like }) =>
      this.tryCatch(async () => {
        if (like) {
          const singerLike = new SingerLike();
          singerLike.singerId = singerId;
          singerLike.userId = userId;
          singerLike.createdAt = new Date();
          await this.singerLikeRepository.save(singerLike).catch(() => null);
        } else {
          await this.singerLikeRepository.deleteMany({ singerId, userId });
        }
        return '';
      })
    )
  );
  likedSinger = flow(
    this.accountService.requireLogin<{ singerId: string }>(),
    taskEither.chain(({ singerId, user: { id: userId } }) => async () =>
      either.right((await this.singerLikeRepository.count({ singerId, userId })) > 0)
    )
  );
  singerTotalLikes = (singerId: string) => this.singerLikeRepository.count({ singerId });
}
