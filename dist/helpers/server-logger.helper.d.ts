import { type IBaseLogger } from '../helpers';
export declare class ServerLogger implements IBaseLogger {
    private scopes;
    readonly _environment: string | undefined;
    private logger;
    constructor();
    withScope(scope: string): this;
    private _enhanceMessage;
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}
