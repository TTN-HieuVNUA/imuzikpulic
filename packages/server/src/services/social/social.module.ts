import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiHelperModule } from '../../api/api-helper.module';
import { AccountModule } from './../account/account.module';
import { Comment } from './models';
import { SingerLike } from './models/singer-like.entity';
import { CommentResolver } from './resolvers/comment.resolver';
import { ReplyResolver } from './resolvers/reply.resolver';
import { SingerLikesResolver } from './resolvers/singer-like.resolver';
import { SocialService } from './social.service';

@Module({
  imports: [
    ApiHelperModule,
    TypeOrmModule.forFeature([Comment, SingerLike], 'social_db'),
    AccountModule,
  ],
  providers: [CommentResolver, SocialService, ReplyResolver, SingerLikesResolver],
  exports: [SocialService],
})
export class SocialModule {}
