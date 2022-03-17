import { Injectable } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';

import { StringPayload } from '../../api';
import { BaseResolver } from '../../api/base.resolver';
import { LoggingService } from '../../infra/logging';
import { ReturnError } from './../../error-codes';
import { AuthenticatePayload, GenerateCaptchaPayload } from './account.schemas';
import { AccountService } from './account.service';
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from './constants';

@Injectable()
@Resolver()
export class AuthenticationResolver extends BaseResolver {
  constructor(loggingService: LoggingService, private accountService: AccountService) {
    super(loggingService.getLogger('api'));
  }

  @Mutation(() => AuthenticatePayload)
  async authenticate(
    @Args({ name: 'username', type: () => String, nullable: true }) username: string,
    @Args({ name: 'password', type: () => String, nullable: true }) password: string,
    @Args({ name: 'captcha', type: () => String, nullable: true }) captcha: string,
    @Context('ip') ip: string,
    @Context('injectedMsisdn') injectedMsisdn: string,
    @Context('authorizationCode') authorizationCode: string,
    @Context('res') res: Response
  ): Promise<AuthenticatePayload> {
    return pipe(
      this.accountService.authenticateTE(
        authorizationCode,
        username,
        password,
        captcha,
        injectedMsisdn,
        ip
      ),
      taskEither.chain(this.setAccessTokenCookie(res)),
      this.resolvePayloadTask
    );
  }

  @Mutation(() => AuthenticatePayload)
  async refreshAccessToken(
    @Args('refreshToken', { nullable: true }) refreshToken: string,
    @Context('refreshToken') refreshTokenCookie: string,
    @Context('res') res: Response
  ): Promise<AuthenticatePayload> {
    return pipe(
      this.accountService.refreshTokenTE(refreshTokenCookie || refreshToken),
      taskEither.chain(this.setAccessTokenCookie(res)),
      this.resolvePayloadTask
    );
  }

  @Mutation(() => StringPayload)
  async logout(@Context('res') res: Response) {
    return pipe(
      taskEither.rightTask(async () => {
        res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
        res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
        return null;
      }),
      this.resolvePayloadTask
    );
  }

  private setAccessTokenCookie = <
    AuthRes extends {
      accessToken: string;
      accessTokenExpiry: number;
      refreshToken: string;
      refreshTokenExpiry: number;
    }
  >(
    res: Response
  ) => (authRes: AuthRes) =>
    taskEither.rightTask<ReturnError, AuthRes>(async () => {
      const now = new Date().getTime();
      res.cookie(ACCESS_TOKEN_COOKIE_KEY, authRes.accessToken, {
        httpOnly: true,
        maxAge: authRes.accessTokenExpiry - now,
        // sameSite: 'strict',
      });
      res.cookie(REFRESH_TOKEN_COOKIE_KEY, authRes.refreshToken, {
        httpOnly: true,
        maxAge: authRes.refreshTokenExpiry - now,
        // sameSite: 'strict',
      });
      return authRes;
    });

  @Mutation(() => GenerateCaptchaPayload)
  async generateCaptcha(
    @Args({ name: 'username', type: () => String, nullable: true }) username: string,
    @Context('authorizationCode') authorizationCode: string
  ): Promise<GenerateCaptchaPayload> {
    return this.try(() => this.accountService.generateCaptcha(authorizationCode, username));
  }
}
