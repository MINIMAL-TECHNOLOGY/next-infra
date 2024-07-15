import { BindingKeys, RequestTypes, type IParam } from '@/common';
import { BaseDataProviderService, type IBaseRestRequestService } from '@/services';
import { getError } from '@/utilities';
import { omit } from '@/utilities/lodash.utility';
import { container, inject, injectable } from 'tsyringe';

// -------------------------------------------------------------
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

@injectable()
export class LBDataProviderService extends BaseDataProviderService implements ILBDataProvider {
  constructor(@inject(BindingKeys.APPLICATION_SEND_BASE_URL) baseUrl: string) {
    super(baseUrl);
  }

  // -------------------------------------------------------------
  // GET_LIST
  // -------------------------------------------------------------
  async getList<T>(resource: string, params: Record<string, any>, baseUrl?: string) {
    const { pagination, sort, filter: filterGetList, meta, ...rest } = params;

    let filter: Record<string, any> = {};

    if (filterGetList?.where) {
      filter = { ...filterGetList, where: { ...filterGetList.where } };
    } else {
      filter.where = {
        ...omit(filterGetList, ['include', 'params', 'noLimit', 'fields']),
      };
      filter.include = filterGetList?.include;
      filter.fields = filterGetList?.fields;
      filter.params = filterGetList?.params;
      filter.noLimit = filterGetList?.noLimit;
    }

    if (sort?.field) {
      filter.order = [`${sort.field} ${sort.order}`];
    }

    // Remove default limit and skip in react-admin
    if (filter?.noLimit) {
      filter.limit = undefined;
      filter.skip = undefined;
      filter.offset = undefined;
      filter.noLimit = undefined;
    } else {
      const { page = 0, perPage = 0 } = pagination;

      if (perPage >= 0) {
        filter.limit = perPage;
      }

      if (perPage > 0 && page >= 0) {
        filter.skip = (page - 1) * perPage;
        filter.offset = (page - 1) * perPage;
      }
    }

    for (const key in rest) {
      // remove headers in query
      if (!params[key] || key === 'headers') {
        continue;
      }

      filter[key] = params[key];
    }

    const rootQuery: Record<string, any> = {};

    if (filter?.params) {
      for (const key in filter.params) {
        rootQuery[key] = filter.params[key];
      }
      filter.params = undefined;
    }

    if (meta) {
      for (const key in meta) {
        if (meta?.queryRefetch) {
          continue;
        }
        rootQuery[key] = meta[key];
      }
      filter.params = undefined;
    }

    const request = this.getRequestProps(params);

    const paths = [resource];

    const response = await this.doRequest<T>({
      type: RequestTypes.GET_LIST,
      method: 'GET',
      baseUrl,
      ...request,
      query: { filter, ...rootQuery },
      paths,
      params,
    });
    return response;
  }

  // -------------------------------------------------------------
  // GET_ONE
  // -------------------------------------------------------------
  async getOne<T>(resource: string, params: Record<string, any>, baseUrl?: string) {
    const request = this.getRequestProps(params);

    const filter = params?.meta?.filter || {};

    const rootQuery: Record<string, any> = {};

    if (filter?.params) {
      for (const key in filter.params) {
        rootQuery[key] = filter.params[key];
      }
    }

    const paths = [resource, `${params.id}`];
    const response = await this.doRequest<T>({
      type: RequestTypes.GET_ONE,
      method: 'GET',
      baseUrl,
      ...request,
      query: { filter: { ...omit(filter, 'params') }, ...rootQuery },
      paths,
      params,
    });
    return response;
  }

  // -------------------------------------------------------------
  // GET_MANY
  // -------------------------------------------------------------
  async getMany<T>(resource: string, params: Record<string, any>, baseUrl?: string) {
    const ids = params?.ids?.map((id: string | number) => id) || [];
    const request = this.getRequestProps(params);

    const filter: Record<string, any> = {};

    if (ids?.length > 0) {
      filter.where = { id: { inq: ids } };
    }

    const paths = [resource];
    const response = await this.doRequest<T>({
      type: RequestTypes.GET_MANY,
      method: 'GET',
      baseUrl,
      ...request,
      query: { filter },
      paths,
      params,
    });
    return response;
  }

