import { initFileLoggerFactory, type FileLogger } from '@rosmarinus/common-utils';

export type Logger = FileLogger;

export interface LoggerFactory {
  defaultLogger: Logger;
  getChildLogger(requestId: string): Logger;
}

export function initLoggerFactory({ isProduction }: { isProduction: boolean }): LoggerFactory {
  const logger = initFileLoggerFactory({
    isProduction,
    defaultMeta: { service: 'user-service' },
    fileLevel: 'in-hour',
  }).defaultLogger;

  return {
    defaultLogger: logger,
    getChildLogger(requestId: string) {
      return logger.child({ requestId });
    },
  };
}
