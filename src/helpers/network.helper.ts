import { type TAnyObject, type TRequestMethod } from '@/common';
import { stringify } from '@/utilities';
import { injectable } from 'tsyringe';

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
@injectable()
export class NetworkHelper {
  getProtocol(url: string) {
    return url.startsWith('http:') ? HTTP : HTTPS;
  }

  // -------------------------------------------------------------
  // SEND REQUEST
  // -------------------------------------------------------------
  async send(opts: IRequestOptions) {
    const { url, method = 'GET', params, body, configs } = opts;
    const props = {
      method,
      body: JSON.stringify(body),
      ...configs,
    };

    let requestUrl = url;
    if (params) {
      requestUrl = `${url}?${stringify(params)}`;
    }

    const response = await fetch(requestUrl, props);

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
