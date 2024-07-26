import { BindingKeys, NextPublicEnv, RequestTypes } from '@/common';
import type { IParam, IRequestProps, TRequestMethod } from '@/common/types';
import { NetworkHelper } from '@/helpers';
import { type BaseResponseHandlerService } from '@/services';
import { getError, isClientSideRendering, isEmpty } from '@/utilities';
import { container, inject, injectable } from 'tsyringe';

export interface IBaseRestRequestService {
  setDefaultHeaders: (headers: Record<string, any>) => void;
  changeBaseUrl: (baseUrl: string) => void;
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
  ) => Promise<T>;
  send: <T>(opts: { baseUrl?: string; resource: string; params: IParam }) => Promise<T>;
}

// -------------------------------------------------------------
type TExtendedError = Error & { code?: number };

@injectable()
export class BaseDataProviderService implements IBaseRestRequestService {
  private readonly networkHelper: NetworkHelper;
  private defaultHeaders: Record<string, any> = {};

  constructor(@inject(BindingKeys.APPLICATION_SEND_BASE_URL) private baseUrl: string) {
    this.networkHelper = new NetworkHelper({
      name: 'NEXT_INFRA_NETWORK_SERVICE',
    });
  }

  // -------------------------------------------------------------
  // SET_DEFAULT_HEADERS
  // -------------------------------------------------------------
  setDefaultHeaders(headers: Record<string, any>) {
    this.defaultHeaders = headers;
  }

  // -------------------------------------------------------------
  // CHANGE_BASE_URL
  // -------------------------------------------------------------
  changeBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // -------------------------------------------------------------
  // GET_REQUEST_PROPS
  // -------------------------------------------------------------
  getRequestProps(params: IParam): IRequestProps {
    const { bodyType: type, body, file, query, headers = {}, data, cache } = params;

    const rs: IRequestProps = {
      headers,
      body: null,
      query,
      cache,
    };

    rs.headers = { ...this.defaultHeaders, ...headers };

    switch (type) {
      case 'form': {
        rs.headers = {
          ...rs.headers,
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
        rs.body = file;
        break;
      }
      default: {
        rs.headers = {
          ...rs.headers,
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
  ): Promise<T> {
    const { type, baseUrl = this.baseUrl, method, paths, body, headers, cache, query, params } = opts;

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
          configs: { headers, ...(cache && { cache }) },
        })
        .then(async rs => {
          const status = rs.status;

          // Handle error response and status 204
          if (status < 200 || status >= 300) {
            return await rs.text().then(text => {
              const json = JSON.parse(text);
              const err: TExtendedError = new Error(`${json?.error?.message}`);
              err.code = status;

              throw err;
            });
          } else if (status === 204) {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            resolve({ status: 204, data: {} } as T);
          }

          if ([rs.headers?.get('content-type'), rs.headers?.get('Content-Type')].includes('application/octet-stream')) {
            return await rs.blob().then(blob => {
              return { status: rs.status, data: blob, headers: rs.headers ?? {} };
            });
          } else if (
            [rs.headers?.get('content-type'), rs.headers?.get('Content-Type')].includes('binary/octet-stream')
          ) {
            return await rs.blob().then(blob => {
              let data: Blob | {} = blob;
              if (isClientSideRendering()) {
                try {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download =
                    rs.headers.get('Normalizename') ?? `${NextPublicEnv.NEXT_PUBLIC_APP_ENV_APPLICATION_NAME}-download`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);

                  data = {};
                } catch (error) {
                  console.error('Failed to download file:', error);
                  throw error;
                }
              }
              return { status: rs.status, data, headers: rs.headers ?? {} };
            });
          }

          return await rs.json().then(data => {
            return { status: rs.status, data, headers: rs.headers ?? {} };
          });
        })
        .then(async response => {
          const responseHandlerService = container.resolve<BaseResponseHandlerService>(
            BindingKeys.NEXT_DATA_PROVIDER_HANDLER,
          );
          const normalized = responseHandlerService.convertResponse<T>({ response, type, params });
          resolve(normalized);
        })
        .catch(error => {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
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
    const request = this.getRequestProps(rest);
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

container.register(BaseDataProviderService.name, { useClass: BaseDataProviderService });
