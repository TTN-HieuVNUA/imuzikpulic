import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { either } from 'fp-ts';
import { RedisService } from 'nestjs-redis';
import { Config } from '../../infra/config';
import { KEYWORD_IS_NULL, KEYWORD_MAX_LENGTH, ReturnError } from './../../error-codes';

@Injectable()
export class SearchService {
  constructor(
    @Inject(ElasticsearchService)
    private readonly elasticsearchService: ElasticsearchService,
    private config: Config,
    private readonly redisService: RedisService
  ) {}
  async search(
    query: string,
    from: number,
    size: number,
    type?: string | null,
    analyzer = 'standard_asciifolding',
    fuzziness?: number | string
  ): Promise<[{ id: number; type: string; title: string }[], number]> {
    if (query.length < 2) return [[], 0];
    const searchResult = await this.elasticsearchService.search({
      index: this.config.ES_NODE_IDX,
      body: {
        from,
        size,
        query: {
          bool: {
            must: [
              {
                match: {
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  title: { query, analyzer, fuzziness, minimum_should_match: '3<80%' },
                },
              },
              ...(type ? [{ match: { type } }] : []),
            ],
          },
        },
      },
    });
    const hits = searchResult.body.hits.hits.map((h: { _source: object }) => h._source);
    return [hits, searchResult.body.hits.total.value];
  }

  async getHotKeywords() {
    return this.redisService.getClient().zrevrange(this.config.REDIS_HOT_KEYWORD_KEY, 0, 4);
  }

  recordKeyword = (keyword: string) => async () => {
    if (!keyword) return either.left(new ReturnError(KEYWORD_IS_NULL));
    if (keyword.length > 255) return either.left(new ReturnError(KEYWORD_MAX_LENGTH));
    const [res] = await this.search(keyword, 0, 1, null, 'standard', 0);
    // TODO: rate limit
    // TODO: keyword expiry
    if (res.length > 0) {
      await this.redisService
        .getClient()
        .zincrby(this.config.REDIS_HOT_KEYWORD_KEY, 1, res[0].title);
    }
    return either.right(null);
  };
}
