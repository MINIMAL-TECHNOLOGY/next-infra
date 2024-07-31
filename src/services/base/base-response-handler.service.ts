import type { RequestTypes } from '@/common';
import { container, injectable } from 'tsyringe';

export interface IBaseResponseHandlerService {
  convertResponse: <T>(opts: {
    response: { status: number; data: any | any[]; headers: Record<string, any> };
    type: string;
    params: any;
  }) => T;
}

@injectable()
export class BaseResponseHandlerService implements IBaseResponseHandlerService {
  convertResponse<T>(opts: {
    response: { status: number; data: any | any[]; headers: Record<string, any> };
    type: RequestTypes;
    params: any;
  }): T {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return { statusCode: opts.response.status, data: opts.response.data, headers: opts.response.headers } as T;
  }
}

container.register(BaseResponseHandlerService.name, { useClass: BaseResponseHandlerService });
