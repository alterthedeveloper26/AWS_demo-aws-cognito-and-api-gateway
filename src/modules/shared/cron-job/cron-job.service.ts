import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

import { RequestContext } from '~common/middlewares/request.context';

@Injectable()
export class CronJobService {
  private readonly logger = new Logger(CronJobService.name);

  @Interval(60000)
  renewSubscription(): void {
    RequestContext.initNonRequestCorrelationId();

    this.logger.debug('Called every 1 minute');
    // this.subscriptionService.renewSubscriptions();

    // this.subscriptionService.expiringNotification();
  }
}
