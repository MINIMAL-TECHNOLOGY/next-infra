import type { RequestTypes } from '../../common';
export interface IBaseResponseHandlerService {
    convertResponse: <T>(opts: {
        response: {
            status: number;
            data: any | any[];
            headers: Record<string, any>;
        };
        type: string;
        params: any;
    }) => T;
}
export declare class BaseResponseHandlerService implements IBaseResponseHandlerService {
    convertResponse<T>(opts: {
        response: {
            status: number;
            data: any | any[];
            headers: Record<string, any>;
        };
        type: RequestTypes;
        params: any;
    }): T;
}
