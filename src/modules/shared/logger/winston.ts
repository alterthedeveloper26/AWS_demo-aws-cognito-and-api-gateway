import { createLogger, Logger, transports } from 'winston';
import { Syslog, SyslogTransportOptions } from 'winston-syslog';

import { PRODUCTION } from '~common/constants/environments';
import getConfig from '~/config/configuration';

const { environment, papertrailConfig, serviceName } = getConfig();

const getDefaultLevel = (env: string): string => {
  if (!env) {
    throw Error('ArgumentError: environment');
  }

  return env === PRODUCTION ? 'info' : 'debug';
};

const options: SyslogTransportOptions = {
  protocol: 'tls4',
  host: papertrailConfig.host,
  port: papertrailConfig.port,
  app_name: papertrailConfig.appName,
  localhost: `${serviceName}-${environment}`,
  eol: '\n'
};

const initLogger = (env: string, level = getDefaultLevel(env)): Logger =>
  createLogger({
    level,
    transports: [new transports.Console(), new Syslog(options)]
  });

export { initLogger };
