import type { TAnyObject, TRequestMethod } from '@/common';
import { LoggerFactory, type ApplicationLogger } from '@/helpers';
import { stringify } from '@/utilities';

const HTTP = 'http';
const HTTPS = 'https';

interface IRequestOptions {
  url: string;
  method?: TRequestMethod;
  params?: object;
  body?: TAnyObject | null;
  configs?: object;
}

// -------------------------------------------------------------
export class NetworkHelper {
  private readonly name: string;
  protected logger: ApplicationLogger | undefined;

  constructor(opts: { name: string; scopes?: string[] }) {
    const { name } = opts;
    this.name = name;
    void this.initializeLogger(opts.scopes ?? [NetworkHelper.name]);
  }

  private async initializeLogger(scopes: string[]) {
    this.logger = await LoggerFactory.getLogger(scopes);
    this.logger.info('[initializeLogger] Creating new network request worker instance! Name: %s', this.name);
  }

  getProtocol(url: string) {
    return url.startsWith('http:') ? HTTP : HTTPS;
  }

  // -------------------------------------------------------------
  // SEND REQUEST
  // -------------------------------------------------------------
  async send(opts: IRequestOptions) {
    const t = new Date().getTime();

    const { url, method = 'GET', params, body, configs } = opts;
    const props = {
      method,
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...configs,
    };

    let requestUrl = url;
    if (params) {
      requestUrl = `${url}?${stringify(params)}`;
    }

    this.logger?.info('[send] URL: %s | Props: %o', requestUrl, props);
    const response = await fetch(requestUrl, props);

    this.logger?.info('[network]][send] Took: %s(ms)', new Date().getTime() - t);
    return response;
  }

  // -------------------------------------------------------------
  // GET REQUEST
  // -------------------------------------------------------------
  async get(opts: IRequestOptions) {
    const { url, params, configs, ...rest } = opts;
    const response = await this.send({
      ...rest,
      url,
      method: 'GET',
      params,
      configs,
    });
    return response;
  }

  // -------------------------------------------------------------
  // POST REQUEST
  // -------------------------------------------------------------
  async post(opts: IRequestOptions) {
    const { url, body, configs, ...rest } = opts;
    const response = await this.send({
      ...rest,
      url,
      method: 'POST',
      body,
      configs,
    });
    return response;
  }

  // -------------------------------------------------------------
  async put(opts: IRequestOptions) {
    const { url, body, configs, ...rest } = opts;
    const response = await this.send({
      ...rest,
      url,
      method: 'PUT',
      body,
      configs,
      ...rest,
    });
    return response;
  }

  // -------------------------------------------------------------
  async patch(opts: IRequestOptions) {
    const { url, body, configs, ...rest } = opts;
    const response = await this.send({
      ...rest,
      url,
      method: 'PATCH',
      body,
      configs,
    });
    return response;
  }

  // -------------------------------------------------------------
  async delete(opts: IRequestOptions) {
    const { url, configs, ...rest } = opts;
    const response = await this.send({
      ...rest,
      url,
      method: 'DELETE',
      configs,
    });
    return response;
  }
}
