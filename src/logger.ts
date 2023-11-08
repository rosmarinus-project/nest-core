import { initFileLoggerFactory, type FileLogger } from '@rosmarinus/common-utils';

export type Logger = FileLogger;

export interface LoggerFactory {
  defaultLogger: Logger;
  getChildLogger(requestId: string): Logger;
}

export function initLoggerFactory({ isProduction, logDir }: { isProduction: boolean; logDir?: string }): LoggerFactory {
  const logger = initFileLoggerFactory({
    isProduction,
    defaultMeta: { service: 'user-service' },
    fileLevel: 'in-hour',
    logFileDir: logDir,
  }).defaultLogger;

  return {
    defaultLogger: logger,
    getChildLogger(requestId: string) {
      return logger.child({ requestId });
    },
  };
}
