import { Injectable } from '@nestjs/common';

import {
  ContentProviderLoaderService,
  GenreLoaderService,
  RingBackToneLoaderService,
  SingerLoaderService,
  SongLoaderService,
  TopicLoaderService,
} from './loader-services';
import { Genre, RingBackTone, Singer, Song, Topic } from './models';
import { ContentProvider } from './models/content-provider.entity';
import { Chart } from './music.schemas';
import { MusicSettings } from './music.settings';

@Injectable()
export class MusicService {
  constructor(
    private musicSettings: MusicSettings,

    private topicLoaderService: TopicLoaderService,
    private songLoaderService: SongLoaderService,
    private singerLoaderService: SingerLoaderService,
    private genreLoaderService: GenreLoaderService,
    private contentProviderLoaderService: ContentProviderLoaderService,
    private ringBackToneLoaderService: RingBackToneLoaderService
  ) {}

  async findChartById(id: string) {
    return (await this.musicSettings.getICharts()).find((c) => c.id == id) ?? null;
  }
  async findChartBySlug(slug: string | null) {
    return (await this.musicSettings.getICharts()).find((c) => c.slug == slug) ?? null;
  }
  findRbtByToneCode = (toneCode: string) =>
    this.ringBackToneLoaderService.loadBy('huaweiToneCode', toneCode);

  async findEntityById(type: string, id: string) {
    switch (type) {
      case Song.TYPE:
        return await this.songLoaderService.loadBy('id', id);
      case Genre.TYPE:
        return await this.genreLoaderService.loadBy('id', id);
      case Topic.TYPE:
        return await this.topicLoaderService.loadBy('id', id);
      case Singer.TYPE:
        return await this.singerLoaderService.loadBy('id', id);
      case RingBackTone.TYPE:
        return await this.ringBackToneLoaderService.loadBy('huaweiToneCode', id);
      case Chart.TYPE:
        return this.findChartById(id);
      case ContentProvider.TYPE:
        return await this.contentProviderLoaderService.loadBy('group', id);
    }
    return null;
  }
  async findEntityBySlug(type: string, slug: string | null) {
    switch (type) {
      case Song.TYPE:
        return await this.songLoaderService.loadBy('slug', slug);
      case Genre.TYPE:
        return await this.genreLoaderService.loadBy('slug', slug);
      case Topic.TYPE:
        return await this.topicLoaderService.loadBy('slug', slug);
      case Singer.TYPE:
        return await this.singerLoaderService.loadBy('slug', slug);
      case RingBackTone.TYPE:
        return await this.ringBackToneLoaderService.loadBy('huaweiToneCode', slug);
      case Chart.TYPE:
        return this.findChartBySlug(slug);
      case ContentProvider.TYPE:
        return await this.contentProviderLoaderService.loadBy('group', slug);
    }
    return null;
  }
}
