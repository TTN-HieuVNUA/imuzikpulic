import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { UrlService } from '../../../infra/util/url/url.service';
import { ContentProvider, RingBackTone, Song } from '../../music';
import { RingBackToneCreationLoaderService } from '../../music/loader-services/ring-back-tone-creation.loader-service';
import {
  ContentProviderDetailLoaderService,
  ContentProviderLoaderService,
  RingBackToneLoaderService,
  SongLoaderService,
} from '../../music/loader-services';
import {
  RbtCreationType,
  RingBackToneCreation,
} from '../../music/models/ring-back-tone-creation.entity';
import { Injectable } from '@nestjs/common';
import { RbtCreationService } from '../rbt-creation.service';
import {
  RbtCreationPayload,
  RingBackToneCreationConnection,
  RingBackToneCreationConnectionArgs,
} from '../rbt-creation.schemas';
import { AccountService } from '../../account';
import { BaseResolver, ConnectionPagingService } from '../../../api';
import { LoggingService } from '../../../infra/logging';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { either, taskEither } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { v4 as uuidV4 } from 'uuid';
import {
  RBTC_EXTENSION_AUDIO,
  RBTC_UPLOAD_FALSE,
  RBTC_VALIDATE_SINGER_NAME_VALID,
  RBTC_VALIDATE_SONG_NAME_VALID,
  ReturnError,
} from '../../../error-codes';
import { Config } from '../../../infra/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
@Injectable()
@Resolver(() => RingBackToneCreation) //RingBackTone
export class RingBackToneCreationResolver extends BaseResolver {
  constructor(
    private urlService: UrlService,
    // private contentProviderDetailLoaderService: ContentProviderDetailLoaderService,
    private ringBackToneCreationLoaderService: RingBackToneCreationLoaderService,
    private rbtCreationService: RbtCreationService,
    private songLoaderService: SongLoaderService,
    private contentProviderLoaderService: ContentProviderLoaderService,
    private ringBackToneLoaderService: RingBackToneLoaderService,
    private accountService: AccountService,
    private loggingService: LoggingService,
    private config: Config
  ) {
    super(loggingService.getLogger('song-resolver'));
  }

  @Mutation(() => RbtCreationPayload)
  async createRbtAvailable(
    @Args('time_start', { nullable: false }) time_start: string,
    @Args('time_stop', { nullable: false }) time_stop: string,
    @Args('song_slug', { nullable: false }) song_slug: string,
    @Context('accessToken') accessToken: string
  ) {
    return this.resolvePayloadTask(
      this.rbtCreationService.createRbtAvailable({
        accessToken,
        time_start: time_start,
        time_stop: time_stop,
        song_slug: song_slug,
      })
    );
  }

  // --------------
  @Mutation(() => RbtCreationPayload)
  async createRbtUnavailable(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @Args('songName', { nullable: false }) songName: string,
    @Args('singerName', { nullable: false }) singerName: string,
    @Args('composer', { nullable: false }) composer: string,
    @Args('time_start', { nullable: false }) time_start: string,
    @Args('time_stop', { nullable: false }) time_stop: string,
    @Context('accessToken') accessToken: string
  ) {
    let extension = filename?.split('.').pop();
    if (!extension || extension !== 'mp3') {
      return new ReturnError(RBTC_EXTENSION_AUDIO);
    }
    let uuid = uuidV4();
    let slug = this.rbtCreationService.convertToSlug(songName);

    //validation

    // songName = this.removeVietnameseTones(songName);
    // singerName = this.removeVietnameseTonesAndNumber(singerName);
    // composer = this.removeVietnameseTonesAndNumber(composer);
    // if (songName.length < 6 || songName.length > 100)
    //   return new ReturnError(RBTC_VALIDATE_SONG_NAME_VALID);
    // if (singerName.length < 6 || singerName.length > 100)
    //   return new ReturnError(RBTC_VALIDATE_SINGER_NAME_VALID);
    // if (composer.length < 6 || composer.length > 100)
    //   return new ReturnError(RBTC_VALIDATE_SINGER_NAME_VALID);

    let regex =
      /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ| _]+$/;
    if (!regex.test(songName) || songName.length < 6 || songName.length > 100) {
      return new ReturnError(RBTC_VALIDATE_SONG_NAME_VALID);
    }
    if (!regex.test(singerName) || singerName.length < 6 || singerName.length > 100) {
      return new ReturnError(RBTC_VALIDATE_SINGER_NAME_VALID);
    }
    if (!regex.test(composer) || composer.length < 6 || composer.length > 100) {
      return new ReturnError(RBTC_VALIDATE_SINGER_NAME_VALID);
    }

    let file_upload_name = `${slug}-${uuid}.${extension}`;

    let file_upload_path =
      this.config.RBT_CREATION.RBT_CREATION_FOLDER + `${file_upload_name}` ||
      `./downloads/rbt-creation/${file_upload_name}`;
    let upload_success = await this.rbtCreationService.saveFile(file_upload_path, createReadStream);
    if (!upload_success) {
      return new ReturnError(RBTC_UPLOAD_FALSE);
    }
    return this.resolvePayloadTask(
      this.rbtCreationService.createRbtUnavailable({
        accessToken,
        fileName: file_upload_name,
        songName: songName,
        singerName: singerName,
        composer: composer,
        time_start: time_start,
        time_stop: time_stop,
      })
    );
  }

  @Query(() => RingBackToneCreation, { nullable: true })
  async getMyToneCreation(@Args('id') id: string, @Context('accessToken') accessToken: string) {
    return this.rbtCreationService.getMyToneCreation(id, accessToken);
  }

  @Query(() => RingBackToneCreationConnection)
  async getMyToneCreations(
    @Args() connArgs: RingBackToneCreationConnectionArgs,
    @Context('accessToken') accessToken: string
  ) {
    return this.rbtCreationService.getMyToneCreations(connArgs, accessToken);
  }
  
  @ResolveField('song', () => Song, { nullable: true })
  async song(@Parent() tone: RingBackToneCreation) {
    return this.songLoaderService.loadBy('id', tone.song_id);
  }

  @ResolveField('contentProvider', () => ContentProvider, { nullable: true })
  async contentProvider(@Parent() tone: RingBackToneCreation) {
    return await this.contentProviderLoaderService.loadBy('id', tone.cp_id);
  }

  @ResolveField('tone', () => RingBackTone, { nullable: true })
  async tone(@Parent() tone: RingBackToneCreation) {
    return this.ringBackToneLoaderService.loadBy('huaweiToneCode', tone.tone_code);
  }

  removeVietnameseTones(str: string) {
    str = str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' '
      )
      .replace(/ + /g, ' ')
      .trim();

    return str;
  }
  removeVietnameseTonesAndNumber(str: string) {
    str = str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[0-9]+/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' '
      )
      .replace(/ + /g, ' ')
      .trim();

    return str;
  }
}
