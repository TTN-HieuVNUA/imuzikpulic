import { registerEnumType } from '@nestjs/graphql';

export enum NodeType {
  USER = 'USER',
  CP = 'CP',
  GENRE = 'GENRE',
  RBT = 'RBT',
  SINGER = 'SINGER',
  SONG = 'SONG',
  TOPIC = 'TOPIC',
}

registerEnumType(NodeType, { name: 'NodeType' });
