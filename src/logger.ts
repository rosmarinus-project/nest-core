import * as winston from 'winston';

export type Logger = winston.Logger;

export interface LoggerFactory {
  defaultLogger: Logger;
  getChildLogger(requestId: string): Logger;
}

export function initLoggerFactory({ isProduction }: { isProduction: boolean }): LoggerFactory {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [],
  });

  if (!isProduction) {
    /** 非生产环境的话，打到控制台 */
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
  } else {
    /** 打错误日志文件 */
    logger.add(new winston.transports.File({ filename: 'error.log', level: 'error' }));
    /** 打 info 级别的日志，需要 debug 时放开注释 */
    // logger.add(new winston.transports.File({ filename: 'combined.log' }));
  }

  return {
    defaultLogger: logger,
    getChildLogger(requestId: string) {
      return logger.child({ requestId });
    },
  };
}
