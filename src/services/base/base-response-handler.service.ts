import type { RequestTypes } from '@/common';

export interface IBaseResponseHandlerService {
  convertResponse: <T>(opts: {
    response: { data: any | any[]; headers: Record<string, any> };
    type: string;
    params: any;
  }) => T;
}

export class BaseResponseHandlerService implements IBaseResponseHandlerService {
  convertResponse<T>(opts: {
    response: { data: any | any[]; headers: Record<string, any> };
    type: RequestTypes;
    params: any;
  }): T {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return { data: opts.response.data } as T;
  }
}
