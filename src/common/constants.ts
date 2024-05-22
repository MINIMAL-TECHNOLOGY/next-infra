export class RequestTypes {
  static readonly SEND = 'SEND';

  // Loopback
  static readonly GET_LIST = 'GET_LIST';
  static readonly GET_ONE = 'GET_ONE';
  static readonly GET_MANY = 'GET_MANY';
  static readonly GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
  static readonly CREATE = 'CREATE';
  static readonly UPDATE = 'UPDATE';
  static readonly UPDATE_MANY = 'UPDATE_MANY';
  static readonly DELETE = 'DELETE';
  static readonly DELETE_MANY = 'DELETE_MANY';
}

export class DataProviders {
  static readonly LOOPBACK = 'loopback';
  static readonly SCHEME_SET = new Set([this.LOOPBACK]);

  static isValid(scheme: string): boolean {
    return this.SCHEME_SET.has(scheme);
  }
}
