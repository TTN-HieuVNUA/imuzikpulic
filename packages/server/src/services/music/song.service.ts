import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader = require('dataloader');
import { either, taskEither } from 'fp-ts';
import { flow } from 'fp-ts/lib/function';
import { In, Repository } from 'typeorm';

import { ReturnError, SONG_NOT_EXIST } from '../../error-codes';
import { Config } from '../../infra/config';
import { AccountService } from './../account/account.service';
import { SongLoaderService } from './loader-services';
import { FavoriteSong } from './models';

export const likedListCachePrefix = (msisdn: string) => `liked-songs:${msisdn}`;

@Injectable()
export class SongService {
  constructor(
    private songLoaderService: SongLoaderService,
    @InjectRepository(FavoriteSong)
    private readonly favoriteSongRepository: Repository<FavoriteSong>,
    private readonly accountService: AccountService,
    private config: Config
  ) {}

  private findSongById(id: string) {
    return this.songLoaderService.loadBy('id', id);
  }

  private likeLoaders: { [key: string]: DataLoader<string, boolean> } = {};
  likeLoader(memberId: string): DataLoader<string, boolean> {
    if (!this.likeLoaders[memberId]) {
      this.likeLoaders[memberId] = new DataLoader(async (keys: readonly string[]) => {
        const likes = await this.favoriteSongRepository.find({
          memberId,
          songId: In([...keys]),
        });
        return keys.map((key) => !!likes.find((like) => like.songId === key));
      });
    }
    return this.likeLoaders[memberId];
  }

  likeSong = flow(
    this.accountService.requireLogin<{ songId: string; like: boolean }>(),
    taskEither.chain((ctx) => async () => {
      const { songId } = ctx;
      const song = await this.findSongById(songId);
      return song ? either.right({ ...ctx, song }) : either.left(new ReturnError(SONG_NOT_EXIST));
    }),
    taskEither.chain(({ song, like, user, songId, msisdn }) => async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const memberId = user!.id;
      const liked = await this.likeLoader(memberId).load(songId);
      if (like !== !!liked) {
        if (like) {
          const favorite = new FavoriteSong();
          favorite.memberId = memberId;
          favorite.songId = songId;
          favorite.createdAt = favorite.updatedAt = new Date();
          await this.favoriteSongRepository.save(favorite);
        } else {
          await this.favoriteSongRepository.delete({
            memberId,
            songId,
          });
        }
        this.likeLoader(memberId).clear(songId);
        this.likeLoader(memberId).prime(songId, like);
        this.songLoaderService.invalidateListsWithPrefix(likedListCachePrefix(msisdn));
      }
      return either.right(song);
    })
  );
}
