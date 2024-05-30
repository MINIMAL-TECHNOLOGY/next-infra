import { ClientLogger } from './client-logger.helper';
import { ApplicationLogger } from './server-logger.helper';

export interface IBaseLogger {
  withScope: (scope: string) => IBaseLogger;
  debug: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
}

export class LoggerFactory {
  static getLogger(scopes: string[], isClient?: boolean): IBaseLogger {
    const logger = isClient ? ClientLogger.getInstance() : new ApplicationLogger();
    logger.withScope(scopes.join('-'));
    return logger;
  }
}
