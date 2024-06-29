import { type IParam } from '../../common';
import { NetworkHelper } from '../../helpers';
import { BaseDataProviderService, type IBaseRestRequestService } from '../../services';
export interface ILBDataProvider extends IBaseRestRequestService {
    getList: <T>(resource: string, params: Record<string, any>) => Promise<T>;
    getOne: <T>(resource: string, params: Record<string, any>) => Promise<T>;
    getMany: <T>(resource: string, params: Record<string, any>) => Promise<T>;
    getManyReference: <T>(resource: string, params: Record<string, any>) => Promise<T>;
    create: <T>(resource: string, params: IParam) => Promise<T>;
    update: <T>(resource: string, params: IParam) => Promise<T>;
    updateMany: <T>(resource: string, params: IParam) => Promise<T>;
    delete: <T>(resource: string, params: Record<string, any>) => Promise<T>;
    deleteMany: <T>(resource: string, params: IParam & Record<string, any>) => Promise<T>;
}
export declare class LBDataProviderService extends BaseDataProviderService implements ILBDataProvider {
    constructor(networkHelper: NetworkHelper, baseUrl: string);
    getList<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<T>;
    getOne<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<T>;
    getMany<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<T>;
    getManyReference<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<T>;
    create<T>(resource: string, params: IParam, baseUrl?: string): Promise<T>;
    update<T>(resource: string, params: IParam, baseUrl?: string): Promise<T>;
    updateMany<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<T>;
    delete<T>(resource: string, params: Record<string, any>, baseUrl?: string): Promise<T>;
    deleteMany<T>(resource: string, params: IParam & Record<string, any>, baseUrl?: string): Promise<T>;
}
