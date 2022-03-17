import { Module } from '@nestjs/common';

import { UrlService } from './url/url.service';

@Module({
  providers: [UrlService],
  exports: [UrlService],
})
export class UtilModule {}
