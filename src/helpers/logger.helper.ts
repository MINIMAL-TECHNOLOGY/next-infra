/* eslint-disable @typescript-eslint/no-unsafe-argument */
import isEmpty from 'lodash/isEmpty';

const LOG_ENVIRONMENTS = new Set(['development', 'alpha', 'beta', 'staging']);
const LOGGER_PREFIX = process.env.NEXT_PUBLIC_APP_ENV_APPLICATION_NAME ?? 'next-infra';

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
    if (typeof window !== 'undefined') {
      this.applicationLogger = {
        log: (level: 'log' | 'info' | 'warn' | 'error', message: string, ...args: any[]): void => {
          if (typeof message === 'string') {
            const formattedMessage = message
              .replace(/%[sd]/g, match => {
                if (args.length === 0) {
                  return match;
                }
                const arg = args.shift();
                switch (match) {
                  case '%s':
                    return String(arg);
                  case '%d':
                    return String(Number(arg));
                  default:
                    return match;
                }
              })
              .replace(/%o/g, () => {
                if (args.length === 0) {
                  return '%o';
                }
                const arg = args.shift();
                return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
              });

            const method = console[level] || console.log;
            method(formattedMessage);
          } else {
            const method = console[level] || console.log;
            method(message, ...args);
          }
        },
      };
      return;
    }

    const winston = await this.importModules();

    const transports = {
      Console: winston.transports.Console,
      DailyRotateFile: winston.transports.DailyRotateFile,
    };
    const format = winston.format;

    const LOGGER_FOLDER_PATH = process.env.APP_ENV_LOGGER_FOLDER_PATH ?? './app_data/logs';

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
