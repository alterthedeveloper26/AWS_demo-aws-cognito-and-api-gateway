import { hostname } from 'os';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

import { RequestContext } from '~common/middlewares/request.context';
import { generateMessage } from '~common/utils/logger.utils';
import { durations } from '~common/utils/luxon';
import { LoggerService } from '~shared/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(protected readonly loggerService: LoggerService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const currentRequest = RequestContext.currentRequest();
    const requestPath = `${currentRequest.method} ${currentRequest.url}`;
    const requestInfo = RequestContext.initRequestInfo();

    this.loggerService.info(
      generateMessage(`Attempting to call API - ${requestPath}`),
      {
        hostName: hostname(),
        correlationId: RequestContext.getCorrelationId(),
        ...RequestContext.currentContext().request.body
      }
    );

    // ERROR
    return next.handle().pipe(
      tap(() => {
        this.loggerService.requestInfo(generateMessage(requestPath), {
          ...requestInfo,
          durations: durations(new Date(requestInfo.receivedAt), new Date())
          // leave data empty due to unhandled large data to papertrail
        });
      })
    );
  }
}
