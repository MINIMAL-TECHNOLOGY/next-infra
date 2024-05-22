export type TAnyType = any;
export type TAnyObject = Record<string | symbol | number, any>;

export type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';

export interface IRequestProps {
  headers?: Record<string, string | number>;
  body?: TAnyObject | null;
  query?: TAnyObject;
}

export interface IParam {
  id?: string | number;
  method?: TRequestMethod;
  bodyType?: string;
  body?: TAnyObject;
  file?: FormData;
  query?: Record<string, string | number>;
  headers?: Record<string, string | number>;
  ids?: string[] | number[];
  data?: TAnyObject;
}
