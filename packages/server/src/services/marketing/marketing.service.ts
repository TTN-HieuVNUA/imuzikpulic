import { Injectable } from '@nestjs/common';

import { Node } from '../../api/nodes';
import { MusicService } from '../music';
import { RbtService } from './../rbt/rbt.service';

@Injectable()
export class MarketingService {
  constructor(private musicService: MusicService, private rbtService: RbtService) {}

  async getMarketingItem(item: {
    itemType: string | null;
    itemId: string | null;
  }): Promise<Node | null> {
    switch (item.itemType?.toUpperCase()) {
      case 'SONG':
      return this.musicService.findEntityBySlug(item.itemType, item.itemId??"");
      case 'SINGER':
      case 'RBT':
      case 'TOPIC':
      case 'GENRE':
      case 'REGISTER':
        return this.rbtService.rbtPackage(item.itemId);
    }
    return null;
  }
}
