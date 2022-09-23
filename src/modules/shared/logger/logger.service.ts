import { v4 } from 'uuid';
import { Logger } from 'winston';

import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { sensitiveFields } from '~common/constants/etc';
import { RequestContext } from '~common/middlewares/request.context';
import { CommonInfo, EventInfo, RequestInfo } from '~shared/logger/types';

import { initLogger } from './winston';

@Injectable()
export class LoggerService {
  protected readonly loggerInstance: Logger;

  constructor(private configService: ConfigService) {
    const environment = this.configService.get<string>('environment');
    this.loggerInstance = initLogger(environment);
  }

  // Use for the end of the request
  public requestInfo(
    message: string,
    data: RequestInfo = { correlationId: this.getCorrelationId() }
  ): void {
    if (!data.correlationId) {
      data.correlationId = this.getCorrelationId();
    }
    data.data = this.hideSensitive(data.data);
    this.loggerInstance.info(message, data);
  }

  // use for the beginning of the execution
  public eventInfo(
    message: string,
    data: EventInfo = { correlationId: this.getCorrelationId() }
  ): void {
    if (!data.correlationId) {
      data.correlationId = this.getCorrelationId();
    }
    data.data = this.hideSensitive(data.data);
    this.loggerInstance.info(message, data);
  }

  // use for logging additional info
  public info(
    message: string,
    optionalParams: CommonInfo = { correlationId: this.getCorrelationId() }
  ): void {
    if (!optionalParams.correlationId) {
      optionalParams.correlationId = this.getCorrelationId();
    }
    this.loggerInstance.info(message, this.hideSensitive(optionalParams));
  }

  // use for debug
  public debug(
    message: string,
    optionalParams: CommonInfo = { correlationId: this.getCorrelationId() }
  ): void {
    if (!optionalParams.correlationId) {
      optionalParams.correlationId = this.getCorrelationId();
    }
    this.loggerInstance.debug(message, this.hideSensitive(optionalParams));
  }

  // use for error handling
  public error(
    message: string,
    error: Error,
    optionalParams: CommonInfo = { correlationId: this.getCorrelationId() }
  ): void {
    const wrappedError = this.parseError(error);

    if (!optionalParams.correlationId) {
      optionalParams.correlationId = this.getCorrelationId();
    }
    this.loggerInstance.error(message, {
      message: wrappedError.message,
      stack: wrappedError.stack,
      ...this.hideSensitive(optionalParams)
    });
  }

  // use for warning
  public warn(
    message: string,
    optionalParams: CommonInfo = { correlationId: this.getCorrelationId() }
  ): void {
    if (!optionalParams.correlationId) {
      optionalParams.correlationId = this.getCorrelationId();
    }
    this.loggerInstance.warn(message, optionalParams);
  }

  private parseError(error: Error): Error {
    if (error instanceof Error) {
      return error;
    }

    return new Error(JSON.stringify(error));
  }

  private hideSensitive(
    data: Record<string, unknown> = {}
  ): Record<string, unknown> {
    Object.keys(data).forEach((key) => {
      if (sensitiveFields.includes(key)) {
        data[key] = '**Censored**';
      }
      if (key === 'data') {
        data[key] = this.hideSensitive(data[key] as Record<string, unknown>);
      }
    });
    return data;
  }

  private getCorrelationId(): string {
    return RequestContext.getCorrelationId() || v4();
  }
}