  // -------------------------------------------------------------
  // GET_MANY_REFERENCE
  // -------------------------------------------------------------
  async getManyReference<T>(resource: string, params: Record<string, any>, baseUrl?: string) {
    const { pagination = {}, sort = {}, filter: filterGetMany, target, id, ...rest } = params;

    let filter: Record<string, any> = {};

    if (filterGetMany?.where) {
      filter = { ...filterGetMany, where: { ...filterGetMany.where } };
    } else {
      filter.where = {
        ...omit(filterGetMany, 'include', 'params', 'noLimit', 'fields'),
      };
      filter.include = filterGetMany?.include;
      filter.fields = filterGetMany?.fields;
      filter.params = filterGetMany?.params;
      filter.noLimit = filterGetMany?.noLimit;
    }

    filter.where[target] = id;

    if (sort?.field) {
      filter.order = [`${sort.field} ${sort.order}`];
    }

    // Remove default limit and skip in react-admin
    if (filter?.noLimit) {
      filter.limit = undefined;
      filter.skip = undefined;
      filter.offset = undefined;
      filter.noLimit = undefined;
    } else {
      const { page = 0, perPage = 0 } = pagination;

      if (perPage >= 0) {
        filter.limit = perPage;
      }

      if (perPage > 0 && page >= 0) {
        filter.skip = (page - 1) * perPage;
        filter.offset = (page - 1) * perPage;
      }
    }

    for (const key in rest) {
      if (!params[key] || key === 'headers') {
        continue;
      }

      filter[key] = params[key];
    }

    const rootQuery: Record<string, any> = {};

    if (filter?.params) {
      for (const key in filter.params) {
        rootQuery[key] = filter.params[key];
      }
      filter.params = undefined;
    }

    const request = this.getRequestProps(params);

    const paths = [resource];

    const response = await this.doRequest<T>({
      type: RequestTypes.GET_MANY_REFERENCE,
      method: 'GET',
      baseUrl,
      ...request,
      query: { filter, ...rootQuery },
      paths,
      params,
    });
    return response;
  }

  // -------------------------------------------------------------
  // CREATE
  // -------------------------------------------------------------
  async create<T>(resource: string, params: IParam, baseUrl?: string) {
    const request = this.getRequestProps(params);

    const paths = [resource];

    const response = await this.doRequest<T>({
      type: RequestTypes.CREATE,
      method: 'POST',
      paths,
      params,
      baseUrl,
      ...request,
    });
    return response;
  }

  // -------------------------------------------------------------
  // UPDATE
  // -------------------------------------------------------------
  async update<T>(resource: string, params: IParam, baseUrl?: string) {
    const request = this.getRequestProps(params);

    const paths = [resource, params?.id ? `${params.id}` : ''];

    const response = await this.doRequest<T>({
      type: RequestTypes.UPDATE,
      baseUrl,
      method: 'PATCH',
      paths,
      params,
      ...request,
    });
    return response;
  }

  // -------------------------------------------------------------
  // UPDATE_MANY
  // -------------------------------------------------------------
  async updateMany<T>(resource: string, params: Record<string, any>, baseUrl?: string) {
    const { ids = [], data = {} } = params;

    if (!ids?.length) {
      throw getError({ message: '[updateMany] No IDs to execute update!' });
    }

    const query: Record<string, any> = {
      filter: { where: { id: { inq: ids } } },
    };

    const paths = [resource];
    const response = await this.doRequest<T>({
      type: RequestTypes.UPDATE_MANY,
      baseUrl,
      method: 'PATCH',
      paths,
      params,
      query,
      body: data,
    });
    return response;
  }

  // -------------------------------------------------------------
  // DELETE
  // -------------------------------------------------------------
  async delete<T>(resource: string, params: Record<string, any>, baseUrl?: string) {
    const request = this.getRequestProps(params);

    const paths = [resource, `${params.id}`];
    const response = await this.doRequest<T>({
      type: RequestTypes.DELETE,
      baseUrl,
      method: 'DELETE',
      paths,
      params,
      ...request,
    });
    return response;
  }

  // -------------------------------------------------------------
  // DELETE_MANY
  // -------------------------------------------------------------
  async deleteMany<T>(resource: string, params: IParam & Record<string, any>, baseUrl?: string) {
    const { ids = [], meta } = params;

    if (!ids?.length) {
      throw getError({ message: '[deleteMany] No IDs to execute delete!' });
    }

    if (!meta?.isDeleteOne) {
      const request = this.getRequestProps({
        ...omit(params, ['ids']),
        body: { ids },
      });

      const paths = [resource];
      const response = await this.doRequest<T>({
        type: RequestTypes.DELETE_MANY,
        baseUrl,
        method: 'DELETE',
        paths,
        params,
        ...request,
      });
      return response;
    }

    const request = this.getRequestProps(params);

    const arrayPaths = ids.map((id: string | number) => {
      return [resource, `${id}`];
    });

    const doMultipleRequests = arrayPaths.map(async (paths: string[]) => {
      const requestResult = await this.doRequest<T>({
        type: RequestTypes.DELETE_MANY,
        baseUrl,
        method: 'DELETE',
        paths,
        params,
        ...request,
      });

      return requestResult;
    });

    const responses = await Promise.all(doMultipleRequests);

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
      data: responses.map((response: any) => response.data),
    } as T;
  }
}

container.register(LBDataProviderService.name, { useClass: LBDataProviderService });
