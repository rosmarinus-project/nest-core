import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Logger, LoggerFactory } from '../logger';

export interface Ctx {
  logger: Logger;
}

export interface ContextParams {
  requestId?: string;
  loggerFactory: LoggerFactory;
}

function buildContext(params: ContextParams): Ctx {
  return {
    logger: params.loggerFactory.getChildLogger(params.requestId || 'none-request-id'),
  };
}

function createContextDecorate(defaultLoggerFactory?: LoggerFactory) {
  return createParamDecorator((loggerFactory: LoggerFactory, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const rid = request.headers['Request-Id'] || '';

    return buildContext({ requestId: rid, loggerFactory: loggerFactory || defaultLoggerFactory });
  });
}

/** 上下文装饰器 */
export const Context = createContextDecorate();

/** 装饰器闭包 */
export function buildContextFactory(loggerFactory: LoggerFactory) {
  return createContextDecorate(loggerFactory);
}
