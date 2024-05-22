import type { RequestTypes } from '@/common';

export interface IBaseResponseHandlerService {
  convertResponse: <T>(opts: {
    response: { data: any | any[]; headers: Record<string, any> };
    type: string;
    params: any;
  }) => T;
}

export abstract class BaseResponseHandlerService implements IBaseResponseHandlerService {
  abstract convertResponse<T>(opts: {
    response: { data: any | any[]; headers: Record<string, any> };
    type: RequestTypes;
    params: any;
  }): T;
}
