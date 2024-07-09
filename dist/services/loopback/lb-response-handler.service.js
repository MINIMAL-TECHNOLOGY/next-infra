"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LBResponseHandlerService = void 0;
/* eslint-disable @typescript-eslint/consistent-type-assertions */
var common_1 = require("../../common");
var services_1 = require("../../services");
var utilities_1 = require("../../utilities");
var tsyringe_1 = require("tsyringe");
var LBResponseHandlerService = /** @class */ (function (_super) {
    __extends(LBResponseHandlerService, _super);
    function LBResponseHandlerService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LBResponseHandlerService.prototype.handleCreate = function (opts) {
        var _a, _b;
        var rs = { id: (_a = opts.data) === null || _a === void 0 ? void 0 : _a.id };
        switch ((_b = opts.params) === null || _b === void 0 ? void 0 : _b.type) {
            case 'file': {
                rs = __assign(__assign({}, rs), { files: opts.data });
                break;
            }
            default: {
                rs = __assign(__assign({}, opts.data), { id: opts.data.id });
                break;
            }
        }
        return { statusCode: opts.status, data: rs };
    };
    LBResponseHandlerService.prototype.handleGetListAndGetManyReference = function (opts) {
        var _a, _b, _c, _d;
        // content-range: <unit> <range-start>-<range-end>/<size>
        var contentRange = ((_a = opts.headers) === null || _a === void 0 ? void 0 : _a.get('content-range')) || ((_b = opts.headers) === null || _b === void 0 ? void 0 : _b.get['Content-Range']);
        if (!contentRange) {
            throw (0, utilities_1.getError)({
                message: 'Missing "Content-Range" header in the HTTP Response. The REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. In case CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?',
            });
        }
        var d = (_c = opts.data) !== null && _c !== void 0 ? _c : [];
        return {
            statusCode: opts.status,
            data: d,
            total: parseInt((_d = contentRange.split('/').pop()) !== null && _d !== void 0 ? _d : '0', 10) || d.length,
        };
    };
    LBResponseHandlerService.prototype.convertResponse = function (opts) {
        var _a = opts.response, data = _a.data, headers = _a.headers, status = _a.status, type = opts.type, params = opts.params;
        switch (type) {
            case common_1.RequestTypes.GET_LIST:
            case common_1.RequestTypes.GET_MANY_REFERENCE: {
                return this.handleGetListAndGetManyReference({ status: status, data: data, headers: headers });
            }
            case common_1.RequestTypes.CREATE: {
                return this.handleCreate({ status: status, data: data, params: params });
            }
            case common_1.RequestTypes.DELETE: {
                return {
                    statusCode: status,
                    data: __assign(__assign({}, data), { id: params.id }),
                };
            }
            default: {
                return { statusCode: status, data: data };
            }
        }
    };
    LBResponseHandlerService = __decorate([
        (0, tsyringe_1.injectable)()
    ], LBResponseHandlerService);
    return LBResponseHandlerService;
}(services_1.BaseResponseHandlerService));
exports.LBResponseHandlerService = LBResponseHandlerService;
tsyringe_1.container.register(LBResponseHandlerService.name, { useClass: LBResponseHandlerService });
//# sourceMappingURL=lb-response-handler.service.js.map