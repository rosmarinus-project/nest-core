import { initFileLoggerFactory, type FileLogger } from '@rosmarinus/common-utils';

export type Logger = FileLogger;

export interface LoggerFactory {
  defaultLogger: Logger;
  getChildLogger(requestId: string): Logger;
}

export function initLoggerFactory({ isProduction, logDir }: { isProduction: boolean; logDir?: string }): LoggerFactory {
  const logger = initFileLoggerFactory({
    fileMode: isProduction ? 'in-hour' : 'console',
    fileLevel: 'info',
    logFileDir: logDir,
  }).defaultLogger;

  return {
    defaultLogger: logger,
    getChildLogger(requestId: string) {
      return logger.child({ requestId });
    },
  };
}
