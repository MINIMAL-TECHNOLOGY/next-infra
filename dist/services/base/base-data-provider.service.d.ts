import { RequestTypes } from '../../common';
import type { IParam, IRequestProps, TRequestMethod } from '../../common/types';
import { NetworkHelper } from '../../helpers';
export interface IBaseRestRequestService {
    getRequestUrl: (opts: {
        baseUrl?: string;
        paths: string[];
    }) => string;
    getRequestProps: (params: IParam) => IRequestProps;
    doRequest: <T>(opts: IRequestProps & {
        baseUrl: string;
        type: string;
        method: TRequestMethod;
        paths: string[];
        params?: Record<string, any>;
    }) => Promise<T | Record<string, any>>;
    send: <T>(opts: {
        baseUrl?: string;
        resource: string;
        params: IParam;
    }) => Promise<T | Record<string, any>>;
}
export declare abstract class BaseDataProviderService implements IBaseRestRequestService {
    protected baseUrl: string | undefined;
    protected networkHelper: NetworkHelper;
    constructor(opts: {
        name?: string;
        baseUrl?: string;
        scopes?: string[];
    });
    getRequestProps(params: IParam): IRequestProps;
    getRequestUrl(opts: {
        baseUrl?: string;
        paths: string[];
    }): string;
    doRequest<T>(opts: IRequestProps & {
        baseUrl?: string;
        type: RequestTypes;
        method: TRequestMethod;
        paths: string[];
        params?: Record<string, any>;
    }): Promise<T | Record<string, any>>;
    send<T>(opts: {
        baseUrl?: string;
        resource: string;
        params: IParam;
    }): Promise<Record<string, any> | T>;
}
