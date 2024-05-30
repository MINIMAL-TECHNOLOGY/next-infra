/* eslint-disable @typescript-eslint/no-unsafe-argument */
import path from 'path';
import isEmpty from 'lodash/isEmpty';
import { type IBaseLogger } from '@/helpers';

const LOGGER_FOLDER_PATH = process.env.APP_ENV_LOGGER_FOLDER_PATH ?? './app_data/logs';
const LOG_ENVIRONMENTS = new Set(['development', 'alpha', 'beta', 'staging']);
const LOGGER_PREFIX = process.env.APP_ENV_APPLICATION_NAME ?? 'next-infra';

export class ServerLogger implements IBaseLogger {
  private scopes: string[] = [];
  readonly _environment: string | undefined;
  private logger: any;

  constructor() {
    this._environment = process.env.NODE_ENV;

    if (typeof window === 'undefined') {
      // Only import Winston dependencies on the server-side
      void Promise.all([import('winston'), import('winston-daily-rotate-file')]).then(
        ([winston, { default: DailyRotateFile }]) => {
          const consoleLogTransport = new winston.transports.Console({
            level: 'debug',
          });
          const infoLogTransport = new DailyRotateFile({
            frequency: '1h',
            maxSize: '100m',
            maxFiles: '5d',
            datePattern: 'YYYYMMDD_HH',
            filename: path.join(LOGGER_FOLDER_PATH, `/${LOGGER_PREFIX}-info-%DATE%.log`),
            level: 'info',
          });
          const errorLogTransport = new DailyRotateFile({
            frequency: '1h',
            maxSize: '100m',
            maxFiles: '5d',
            datePattern: 'YYYYMMDD_HH',
            filename: path.join(LOGGER_FOLDER_PATH, `/${LOGGER_PREFIX}-error-%DATE%.log`),
            level: 'error',
          });

          const applicationLogFormatter = winston.format.combine(
            winston.format.label({ label: LOGGER_PREFIX }),
            winston.format.splat(),
            winston.format.align(),
            winston.format.timestamp(),
            winston.format.simple(),
            winston.format.colorize(),
            winston.format.printf(
              ({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`,
            ),
            winston.format.errors({ stack: true }),
          );

          this.logger = winston.createLogger({
            format: applicationLogFormatter,
            exitOnError: false,
            transports: [consoleLogTransport, infoLogTransport, errorLogTransport],
            exceptionHandlers: [consoleLogTransport, errorLogTransport],
          });
        },
      );
    }
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

    if (!this.logger) {
      throw new Error('Invalid logger instance!');
    }

    if (!process.env.DEBUG) {
      return;
    }

    const enhanced = this._enhanceMessage(this.scopes, message);
    this.logger.log('debug', enhanced, ...args);
  }

  info(message: string, ...args: any[]) {
    if (!this.logger) {
      throw new Error('Invalid logger instance!');
    }

    const enhanced = this._enhanceMessage(this.scopes, message);
    this.logger.log('info', enhanced, ...args);
  }

  error(message: string, ...args: any[]) {
    if (!this.logger) {
      throw new Error('Invalid logger instance!');
    }

    const enhanced = this._enhanceMessage(this.scopes, message);
    this.logger.log('error', enhanced, ...args);
  }
}
