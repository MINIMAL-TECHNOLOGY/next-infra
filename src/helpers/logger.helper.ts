/* eslint-disable @typescript-eslint/no-unsafe-argument */
import path from 'path';
import { transports, format, createLogger, type Logform } from 'winston';
import 'winston-daily-rotate-file';
import isEmpty from 'lodash/isEmpty';
import { getError } from '@/utilities';

const LOGGER_FOLDER_PATH = process.env.APP_ENV_LOGGER_FOLDER_PATH ?? './app_data/logs';
const LOG_ENVIRONMENTS = new Set(['development', 'alpha', 'beta', 'staging']);
const LOGGER_PREFIX = process.env.APP_ENV_APPLICATION_NAME ?? 'next-infra';

const consoleLogTransport = new transports.Console({
  level: 'debug',
});
const infoLogTransport = new transports.DailyRotateFile({
  frequency: '1h',
  maxSize: '100m',
  maxFiles: '5d',
  datePattern: 'YYYYMMDD_HH',
  filename: path.join(LOGGER_FOLDER_PATH, `/${LOGGER_PREFIX}-info-%DATE%.log`),
  level: 'info',
});

const errorLogTransport = new transports.DailyRotateFile({
  frequency: '1h',
  maxSize: '100m',
  maxFiles: '5d',
  datePattern: 'YYYYMMDD_HH',
  filename: path.join(LOGGER_FOLDER_PATH, `/${LOGGER_PREFIX}-error-%DATE%.log`),
  level: 'error',
});

export const applicationLogFormatter: Logform.Format = format.combine(
  format.label({ label: LOGGER_PREFIX }),
  format.splat(),
  format.align(),
  format.timestamp(),
  format.simple(),
  format.colorize(),
  format.printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`),
  format.errors({ stack: true }),
);

export const applicationLogger = createLogger({
  format: applicationLogFormatter,
  exitOnError: false,
  transports: [consoleLogTransport, infoLogTransport, errorLogTransport],
  exceptionHandlers: [consoleLogTransport, errorLogTransport],
});

export interface IBaseLogger {
  withScope: (scope: string) => IBaseLogger;
  debug: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
}

export class ApplicationLogger implements IBaseLogger {
  private scopes: string[] = [];
  readonly _environment: string | undefined;

  constructor() {
    this._environment = process.env.NODE_ENV;
  }

  withScope(scope: string) {
    if (this.scopes.length < 2) {
      this.scopes.push(scope);
      return this;
    }

    while (this.scopes.length > 2) {
      this.scopes.pop();
    }

    this.scopes[1] = scope;
    return this;
  }

  private _enhanceMessage(parts: string[], message: string) {
    const enhanced = parts?.reduce((prevState = '', current: string) => {
      if (isEmpty(prevState)) {
        return current;
      }

      return prevState.concat(`-${current}`);
    }, '');

    return `[${enhanced}]${message}`;
  }

  debug(message: string, ...args: any[]) {
    if (this._environment && !LOG_ENVIRONMENTS.has(this._environment)) {
      return;
    }

    if (!applicationLogger) {
      throw new Error('Invalid logger instance!');
    }

    if (!process.env.DEBUG) {
      return;
    }

    const enhanced = this._enhanceMessage(this.scopes, message);
    applicationLogger.log('debug', enhanced, ...args);
  }

  info(message: string, ...args: any[]) {
    if (!applicationLogger) {
      throw new Error('Invalid logger instance!');
    }

    const enhanced = this._enhanceMessage(this.scopes, message);
    applicationLogger.log('info', enhanced, ...args);
  }

  error(message: string, ...args: any[]) {
    if (!applicationLogger) {
      throw new Error('Invalid logger instance!');
    }

    const enhanced = this._enhanceMessage(this.scopes, message);
    applicationLogger.log('error', enhanced, ...args);
  }
}

export class ClientLogger implements IBaseLogger {
  private scopes: string[] = [];
  private static instance: ClientLogger;

  withScope(scope: string) {
    if (this.scopes.length < 2) {
      this.scopes.push(scope);
      return this;
    }

    while (this.scopes.length > 2) {
      this.scopes.pop();
    }

    this.scopes[1] = scope;
    return this;
  }

  static getInstance(): ClientLogger {
    if (!this.instance) {
      this.instance = new ClientLogger();
    }

    return this.instance;
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  generateLog(opts: { level: 'INFO' | 'DEBUG' | 'ERROR'; message: string }) {
    const { level, message } = opts;
    const timestamp = this.getTimestamp();
    return `${timestamp} - [${level}]\t ${message}`;
  }

  info(message: string, ...args: any[]) {
    if (!applicationLogger) {
      throw getError({ message: '[info] Invalid logger instance!' });
    }

    applicationLogger.info(this.generateLog({ level: 'INFO', message }), ...args);
  }

  debug(message: string, ...args: any[]) {
    if (!applicationLogger) {
      throw getError({ message: '[debug] Invalid logger instance!' });
    }

    applicationLogger.debug(this.generateLog({ level: 'DEBUG', message }), ...args);
  }

  error(message: string, ...args: any[]) {
    if (!applicationLogger) {
      throw getError({ message: '[error] Invalid logger instance!' });
    }

    applicationLogger.error(this.generateLog({ level: 'ERROR', message }), ...args);
  }
}

export class LoggerFactory {
  static getLogger(scopes: string[], isClient?: boolean): ApplicationLogger | ClientLogger {
    const logger = isClient ? ClientLogger.getInstance() : new ApplicationLogger();
    logger.withScope(scopes.join('-'));
    return logger;
  }
}
