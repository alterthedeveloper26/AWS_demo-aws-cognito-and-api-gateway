import { Global, Module } from '@nestjs/common';

import { MessageBusService } from '~shared/message-bus/message-bus.service';

@Global()
@Module({
  providers: [MessageBusService],
  exports: [MessageBusService]
})
export class MessageBusModule {}
