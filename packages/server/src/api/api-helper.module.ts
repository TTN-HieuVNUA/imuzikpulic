import { Module } from '@nestjs/common';

import { ConnectionPagingService } from './paging/connection-paging.service';

@Module({
  providers: [ConnectionPagingService],
  imports: [],
  exports: [ConnectionPagingService],
})
export class ApiHelperModule {}
