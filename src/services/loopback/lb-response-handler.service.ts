/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { RequestTypes } from '@/common';
import { BaseResponseHandlerService, type IBaseResponseHandlerService } from '@/services';
import { getError } from '@/utilities';
import { container, singleton } from 'tsyringe';

export interface ILBResponseHandlerService extends IBaseResponseHandlerService {
  handleCreate: <T>(opts: { status: number; data: any | any[]; params: any }) => T;
  handleGetListAndGetManyReference: <T>(opts: { status: number; data: any | any[]; headers: Record<string, any> }) => T;
}

@singleton()
export class LBResponseHandlerService extends BaseResponseHandlerService implements ILBResponseHandlerService {
  handleCreate<T>(opts: { status: number; data: any | any[]; params: any }): T {
    let rs: any = { id: opts.data?.id };

    switch (opts.params?.type) {
      case 'file': {
        rs = { ...rs, files: opts.data };
        break;
      }
      default: {
        rs = { ...opts.data, id: opts.data.id };
        break;
      }
    }

    return { statusCode: opts.status, data: rs } as T;
  }

  handleGetListAndGetManyReference<T>(opts: { status: number; data: any | any[]; headers: Record<string, any> }): T {
    // content-range: <unit> <range-start>-<range-end>/<size>
    const contentRange: string | undefined = opts.headers?.get('content-range') || opts.headers?.get['Content-Range'];

    if (!contentRange) {
      throw getError({
        message:
          'Missing "Content-Range" header in the HTTP Response. The REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. In case CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?',
      });
    }

    const d = opts.data ?? [];

    return {
      statusCode: opts.status,
      data: d,
      total: parseInt(contentRange.split('/').pop() ?? '0', 10) || d.length,
    } as T;
  }

  convertResponse<T>(opts: {
    response: { status: number; data: any | any[]; headers: Record<string, any> };
    type: string;
    params: any;
  }): T {
    const {
      response: { data, headers, status },
      type,
      params,
    } = opts;

    switch (type) {
      case RequestTypes.GET_LIST:
      case RequestTypes.GET_MANY_REFERENCE: {
        return this.handleGetListAndGetManyReference({ status, data, headers });
      }
      case RequestTypes.CREATE: {
        return this.handleCreate({ status, data, params });
      }
      case RequestTypes.DELETE: {
        return {
          statusCode: status,
          data: { ...data, id: params.id },
        } as T;
      }
      default: {
        return { statusCode: status, data, headers } as T;
      }
    }
  }
}

container.register(LBResponseHandlerService.name, { useClass: LBResponseHandlerService });
