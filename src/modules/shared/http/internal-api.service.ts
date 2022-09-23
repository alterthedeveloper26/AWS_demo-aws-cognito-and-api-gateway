import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, map, Observable, of } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { ApiResponse } from '~base/base.response';
import { CORRELATION_ID_HEADER } from '~common/constants/environments';
import { RequestContext } from '~common/middlewares/request.context';
import { generateMessage } from '~common/utils/logger.utils';
import { ApiServiceConfig } from '~shared/http/types';
import { LoggerService } from '~shared/logger/logger.service';

@Injectable()
export class InternalApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly loggerService: LoggerService
  ) {}

  get<T = unknown>(
    url: string,
    config: ApiServiceConfig = {}
  ): Promise<ApiResponse<T>> {
    const axiosConfig = this.setup(url, 'GET', {}, config);

    return this.transformHttpServiceResponse(
      this.httpService.get<ApiResponse<T>>(url, axiosConfig)
    );
  }

  post<T = unknown>(
    url: string,
    data?: unknown,
    config: ApiServiceConfig = {}
  ): Promise<ApiResponse<T>> {
    const axiosConfig = this.setup(url, 'POST', data, config);

    return this.transformHttpServiceResponse(
      this.httpService.post<ApiResponse<T>>(url, data, axiosConfig)
    );
  }

  put<T = unknown>(
    url: string,
    data?: unknown,
    config: ApiServiceConfig = {}
  ): Promise<ApiResponse<T>> {
    const axiosConfig = this.setup(url, 'PUT', data, config);

    return this.transformHttpServiceResponse(
      this.httpService.put<ApiResponse<T>>(url, data, axiosConfig)
    );
  }

  patch<T = unknown>(
    url: string,
    data?: unknown,
    config: ApiServiceConfig = {}
  ): Promise<ApiResponse<T>> {
    const axiosConfig = this.setup(url, 'PATCH', data, config);

    return this.transformHttpServiceResponse(
      this.httpService.patch<ApiResponse<T>>(url, data, axiosConfig)
    );
  }

  delete<T = unknown>(
    url: string,
    config: ApiServiceConfig = {}
  ): Promise<ApiResponse<T>> {
    const axiosConfig = this.setup(url, 'DELETE', {}, config);

    return this.transformHttpServiceResponse(
      this.httpService.delete<ApiResponse<T>>(url, axiosConfig)
    );
  }

  private transformHttpServiceResponse = <T>(
    observable: Observable<AxiosResponse<ApiResponse<T>>>
  ): Promise<ApiResponse<T>> =>
    new Promise((resolve) => {
      observable
        .pipe(
          map((response) => {
            const { data, status } = response;
            if (!data.success) {
              data.message = data.message || '';
            }

            return {
              data,
              status
            };
          }),
          catchError((err) => {
            if (!err.response) {
              this.loggerService.error(
                generateMessage('An error has occurred while calling API'),
                err
              );
              return of({
                data: {
                  success: false,
                  message: 'Internal server error'
                },
                status: 500
              });
            }

            return of({
              data: {
                ...err.response?.data,
                message: err.response?.data?.message
                  ? err.response?.data?.message
                  : ''
              },
              status: err.response?.status
            });
          })
        )
        .subscribe((response) =>
          resolve({
            ...response.data,
            responseCode: response.status
          })
        );
    });

  private setup(
    requestPath: string,
    method: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any> = {},
    config: ApiServiceConfig = {}
  ): AxiosRequestConfig {
    const axiosConfig: AxiosRequestConfig = config?.axiosConfig || {};
    axiosConfig.headers = {
      ...axiosConfig.headers,
      [CORRELATION_ID_HEADER]: RequestContext.getCorrelationId()
    };

    const token = RequestContext.getToken();
    if (token) {
      axiosConfig.headers.authorization = token;
    }

    const infoMessage = config.serviceName
      ? `Attempting to call API - ${method} ${requestPath} to ${config.serviceName}`
      : `Attempting to call API - ${method} ${requestPath}`;

    this.loggerService.info(generateMessage(infoMessage), {
      ...data
    });

    return axiosConfig;
  }
}
