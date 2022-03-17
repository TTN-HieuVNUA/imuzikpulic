import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader = require('dataloader');
import { either, taskEither } from 'fp-ts';
import { flow } from 'fp-ts/lib/function';
import { Repository } from 'typeorm';
import { format } from 'date-fns';
// @ts-ignore
//import * as ip from 'ip';
import fs = require('fs');
import path = require('path');
import _ = require('lodash');
const download = require('download');

import {
  EXTENSION_IMAGE,
  RBTC_CANNOT_DOWNLOAD_FILE,
  RBTC_CONVERT_WAV_FALSE,
  RBTC_DURATION_NOT_INVALID,
  RBTC_EXTENSION_AUDIO,
  RBTC_GEN_TONE_CODE_FALSE,
  RBTC_NOT_EXIST_CP,
  RBTC_NOT_EXIST_RBT_TO_CREATION,
  RBTC_ORIGIN_SONG_NOT_EXITS,
  RBTC_PATH_FALSE,
  RBTC_SPLIT_AUDIO_FILE_NOT_SUCCESSFUL,
  RBTC_TYPE_FALSE,
  RBTC_UPLOAD_WAV_FALSE,
  ReturnError,
  SUCCESS,
} from '../../error-codes';
import { Config } from '../../infra/config';
import { AccountService, UserPayload } from './../account/account.service';
import {
  RbtCreationType,
  RingBackToneCreation,
} from '../music/models/ring-back-tone-creation.entity';
import { RingBackToneCreationLoaderService } from '../music/loader-services/ring-back-tone-creation.loader-service';
import {
  ContentProviderLoaderService,
  RingBackToneLoaderService,
  SongLoaderService,
} from '../music/loader-services';
import {
  ACTION_CREATION_RBCT_AVAILABLE,
  ACTION_CREATION_RBCT_CREATIVE,
  ACTION_CREATION_RBCT_UNAVAILABLE,
  MAX_DURATION_RBTC,
  MIN_DURATION_RBTC,
} from '../../infra/telecom/constants';
//import { LogRingBackToneCreation } from './log-models/log-rbtc.entity';
import { LogRbtCreationEntity } from './models/log-rbt-creation.entity';
import { createWriteStream, ReadStream } from 'fs';
import { LoggingService } from '../../infra/logging';
import { FTP } from '../../infra/ftp/ftp-hepper';
import { ExternalRbtService } from '../../infra/telecom';
import { Logger } from 'log4js';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
import { v4 as uuidV4 } from 'uuid';
import { ConnectionPagingService } from '../../api';
import {
  RingBackToneCreationConnection,
  RingBackToneCreationConnectionArgs,
} from './rbt-creation.schemas';
const ffmpeg = require('fluent-ffmpeg');
import ms = require('ms');
import * as camelcaseKeys from 'camelcase-keys';
import { RingBackTone, Singer } from '../music';
import { SfGuardUserLoaderService } from '../music/loader-services/sf-guard-user.loader-service';
import { async } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires

export const likedListCachePrefix = (msisdn: string) => `liked-songs:${msisdn}`;

export type RingBackToneCreationInputPayload = {
  name: string;
  timeStart: string;
  timeStop: string;
  vt_song_id: number;
};
export type RingBackToneCreationPayload = {
  name: string;
  msisdn?: string | null | undefined;
  vtLink?: string;
  typeSong?: RbtCreationType;
  duration?: number;
  vtMember?: string;
};
@Injectable()
export class RbtCreationService {
  private crbtLogger: Logger;
  constructor(
    @InjectRepository(RingBackToneCreation)
    private readonly ringBackToneCreationRepository: Repository<RingBackToneCreation>,
    @InjectRepository(LogRbtCreationEntity)
    private logRbtcServiceRepository: Repository<LogRbtCreationEntity>,
    private ringBackToneCreationLoaderService: RingBackToneCreationLoaderService,
    private ringBackToneLoaderService: RingBackToneLoaderService,
    private contentProviderLoaderService: ContentProviderLoaderService,
    // private sfGuardUserLoaderService: SfGuardUserLoaderService,
    private connectionPagingService: ConnectionPagingService,
    private config: Config,
    private accountService: AccountService,
    private songLoaderService: SongLoaderService,
    private loggingService: LoggingService,
    private ftp: FTP,
    private externalRbtService: ExternalRbtService
  ) {
    this.crbtLogger = loggingService.getLogger('RBT');
  }

