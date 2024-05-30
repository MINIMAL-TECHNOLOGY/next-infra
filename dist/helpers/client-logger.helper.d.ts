import { type IBaseLogger } from '../helpers';
export declare class ClientLogger implements IBaseLogger {
    private scopes;
    private static instance;
    withScope(scope: string): this;
    static getInstance(): ClientLogger;
    getTimestamp(): string;
    generateLog(opts: {
        level: 'INFO' | 'DEBUG' | 'ERROR';
        message: string;
    }): string;
    info(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}
