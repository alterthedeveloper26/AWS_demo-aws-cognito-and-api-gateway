// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { DateTime as dt } from 'luxon';
import { v4 } from 'uuid';

import generateConfig from '~/config/configuration';
import { CORRELATION_ID_HEADER } from '~common/constants/environments';
import { RequestInfo } from '~shared/logger/types';

const config = generateConfig();

const getCorrelationId = (req: Request): string =>
  (req.headers?.[CORRELATION_ID_HEADER] as string) || v4();

const initRequestInfo = (req: Request): RequestInfo => ({
  correlationId: getCorrelationId(req),
  serviceName: config.serviceName,
  fromIp: req.ip,
  method: req.method,
  receivedAt: dt.now().valueOf()
});

const generateMessage = (message: string): string =>
  `[${config.serviceName}] - ${message}`;

export { getCorrelationId, initRequestInfo, generateMessage };
