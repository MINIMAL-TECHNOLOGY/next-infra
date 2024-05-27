import { type IParam, type TAnyObject } from '../../common';
import { NetworkHelper } from '../../helpers';
import { BaseDataProviderService, type IBaseRestRequestService } from '../../services';
export interface ILBDataProvider extends IBaseRestRequestService {
    getList: <T>(resource: string, params: Record<string, any>) => Promise<T | TAnyObject>;
    getOne: <T>(resource: string, params: Record<string, any>) => Promise<T | TAnyObject>;
    getMany: <T>(resource: string, params: Record<string, any>) => Promise<T | TAnyObject>;
    getManyReference: <T>(resource: string, params: Record<string, any>) => Promise<T | TAnyObject>;
    create: <T>(resource: string, params: IParam) => Promise<T | TAnyObject>;
    update: <T>(resource: string, params: IParam) => Promise<T | TAnyObject>;
    updateMany: <T>(resource: string, params: IParam) => Promise<T | TAnyObject>;
    delete: <T>(resource: string, params: Record<string, any>) => Promise<T | TAnyObject>;
    deleteMany: <T>(resource: string, params: IParam & Record<string, any>) => Promise<T | TAnyObject>;
}
export declare class LBDataProviderService extends BaseDataProviderService implements ILBDataProvider {
    constructor(networkHelper: NetworkHelper, baseUrl: string);
    getList<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<Record<string, any> | T>;
    getOne<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<Record<string, any> | T>;
    getMany<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<Record<string, any> | T>;
    getManyReference<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<Record<string, any> | T>;
    create<T>(resource: string, params: IParam, baseUrl?: string): Promise<Record<string, any> | T>;
    update<T>(resource: string, params: IParam, baseUrl?: string): Promise<Record<string, any> | T>;
    updateMany<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<Record<string, any> | T>;
    delete<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<Record<string, any> | T>;
    deleteMany<T>(resource: string, params: IParam & Record<string, any>, baseUrl?: string): Promise<Record<string, any> | T | {
        data: any[];
    }>;
}
