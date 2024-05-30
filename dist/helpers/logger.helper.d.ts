export interface IBaseLogger {
    withScope: (scope: string) => IBaseLogger;
    debug: (message: string, ...args: any[]) => void;
    info: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
}
export declare class LoggerFactory {
    static getLogger(scopes: string[], isClient?: boolean): IBaseLogger;
}
