// eslint-disable-next-line import/no-extraneous-dependencies
import { AxiosRequestConfig } from 'axios';

export type ApiServiceConfig = {
  serviceName?: string;
  axiosConfig?: AxiosRequestConfig;
};
