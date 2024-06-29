export declare class ApplicationLogger {
    private applicationLogger;
    private scopes;
    readonly _environment: string | undefined;
    constructor();
    private importWinstonModules;
    private initializeClientLogger;
    private initializeServerLogger;
    initialize(): Promise<void>;
    withScope(scope: string): this;
    private _enhanceMessage;
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}
export declare class LoggerFactory {
    static getLogger(scopes: string[]): Promise<ApplicationLogger>;
}
