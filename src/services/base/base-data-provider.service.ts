import { BindingKeys, RequestTypes } from '@/common';
import type { IParam, IRequestProps, TAnyObject, TRequestMethod } from '@/common/types';
import { NetworkHelper } from '@/helpers';
import { type BaseResponseHandlerService } from '@/services';
import { getError, isEmpty } from '@/utilities';
import { container } from 'tsyringe';

export interface IBaseRestRequestService {
  getRequestUrl: (opts: { baseUrl?: string; paths: string[] }) => string;
  getRequestProps: (params: IParam) => IRequestProps;
  doRequest: <T>(
    opts: IRequestProps & {
      baseUrl: string;
      type: string;
      method: TRequestMethod;
      paths: string[];
      params?: Record<string, any>;
    },
  ) => Promise<T | Record<string, any>>;
  send: <T>(opts: { baseUrl?: string; resource: string; params: IParam }) => Promise<T | Record<string, any>>;
}

// -------------------------------------------------------------
export abstract class BaseDataProviderService implements IBaseRestRequestService {
  protected baseUrl: string | undefined;
  protected networkHelper: NetworkHelper;

  constructor(opts: { name?: string; baseUrl?: string; scopes?: string[] }) {
    this.networkHelper = new NetworkHelper({
      name: opts.name ?? 'APPLICATION_NETWORK_SERVICE',
      scopes: opts.scopes,
    });

    this.baseUrl = opts.baseUrl;
  }

  // -------------------------------------------------------------
  // GET_REQUEST_PROPS
  // -------------------------------------------------------------
  getRequestProps(params: IParam): IRequestProps {
    const { bodyType: type, body, file, query, headers = {}, data } = params;

    const rs: IRequestProps = {
      headers,
      body: null,
      query,
    };

    switch (type) {
      case 'form': {
        rs.headers = {
          ...headers,
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        const formData = new FormData();

        for (const key in body) {
          if (!params.body?.[key]) {
            continue;
          }
          formData.append(key, `${body[key]}`);
        }
        rs.body = formData;
        break;
      }
      case 'file': {
        rs.headers = { ...headers };

        rs.body = file;
        break;
      }
      default: {
        rs.headers = {
          ...headers,
          'Content-Type': 'application/json',
        };
        rs.body = { ...data, ...body };
        break;
      }
    }

    return rs;
  }

  // -------------------------------------------------------------
  // GET_REQUEST_URL
  // -------------------------------------------------------------
  getRequestUrl(opts: { baseUrl?: string; paths: string[] }) {
    let baseUrl = opts?.baseUrl;
    const paths = opts?.paths ?? [];

    if (!baseUrl || isEmpty(baseUrl)) {
      throw getError({
        statusCode: 500,
        message: '[getRequestUrl] Invalid configuration for third party request base url!',
      });
    }

    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1); // Remove / at the end
    }

    const joined = paths
      .map((path: string) => {
        if (!path.startsWith('/')) {
          path = `/${path}`; // Add / to the start of url path
        }

        return path;
      })
      .join('');

    return `${baseUrl}${joined}`;
  }

  // -------------------------------------------------------------
  // DO_REQUEST
  // -------------------------------------------------------------
  async doRequest<T>(
    opts: IRequestProps & {
      baseUrl?: string;
      type: RequestTypes;
      method: TRequestMethod;
      paths: string[];
      params?: Record<string, any>;
    },
  ): Promise<T | Record<string, any>> {
    const { type, baseUrl, method, paths, body, headers, query, params } = opts;

    if (!baseUrl || isEmpty(baseUrl)) {
      throw getError({ message: '[doRequest] Invalid baseUrl to send request!' });
    }

    const url = this.getRequestUrl({ baseUrl, paths });

    // Fetch API: Request with GET/HEAD method cannot have body
    const bodyOpts = method === 'GET' ? undefined : body;

    return await new Promise((resolve, reject) => {
      this.networkHelper
        .send({
          url,
          method,
          params: query,
          body: bodyOpts,
          configs: { headers },
        })
        .then(async rs => {
          const status = rs.status;

          // Handle error response and status 204
          if (status < 200 || status >= 300) {
            return await rs.text().then(text => {
              const json = JSON.parse(text);
              throw new Error(`${json?.error?.message}`);
            });
          } else if (status === 204) {
            resolve({});
          }

          if ([rs.headers?.get('content-type'), rs.headers?.get('Content-Type')].includes('application/octet-stream')) {
            return await rs.blob().then(blob => {
              return { data: blob, headers: rs.headers ?? {} };
            });
          }

          return await rs.json().then(data => {
            return { data, headers: rs.headers ?? {} };
          });
        })
        .then(async response => {
          const responseHandlerService = container.resolve<BaseResponseHandlerService>(
            BindingKeys.RESPONSE_HANDLER_DATA_PROVIDER,
          );
          const normalized = responseHandlerService.convertResponse<T>({ response, type, params });
          resolve(normalized);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // -------------------------------------------------------------
  // SEND
  // -------------------------------------------------------------
  async send<T>(opts: { baseUrl?: string; resource: string; params: IParam }) {
    if (!opts?.params?.method) {
      throw getError({
        message: '[send] Invalid http method to send request!',
      });
    }

    const { method, ...rest } = opts.params;
    const request: TAnyObject = this.getRequestProps(rest);
    const paths = [opts.resource];

    const response = await this.doRequest<T>({
      type: RequestTypes.SEND,
      baseUrl: opts.baseUrl,
      method,
      paths,
      params: opts.params,
      ...request,
    });
    return response;
  }
}
