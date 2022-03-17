import { Module } from '@nestjs/common';

import { TelecomModule } from '../infra/telecom/telecom.module';
import { MusicModule } from '../services/music/music.module';
import { NodesResolvers } from './nodes/nodes.resolvers';
import { ServerSettingsResolver } from './settings.resolver';

@Module({
  providers: [ServerSettingsResolver, NodesResolvers],
  imports: [TelecomModule, MusicModule],
})
export class ApiModule {}
