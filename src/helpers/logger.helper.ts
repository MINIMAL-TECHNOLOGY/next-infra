/* eslint-disable @typescript-eslint/no-unsafe-argument */
import isEmpty from 'lodash/isEmpty';

const LOGGER_FOLDER_PATH = process.env.APP_ENV_LOGGER_FOLDER_PATH ?? './app_data/logs';
const LOG_ENVIRONMENTS = new Set(['development', 'alpha', 'beta', 'staging']);
const LOGGER_PREFIX = process.env.APP_ENV_APPLICATION_NAME ?? 'next-infra';

export class ApplicationLogger {
  private applicationLogger: any;

  private scopes: string[] = [];
  readonly _environment: string | undefined;

  constructor() {
    this._environment = process.env.NODE_ENV;
  }

  private async importModules() {
    const importCode = `
      const winston = await import('winston');
      await import('winston-daily-rotate-file');
      return winston;
    `;
    // eslint-disable-next-line no-eval
    return eval(`(async () => {${importCode}})()`);
  }

  async initialize() {
    if (typeof window === 'undefined') {
      const winston = await this.importModules();

      const transports = {
        Console: winston.transports.Console,
        DailyRotateFile: winston.transports.DailyRotateFile,
      };
      const format = winston.format;

      const consoleLogTransport = new transports.Console({
        level: 'debug',
      });
      const infoLogTransport = new transports.DailyRotateFile({
        frequency: '1h',
        maxSize: '100m',
        maxFiles: '5d',
        datePattern: 'YYYYMMDD_HH',
        filename: `${LOGGER_FOLDER_PATH}/${LOGGER_PREFIX}-info-%DATE%.log`,
        level: 'info',
      });

      const errorLogTransport = new transports.DailyRotateFile({
        frequency: '1h',
        maxSize: '100m',
        maxFiles: '5d',
        datePattern: 'YYYYMMDD_HH',
        filename: `${LOGGER_FOLDER_PATH}/${LOGGER_PREFIX}-error-%DATE%.log`,
        level: 'error',
      });

      const applicationLogFormatter = format.combine(
        format.label({ label: LOGGER_PREFIX }),
        format.splat(),
        format.align(),
        format.timestamp(),
        format.simple(),
        format.colorize(),
        format.printf((info: { level: string; message: string; label: string; timestamp: string }) => {
          const { level, message, label, timestamp } = info;
          return `${timestamp} [${label}] ${level}: ${message}`;
        }),
        format.errors({ stack: true }),
      );

      this.applicationLogger = winston.createLogger({
        format: applicationLogFormatter,
        exitOnError: false,
        transports: [consoleLogTransport, infoLogTransport, errorLogTransport],
        exceptionHandlers: [consoleLogTransport, errorLogTransport],
      });
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

    if (!this.applicationLogger) {
      return;
    }

    if (!process.env.DEBUG) {
      return;
    }

    const enhanced = this._enhanceMessage(this.scopes, message);
    this.applicationLogger.log('debug', enhanced, ...args);
  }

  info(message: string, ...args: any[]) {
    if (!this.applicationLogger) {
      return;
    }

    const enhanced = this._enhanceMessage(this.scopes, message);
    this.applicationLogger.log('info', enhanced, ...args);
  }

  error(message: string, ...args: any[]) {
    if (!this.applicationLogger) {
      return;
    }

    const enhanced = this._enhanceMessage(this.scopes, message);
    this.applicationLogger.log('error', enhanced, ...args);
  }
}

export class LoggerFactory {
  static async getLogger(scopes: string[]): Promise<ApplicationLogger> {
    const logger = new ApplicationLogger();
    await logger.initialize();
    logger.withScope(scopes.join('-'));
    return logger;
  }
}