  async logRbtCreation(
    user: UserPayload | null,
    type_creation: number,
    status_code: string,
    success: boolean,
    content: string
  ) {
    const log = new LogRbtCreationEntity();
    log.type_creation = type_creation;
    log.msisdn = user?.phoneNumber ?? null;
    log.status_code = status_code ?? null;
    log.success = success;
    log.content = content;
    await this.logRbtcServiceRepository.save(log);
  }

  async saveFile(file_upload_path: string, createReadStream: () => ReadStream) {
    return new Promise<boolean>((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(file_upload_path))
        .on('finish', () => {
          resolve(true);
        })
        .on('error', () => {
          resolve(false);
        });
    });
  }
  private getDuration(file_upload_path: string) {
    return new Promise<number>((resolve, reject) => {
      ffmpeg.setFfprobePath(ffprobePath);
      ffmpeg.ffprobe(file_upload_path, (ex: any, metadata: any) => {
        if (ex) {
          this.crbtLogger.error('[RbtCreationService][ERROR-001]:' + ex);
          reject();
        } else {
          resolve(metadata?.format?.duration);
        }
      });
    });
  }
  private ffmpegSync(
    pathAudioFile: string,
    dirSaveRBTC: string,
    startTime: string,
    duration: number
  ) {
    return new Promise<void>((resolve, reject) => {
      ffmpeg(pathAudioFile)
        .setStartTime(startTime)
        .setDuration(duration.toString())
        .output(dirSaveRBTC)
        .on('end', (err: any) => {
          if (!err) {
            resolve();
          } else {
            this.crbtLogger.error('[RbtCreationService][ERROR-002]:' + err);
          }
        })
        .on('error', (err: any) => {
          this.crbtLogger.error('[RbtCreationService][ERROR-003]:' + err);
          reject();
        })
        .run();
    });
  }

  createRbtAvailable = flow(
    //tao nhac cho tu bai hat co san
    // Flow chạy luôn function đầu => return giá trị cho function sau.
    this.accountService.requireLogin<{
      time_start: string;
      time_stop: string;
      song_slug: string;
    }>(),
    //Nhận giá trị thêm (nếu có) vào biết ctx
    taskEither.chain((ctx) => async () => {
      const uuid = uuidV4();
      const prefix = `ST ${Date.now().toString().slice(-4)}`;
      const prefix_file = `${Date.now().toString()}`;
      const duration = parseInt(ctx.time_stop) - parseInt(ctx.time_start);
      if (
        (MIN_DURATION_RBTC > duration && duration) ||
        (duration && duration > MAX_DURATION_RBTC)
      ) {
        return either.left(new ReturnError(RBTC_DURATION_NOT_INVALID));
      }
      // check ton tai va status = active
      const originSong = await this.songLoaderService.loadBy('slug', ctx.song_slug);
      if (!originSong) {
        await this.logRbtCreation(
          ctx.user,
          ACTION_CREATION_RBCT_AVAILABLE,
          RBTC_ORIGIN_SONG_NOT_EXITS,
          false,
          `Không thể lấy thông tin bài nhạc [song_slug:${ctx.song_slug}]`
        );
        return either.left(new ReturnError(RBTC_ORIGIN_SONG_NOT_EXITS));
      }
      //get sf_guard_user de lay cp_id
      // const sfUser = await this.sfGuardUserLoaderService.loadBy("id",originSong.createdBy);
      // if (!sfUser || !sfUser.cp_id) {
      // return either.left(new ReturnError(RBTC_NOT_VALID_SF_GUARD_USER));
      // }

      const tones = await this.ringBackToneLoaderService.loadOneToManyBy('vtSongId', originSong.id);

      let tone: RingBackTone = new RingBackTone();
      tones.map((rbt) => {
        if (rbt.huaweiAvailableDatetime != null && rbt.huaweiAvailableDatetime != undefined) {
          if (
            tone?.huaweiAvailableDatetime === null ||
            tone?.huaweiAvailableDatetime === undefined
          ) {
            tone = rbt;
          } else {
            if (tone.huaweiAvailableDatetime < rbt.huaweiAvailableDatetime) {
              tone = rbt;
            }
          }
        }
      });
      if (
        tone === null ||
        tone.huaweiCpId === null ||
        tone.huaweiCpId === undefined ||
        tone.huaweiAvailableDatetime === null ||
        tone.huaweiAvailableDatetime === undefined
      ) {
        await this.logRbtCreation(
          ctx.user,
          ACTION_CREATION_RBCT_AVAILABLE,
          RBTC_NOT_EXIST_RBT_TO_CREATION,
          false,
          `Không thể lấy thông tin nhạc chờ [song_id:${originSong.id}]`
        );
        return either.left(new ReturnError(RBTC_NOT_EXIST_RBT_TO_CREATION));
      }
      const cpObj = await this.contentProviderLoaderService.loadBy('id', tone.huaweiCpId);
      if (!cpObj || !cpObj.code) {
        return either.left(new ReturnError(RBTC_NOT_EXIST_CP));
      }
      let cp_id = cpObj.id;
      let cp_code = cpObj.code;
      let availableDatetime = tone.huaweiAvailableDatetime;
      const slug = `${this.convertToSlug(originSong.name)}-${uuid}`;
      let tone_name = `${prefix} ${this.removeVietnameseTones(originSong.name)}`;
      let tone_name_generation = `${prefix} ${this.removeVietnameseTones(originSong.name)}`;
      let singers = camelcaseKeys(JSON.parse(originSong.singerList ?? '[]')).map((es: object) =>
        Object.assign(new Singer(), es)
      ) as Singer[];

      // @ts-ignore
      // Todo: add config
      const link_file = this.config.RBT_CREATION.RBT_MEDIA_HOST + originSong.filePath;
      const save_folder = this.config.RBT_CREATION.RBT_DOWNLOAD_FOLDER;
      const save_file_name = `${slug}.mp3`;
      //const mp3Downloaded = `${this.config.RBT_CREATION.RBT_DOWNLOAD_FOLDER+save_file_name}`;
      const mp3Downloaded = `${
        this.config.RBT_CREATION.RBT_DOWNLOAD_FOLDER +
        'goi-do-sang-tao-creation-ver-1-8af3d4ff-1864-44eb-b33e-3a14f6fec87a.mp3'
      }`;
      //Todo
      // await download(link_file, save_folder,{filename:save_file_name}).then(() => {
      //   console.log('Download:'+link_file);
      // }).catch(() => {
      //   return either.left(new ReturnError(RBTC_CANNOT_DOWNLOAD_FILE));
      // });

      return either.right({
        ...ctx,
        originSong,
        duration,
        singers,
        slug,
        uuid,
        prefix,
        prefix_file,
        tone_name,
        tone_name_generation,
        mp3Downloaded,
        cp_id,
        cp_code,
        availableDatetime,
      });
    }),
    taskEither.chain((ctx) => async () => {
      let { mp3Downloaded, duration } = ctx;
      let file_duration = await this.getDuration(mp3Downloaded);
      let time_start = parseInt(ctx.time_start);
      let time_stop = parseInt(ctx.time_stop);

      if (
        time_start >= file_duration ||
        file_duration - time_start < MIN_DURATION_RBTC ||
        time_stop >= file_duration ||
        file_duration - time_stop < 0
      ) {
        return either.left(new ReturnError(RBTC_DURATION_NOT_INVALID));
      } else {
        return either.right({ ...ctx });
      }
    }),
    taskEither.chain((ctx) => async () => {
      //-------------------------------------------------
      // cat nhac va luu vao folder RBTCreation
      let { slug, mp3Downloaded, prefix_file } = ctx;

      const mp3Trimed = this.config.RBT_CREATION.RBT_CREATION_FOLDER + `${slug}-${prefix_file}.mp3`;
      ffmpeg.setFfmpegPath(ffmpegPath);
      return this.ffmpegSync(mp3Downloaded, mp3Trimed, ctx.time_start, ctx.duration)
        .then(() => {
          return either.right({ ...ctx, mp3Trimed, slug, mp3Downloaded });
        })
        .catch(async () => {
          await this.logRbtCreation(
            ctx.user,
            ACTION_CREATION_RBCT_AVAILABLE,
            RBTC_SPLIT_AUDIO_FILE_NOT_SUCCESSFUL,
            false,
            `Cắt nhạc không thành công [mp3_downloaded:${mp3Downloaded}]`
          );
          this.crbtLogger.error('[RbtCreationService][ERROR-004]:Can not split file.');
          return either.left(new ReturnError(RBTC_SPLIT_AUDIO_FILE_NOT_SUCCESSFUL));
        });
    }),
    taskEither.chain((ctx) => async () => {
      try {
        let wavTrimed = this.convertMp3ToWav(ctx.mp3Trimed);
        return either.right({ ...ctx, wavTrimed });
      } catch (ex) {
        await this.logRbtCreation(
          ctx.user,
          ACTION_CREATION_RBCT_AVAILABLE,
          RBTC_CONVERT_WAV_FALSE,
          false,
          `Không thể convert file sang wav [mp3Trimed:${ctx.mp3Trimed}]`
        );
        this.crbtLogger.error('[RbtCreationService][ERROR-005]:' + ex);
        return either.left(new ReturnError(RBTC_CONVERT_WAV_FALSE));
      }
    }),
    taskEither.chain((ctx) => async () => {
      //GenTone
      try {
        let { tone_name_generation, cp_code, availableDatetime, msisdn, singers, slug } = ctx;
        let str_availableDatetime = format(availableDatetime, 'yyyy-MM-dd HH:mm:ss');
        let str_singers =
          singers.length > 0 ? singers.map((s) => s.alias).join(' ft ') : 'Sang tao';
        str_singers = this.removeVietnameseTones(str_singers);
        this.crbtLogger.info(
          '[RbtCreationService][INFO-001]:' +
            str_singers +
            '|' +
            str_availableDatetime +
            '|' +
            tone_name_generation
        );
        const { success, tone_id, tone_code, return_code } =
          await this.externalRbtService.uploadTone(
            msisdn,
            cp_code,
            tone_name_generation,
            str_availableDatetime,
            str_singers
          );

        if (success) {
          return either.right({ ...ctx, tone_id, tone_code, str_singers });
        } else {
          await this.logRbtCreation(
            ctx.user,
            ACTION_CREATION_RBCT_AVAILABLE,
            RBTC_GEN_TONE_CODE_FALSE,
            false,
            `Không thể tạo mã nhạc chờ [return_code:${return_code}][tone_name_generation:${tone_name_generation}]`
          );
          return either.left(new ReturnError(RBTC_GEN_TONE_CODE_FALSE));
        }
      } catch (ex) {
        return either.left(new ReturnError(RBTC_GEN_TONE_CODE_FALSE));
      }
    }),
    taskEither.chain((ctx) => async () => {
      let wavFileFtp = `${this.config.RBT_CREATION.RBT_FTP_FOLDER + ctx.tone_code}.wav`;
      try {
        let isSuccessful = await this.ftp.uploadFTP(ctx.wavTrimed, wavFileFtp);
        if (isSuccessful) {
          return either.right({ ...ctx, wavFileFtp });
        } else {
          await this.logRbtCreation(
            ctx.user,
            ACTION_CREATION_RBCT_AVAILABLE,
            RBTC_UPLOAD_WAV_FALSE,
            false,
            `Không thể upload file lên FTP [wav_ftp_file:${wavFileFtp}]`
          );
          return either.left(new ReturnError(RBTC_UPLOAD_WAV_FALSE));
        }
      } catch (ex) {
        await this.logRbtCreation(
          ctx.user,
          ACTION_CREATION_RBCT_AVAILABLE,
          RBTC_UPLOAD_WAV_FALSE,
          false,
          `Không thể upload file lên FTP [wav_ftp_file:${wavFileFtp}]`
        );
        return either.left(new ReturnError(RBTC_UPLOAD_WAV_FALSE));
      }
    }),
    taskEither.chain((ctx) => async () => {
      let {
        tone_name,
        tone_name_generation,
        cp_id,
        duration,
        mp3Trimed,
        slug,
        msisdn,
        wavFileFtp,
        tone_id,
        tone_code,
        str_singers,
        originSong,
        availableDatetime,
      } = ctx;
      const payload = {
        type_creation: RbtCreationType.available,
        song_id: originSong.id,
        cp_id: cp_id,
        tone_name: tone_name,
        tone_name_generation: tone_name_generation,
        singer_name: str_singers,
        slug: slug,
        msisdn: msisdn,
        member_id: ctx.user.id,
        duration: duration,
        tone_price: '3000',
        tone_code: tone_code,
        tone_id: tone_id,
        available_datetime: availableDatetime,
        tone_status: 2,
        local_file: mp3Trimed.substring(1),
        ftp_file: wavFileFtp,
        is_synchronize: 1,
      };
      const result = await this.ringBackToneCreationRepository.save(payload);
      await this.logRbtCreation(
        ctx.user,
        ACTION_CREATION_RBCT_AVAILABLE,
        SUCCESS,
        true,
        `Tạo nhạc chờ thành công [tone_code:${tone_code}]`
      );
      let rbt = await this.ringBackToneCreationRepository.findOne(result.id);
      //fs.unlinkSync(ctx.mp3Downloaded);
      return either.right(rbt);
    })
  );

  createRbtUnavailable = flow(
    // status: 1: pending, 2: approved, 3: denied
    // -> save to vt_ring_back_tone_creation with status pending(1)
    // -> call CMS (response within 3 working days)
    // -> if(approved){
    // -> vrcbt create tone_code
    // -> rename file to tonecode
    // -> convert mp3Trimed to wav
    // -> push FTP and save to vt_ring_back_tone table
    // }

    this.accountService.requireLogin<{
      time_start: string;
      time_stop: string;
      fileName: string;
      songName: string;
      singerName: string;
      composer: string;
    }>(),
    taskEither.chain((ctx) => async () => {
      const uuid = uuidV4();
      let data = {
        success: false,
        code: SUCCESS,
        rbt: new RingBackToneCreation(),
      };
      const file_upload_path =
        this.config.RBT_CREATION.RBT_CREATION_FOLDER + `${ctx.fileName}` ||
        `./downloads/rbt-creation/${ctx.fileName}`;
      const song_duration = await this.getDuration(file_upload_path);
      const slug = `${this.convertToSlug(ctx.songName)}-${uuid}`;
      const start = parseInt(ctx.time_start);
      const stop = parseInt(ctx.time_stop);
      const duration = stop - start;
      if (!fs.existsSync(this.config.RBT_CREATION.RBT_CREATION_FOLDER)) {
        fs.mkdirSync(this.config.RBT_CREATION.RBT_CREATION_FOLDER, {
          recursive: true,
          mode: '0777',
        });
      }
      if (
        start >= song_duration ||
        song_duration - start < MIN_DURATION_RBTC ||
        stop >= song_duration ||
        song_duration - stop < 0 ||
        duration < MIN_DURATION_RBTC ||
        duration > MAX_DURATION_RBTC
      ) {
        return either.left(new ReturnError(RBTC_DURATION_NOT_INVALID));
      }

      return either.right({ ...ctx, duration, slug, file_upload_path, data });
    }),
    taskEither.chain((ctx) => async () => {
      const prefix = `ST ${Date.now().toString().slice(-4)}`;
      // const prefix_file = `${Date.now().toString()}`;
      const mp3Trimed = this.config.RBT_CREATION.RBT_CREATION_FOLDER + `${ctx.slug}-${prefix}.mp3`;
      ffmpeg.setFfmpegPath(ffmpegPath);
      try {
        await this.ffmpegSync(ctx.file_upload_path, mp3Trimed, ctx.time_start, ctx.duration);
        //delete uploaded file
        fs.unlinkSync(`${ctx.file_upload_path}`);
        // this.deleteUploaded(ctx.file_upload_path)
      } catch {
        await this.logRbtCreation(
          ctx.user,
          ACTION_CREATION_RBCT_AVAILABLE,
          RBTC_SPLIT_AUDIO_FILE_NOT_SUCCESSFUL,
          false,
          `Cắt nhạc không thành công [mp3_downloaded:${ctx.file_upload_path}]`
        );
        this.crbtLogger.error('[RbtCreationService][ERROR-004]:Can not split file.');
        return either.left(new ReturnError(RBTC_SPLIT_AUDIO_FILE_NOT_SUCCESSFUL));
      }
      return either.right({ ...ctx, mp3Trimed });
    }),
    taskEither.chain((ctx) => async () => {
      try {
        await this.convertMp3ToWav(ctx.mp3Trimed);
      } catch (ex) {
        this.logRbtCreation(
          ctx.user,
          ACTION_CREATION_RBCT_AVAILABLE,
          RBTC_CONVERT_WAV_FALSE,
          false,
          `Không thể convert file sang wav [mp3Trimed:${ctx.mp3Trimed}]`
        );
        this.crbtLogger.error('[RbtCreationService][ERROR-005]:' + ex);
        return either.left(new ReturnError(RBTC_CONVERT_WAV_FALSE));
      }
      return either.right({ ...ctx });
    }),
    // taskEither.chain((ctx) => async () => {
    //   //GenTone
    //   try {
    //     let { tone_name_generation, cp_code, availableDatetime, msisdn, singers, slug } = ctx;
    //     let str_availableDatetime = format(availableDatetime, 'yyyy-MM-dd HH:mm:ss');
    //     let str_singers =
    //       singers.length > 0 ? singers.map((s) => s.alias).join(' ft ') : 'Sang tao';
    //     str_singers = this.removeVietnameseTones(str_singers);
    //     this.crbtLogger.info(
    //       '[RbtCreationService][INFO-001]:' +
    //         str_singers +
    //         '|' +
    //         str_availableDatetime +
    //         '|' +
    //         tone_name_generation
    //     );
    //     const { success, tone_id, tone_code, return_code } =
    //       await this.externalRbtService.uploadTone(
    //         msisdn,
    //         cp_code,
    //         tone_name_generation,
    //         str_availableDatetime,
    //         str_singers
    //       );

    //     if (success) {
    //       return either.right({ ...ctx, tone_id, tone_code, str_singers });
    //     } else {
    //       await this.logRbtCreation(
    //         ctx.user,
    //         ACTION_CREATION_RBCT_AVAILABLE,
    //         RBTC_GEN_TONE_CODE_FALSE,
    //         false,
    //         `Không thể tạo mã nhạc chờ [return_code:${return_code}][tone_name_generation:${tone_name_generation}]`
    //       );
    //       return either.left(new ReturnError(RBTC_GEN_TONE_CODE_FALSE));
    //     }
    //   } catch (ex) {
    //     return either.left(new ReturnError(RBTC_GEN_TONE_CODE_FALSE));
    //   }
    // }),
    // taskEither.chain((ctx) => async () => {
    //   let wavFileFtp = `${this.config.RBT_CREATION.RBT_FTP_FOLDER + ctx.tone_code}.wav`;
    //   try {
    //     let isSuccessful = await this.ftp.uploadFTP(ctx.wavTrimed, wavFileFtp);
    //     if (isSuccessful) {
    //       return either.right({ ...ctx, wavFileFtp });
    //     } else {
    //       await this.logRbtCreation(
    //         ctx.user,
    //         ACTION_CREATION_RBCT_AVAILABLE,
    //         RBTC_UPLOAD_WAV_FALSE,
    //         false,
    //         `Không thể upload file lên FTP [wav_ftp_file:${wavFileFtp}]`
    //       );
    //       return either.left(new ReturnError(RBTC_UPLOAD_WAV_FALSE));
    //     }
    //   } catch (ex) {
    //     await this.logRbtCreation(
    //       ctx.user,
    //       ACTION_CREATION_RBCT_AVAILABLE,
    //       RBTC_UPLOAD_WAV_FALSE,
    //       false,
    //       `Không thể upload file lên FTP [wav_ftp_file:${wavFileFtp}]`
    //     );
    //     return either.left(new ReturnError(RBTC_UPLOAD_WAV_FALSE));
    //   }
    // }),
    taskEither.chain((ctx) => async () => {
      const payload = {
        type_creation: RbtCreationType.unavailable,
        tone_name: ctx.songName,
        tone_name_generation: ctx.slug,
        singer_name: ctx.singerName,
        composer: ctx.composer,
        slug: ctx.slug,
        msisdn: ctx.user.phoneNumber,
        member_id: ctx.user.id,
        duration: ctx.duration,
        tone_status: 1,
        local_file: ctx.mp3Trimed.substring(1),
        is_synchronize: 0,
      };
      let savedTone = await this.ringBackToneCreationRepository.save(payload);
      ctx.data.rbt = savedTone;
      ctx.data.success = true;
      await this.logRbtCreation(
        ctx.user,
        ACTION_CREATION_RBCT_UNAVAILABLE,
        SUCCESS,
        true,
        `Upload nhạc chờ thành công, đang chờ duyệt [id:${savedTone.id}]`
      );
      let rbt = await this.ringBackToneCreationRepository.findOne(savedTone.id);
      return either.right(rbt);
    })
  );

  async getMyToneCreation(id: string, accessToken: string): Promise<RingBackToneCreation | null> {
    let tone = null;
    const user = await this.accountService.memberFromAccessToken(accessToken);
    if (user) {
      let data = await this.ringBackToneCreationLoaderService.cachedPaginatedList(
        `tone-creation-id:${id}:msisdn:${user.phoneNumber}`,
        (repo) =>
          repo
            .createQueryBuilder('rbt')
            .where('rbt.id = :id AND rbt.msisdn = :msisdn', { id: id, msisdn: user.phoneNumber })
            .getManyAndCount()
      );
      tone = data[0][0];
    }
    return tone;
  }

  async getMyToneCreations(connArgs: RingBackToneCreationConnectionArgs, accessToken: string) {
    const user = await this.accountService.memberFromAccessToken(accessToken);
    if (user) {
      let msisdn = user.phoneNumber;
      let myCreations = await this.connectionPagingService.findAndPaginate(
        connArgs,
        (skip, take) => {
          let CACHE_KEY = `my-tone-creations:${msisdn}:${skip}:${take}`;
          return this.ringBackToneCreationLoaderService.cachedPaginatedList(
            CACHE_KEY,
            (ringBackToneCreationRepository) =>
              ringBackToneCreationRepository
                .createQueryBuilder('t')
                // .where('t.tone_status = :tone_status OR t.tone_status = :tone_status_is_pending AND t.msisdn = :msisdn', {
                .where('t.msisdn = :msisdn', {
                  // tone_status: 2,
                  // tone_status_is_pending: 1,
                  msisdn: msisdn,
                })
                .orderBy({ 't.id': 'DESC' })
                .take(take)
                .skip(skip)
                .getManyAndCount(),
            ms(this.config.CACHE_LONG_TIMEOUT)
          );
        },
        { extraFields: ({ count: totalCount }) => ({ totalCount }) }
      );
      return myCreations;
    } else {
      return { totalCount: 0, edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } };
    }
  }
  removeVietnameseTones(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' '
    );
    return str;
  }

  convertToSlug(str = '') {
    return this.removeVietnameseTones(str).toLowerCase().split(' ').join('-');
  }

  convertMp3ToWav(fileMp3: String) {
    let segments = fileMp3.split('/');
    let filename = segments[segments.length - 1];
    let name = filename.split('.')[0];
    let folder = fileMp3.replace(filename, '');
    let fileWav = folder + name + '.wav';
    console.log('Converting file %s', fileWav);
    ffmpeg(fileMp3).inputFormat('mp3').audioCodec('pcm_s16le').format('wav').save(fileWav);
    return fileWav;
  }
}
