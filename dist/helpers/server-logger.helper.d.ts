import { type Logform } from 'winston';
import 'winston-daily-rotate-file';
export declare const applicationLogFormatter: Logform.Format;
export declare const applicationLogger: import("winston").Logger;
export interface IBaseLogger {
    withScope: (scope: string) => IBaseLogger;
    debug: (message: string, ...args: any[]) => void;
    info: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
}
export declare class ApplicationLogger implements IBaseLogger {
    private scopes;
    readonly _environment: string | undefined;
    constructor();
    withScope(scope: string): this;
    private _enhanceMessage;
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}