import { type TAnyObject, type TRequestMethod } from '../common';
import { type IBaseLogger } from '../helpers';
interface IRequestOptions {
    url: string;
    method?: TRequestMethod;
    params?: object;
    body?: TAnyObject | null;
    configs?: object;
}
export declare class NetworkHelper {
    private readonly logger;
    private readonly name;
    constructor(logger: IBaseLogger, opts: {
        name: string;
        scopes?: string[];
    });
    getProtocol(url: string): "http" | "https";
    send(opts: IRequestOptions): Promise<Response>;
    get(opts: IRequestOptions): Promise<Response>;
    post(opts: IRequestOptions): Promise<Response>;
    put(opts: IRequestOptions): Promise<Response>;
    patch(opts: IRequestOptions): Promise<Response>;
    delete(opts: IRequestOptions): Promise<Response>;
}
export {};
