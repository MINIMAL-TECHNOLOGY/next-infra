import { BaseResponseHandlerService } from '@/services';
export interface ILBResponseHandlerService {
    handleCreate: <T>(opts: {
        data: any | any[];
        params: any;
    }) => T;
    handleGetListAndGetManyReference: <T>(opts: {
        data: any | any[];
        headers: Record<string, any>;
    }) => T;
}
export declare class LBResponseHandlerService extends BaseResponseHandlerService implements ILBResponseHandlerService {
    handleCreate<T>(opts: {
        data: any | any[];
        params: any;
    }): T;
    handleGetListAndGetManyReference<T>(opts: {
        data: any | any[];
        headers: Record<string, any>;
    }): T;
    convertResponse<T>(opts: {
        response: {
            data: any | any[];
            headers: Record<string, any>;
        };
        type: string;
        params: any;
    }): T;
}
