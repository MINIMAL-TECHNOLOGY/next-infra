import { RequestTypes } from '@/common';
import type { IParam, IRequestProps, TRequestMethod } from '@/common/types';
import { NetworkHelper } from '@/helpers';
export interface IBaseRestRequestService {
    changeBaseUrl: (baseUrl: string) => void;
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
    }) => Promise<T>;
    send: <T>(opts: {
        baseUrl?: string;
        resource: string;
        params: IParam;
    }) => Promise<T>;
}
export declare class BaseDataProviderService implements IBaseRestRequestService {
    private readonly networkHelper;
    private baseUrl;
    constructor(networkHelper: NetworkHelper, baseUrl: string);
    changeBaseUrl(baseUrl: string): void;
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
    }): Promise<T>;
    send<T>(opts: {
        baseUrl?: string;
        resource: string;
        params: IParam;
    }): Promise<T>;
}
