"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataProviders = exports.RequestTypes = void 0;
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
//# sourceMappingURL=constants.js.map