import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { Config } from '../../infra/config';
import { ApiHelperModule } from './../../api/api-helper.module';
import { MusicModule } from './../music/music.module';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      inject: [Config],
      useFactory: (config: Config) => {
        return {
          node: {
            url: (() => {
              const url = new URL(config.ES_HOST);
              url.username = config.ES_USERNAME;
              url.password = config.ES_PASSWORD;
              return url;
            })(),
          },
        };
      },
    }),
    MusicModule,
    ApiHelperModule,
  ],
  providers: [SearchResolver, SearchService],
})
export class SearchModule {}
