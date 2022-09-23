import { Module } from '@nestjs/common';

import { TasksModule } from '~shared/cron-job/cron-job.module';
import { DatabaseModule } from '~shared/database/database.module';
import { FileModule } from '~shared/file/file.module';
import { LoggerModule } from '~shared/logger/logger.module';
import { MessageBusModule } from '~shared/message-bus/message-bus.module';

@Module({
  imports: [
    FileModule,
    TasksModule,
    DatabaseModule,
    LoggerModule,
    MessageBusModule
  ]
})
export class SharedModule {}
