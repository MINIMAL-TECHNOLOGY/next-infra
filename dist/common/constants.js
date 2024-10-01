"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextPublicEnv = exports.DataProviders = exports.RequestTypes = void 0;
var RequestTypes = /** @class */ (function () {
    function RequestTypes() {
    }
    RequestTypes.SEND = 'SEND';
    // Loopback
    RequestTypes.GET_LIST = 'GET_LIST';
    RequestTypes.GET_ONE = 'GET_ONE';
    RequestTypes.GET_MANY = 'GET_MANY';
    RequestTypes.GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
    RequestTypes.CREATE = 'CREATE';
    RequestTypes.UPDATE = 'UPDATE';
    RequestTypes.UPDATE_MANY = 'UPDATE_MANY';
    RequestTypes.DELETE = 'DELETE';
    RequestTypes.DELETE_MANY = 'DELETE_MANY';
    return RequestTypes;
}());
exports.RequestTypes = RequestTypes;
var DataProviders = /** @class */ (function () {
    function DataProviders() {
    }
    DataProviders.isValid = function (scheme) {
        return this.SCHEME_SET.has(scheme);
    };
    var _a;
    _a = DataProviders;
    DataProviders.LOOPBACK = 'loopback';
    DataProviders.BASE = 'base';
    DataProviders.SCHEME_SET = new Set([_a.LOOPBACK, _a.BASE]);
    return DataProviders;
}());
exports.DataProviders = DataProviders;
var NextPublicEnv = /** @class */ (function () {
    function NextPublicEnv() {
    }
    var _b, _c;
    NextPublicEnv.NEXT_PUBLIC_APP_ENV_SEND_BASE_URL = process.env.NEXT_PUBLIC_APP_ENV_SEND_BASE_URL;
    NextPublicEnv.NEXT_PUBLIC_APP_ENV_SEND_BASE_PATH = process.env.NEXT_PUBLIC_APP_ENV_SEND_BASE_PATH;
    NextPublicEnv.NEXT_PUBLIC_APP_ENV_APPLICATION_NAME = (_b = process.env.NEXT_PUBLIC_APP_ENV_APPLICATION_NAME) !== null && _b !== void 0 ? _b : 'NextJS Infrastructure';
    NextPublicEnv.NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER = (_c = process.env.NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER) !== null && _c !== void 0 ? _c : DataProviders.BASE;
    return NextPublicEnv;
}());
exports.NextPublicEnv = NextPublicEnv;
//# sourceMappingURL=constants.js.map