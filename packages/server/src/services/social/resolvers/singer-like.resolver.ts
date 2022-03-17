import { Args, Context, ID, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { pipe } from 'fp-ts/lib/pipeable';
import { fromGlobalId } from 'graphql-relay';
import { StringPayload } from '../../../api';
import { BaseResolver } from '../../../api/base.resolver';
import { LoggingService } from '../../../infra/logging';
import { SingerLikes } from './../social.schemas';
import { SocialService } from './../social.service';

@Resolver(() => SingerLikes)
export class SingerLikesResolver extends BaseResolver {
  constructor(private socialService: SocialService, loggingService: LoggingService) {
    super(loggingService.getLogger('singer-like-resolver'));
  }

  @ResolveField('liked', () => Boolean, {})
  async liked(
    @Parent() singer: SingerLikes,
    @Context('accessToken') accessToken: string
  ): Promise<boolean | null> {
    return pipe(
      { accessToken, singerId: singer.id },
      this.socialService.likedSinger,
      this.resolveNullableTask
    );
  }
  @Mutation(() => StringPayload)
  async likeSinger(
    @Args('singerId', { type: () => ID }) singerId: string,
    @Args('like') like: boolean,
    @Context('accessToken') accessToken: string
  ): Promise<StringPayload> {
    return pipe(
      { accessToken, singerId: fromGlobalId(singerId).id, like },
      this.socialService.likeSinger,
      this.resolvePayloadTask
    );
  }
}
