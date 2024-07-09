import { BaseResponseHandlerService, type IBaseResponseHandlerService } from '../../services';
export interface ILBResponseHandlerService extends IBaseResponseHandlerService {
    handleCreate: <T>(opts: {
        status: number;
        data: any | any[];
        params: any;
    }) => T;
    handleGetListAndGetManyReference: <T>(opts: {
        status: number;
        data: any | any[];
        headers: Record<string, any>;
    }) => T;
}
export declare class LBResponseHandlerService extends BaseResponseHandlerService implements ILBResponseHandlerService {
    handleCreate<T>(opts: {
        status: number;
        data: any | any[];
        params: any;
    }): T;
    handleGetListAndGetManyReference<T>(opts: {
        status: number;
        data: any | any[];
        headers: Record<string, any>;
    }): T;
    convertResponse<T>(opts: {
        response: {
            status: number;
            data: any | any[];
            headers: Record<string, any>;
        };
        type: string;
        params: any;
    }): T;
}
