import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { ApiResponse as ApiResponseModel } from '~base/base.response';
import {
  FORBIDDEN_REQUEST,
  INTERNAL_SERVER_ERR,
  UNAUTHORIZED
} from '~common/constants/messages';
import { RequestContext } from '~common/middlewares/request.context';
import { generateMessage } from '~common/utils/logger.utils';
import { durations } from '~common/utils/luxon';
import { LoggerService } from '~shared/logger/logger.service';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerService: LoggerService
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    console.log(exception.message);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: Partial<ApiResponseModel> = {
      success: false,
      correlationId: RequestContext.getCorrelationId() || 'e001'
    };

    if (exception instanceof HttpException) {
      const responseData = exception.getResponse() as ApiResponseModel;
      responseBody.result = responseData.result;
      switch (httpStatus) {
        case HttpStatus.UNAUTHORIZED:
          responseBody.message = UNAUTHORIZED;
          break;
        case HttpStatus.FORBIDDEN:
          responseBody.message = FORBIDDEN_REQUEST;
          break;
        default:
          responseBody.message = responseData.message;
          break;
      }
    } else {
      responseBody.message = INTERNAL_SERVER_ERR;
    }

    this.loggerService.error(JSON.stringify(responseBody.message), exception, {
      ...responseBody
    });

    const requestInfo = RequestContext.getRequestInfo();
    if (requestInfo) {
      const currentRequest = RequestContext.currentRequest();
      const requestPath = `${currentRequest.method} ${currentRequest.url}`;
      this.loggerService.requestInfo(generateMessage(requestPath), {
        ...requestInfo,
        durations: durations(new Date(requestInfo.receivedAt), new Date())
        // TODO: get response data
        //   data
      });
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
