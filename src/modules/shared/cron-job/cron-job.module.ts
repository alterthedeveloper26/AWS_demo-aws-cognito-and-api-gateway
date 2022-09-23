import { Module } from '@nestjs/common';
import { ExampleModule } from '~models/example/example.module';

import { CronJobService } from './cron-job.service';

@Module({
  imports: [ExampleModule],
  providers: [CronJobService]
})
export class TasksModule {}
