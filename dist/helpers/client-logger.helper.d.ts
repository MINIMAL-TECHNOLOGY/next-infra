import { type IBaseLogger } from '../helpers';
export declare class ClientLogger implements IBaseLogger {
    private scopes;
    withScope(scope: string): this;
    getTimestamp(): string;
    generateLog(opts: {
        level: 'INFO' | 'DEBUG' | 'ERROR';
        message: string;
    }): string;
    info(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}
