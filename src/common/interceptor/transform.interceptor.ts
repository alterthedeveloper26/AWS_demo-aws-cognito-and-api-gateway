// eslint-disable-next-line import/no-extraneous-dependencies
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

import { RequestContext } from '~common/middlewares/request.context';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        // console.log(typeof data);
        if (data) {
          data.correlationId = RequestContext.getCorrelationId();
        }
        return data;
      })
    );
  }
}
