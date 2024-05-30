/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type IBaseLogger } from '@/helpers';
import { getError } from '@/utilities';

const applicationLogger = console;

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