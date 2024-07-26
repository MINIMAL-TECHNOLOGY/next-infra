"use strict";
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDataProviderService = void 0;
var common_1 = require("../../common");
var helpers_1 = require("../../helpers");
var utilities_1 = require("../../utilities");
var tsyringe_1 = require("tsyringe");
var BaseDataProviderService = /** @class */ (function () {
    function BaseDataProviderService(baseUrl) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {};
        this.networkHelper = new helpers_1.NetworkHelper({
            name: 'NEXT_INFRA_NETWORK_SERVICE',
        });
    }
    // -------------------------------------------------------------
    // SET_DEFAULT_HEADERS
    // -------------------------------------------------------------
    BaseDataProviderService.prototype.setDefaultHeaders = function (headers) {
        this.defaultHeaders = headers;
    };
    // -------------------------------------------------------------
    // CHANGE_BASE_URL
    // -------------------------------------------------------------
    BaseDataProviderService.prototype.changeBaseUrl = function (baseUrl) {
        this.baseUrl = baseUrl;
    };
    // -------------------------------------------------------------
    // GET_REQUEST_PROPS
    // -------------------------------------------------------------
    BaseDataProviderService.prototype.getRequestProps = function (params) {
        var _a;
        var type = params.bodyType, body = params.body, file = params.file, query = params.query, _b = params.headers, headers = _b === void 0 ? {} : _b, data = params.data, cache = params.cache;
        var rs = {
            headers: headers,
            body: null,
            query: query,
            cache: cache,
        };
        rs.headers = __assign(__assign({}, this.defaultHeaders), headers);
        switch (type) {
            case 'form': {
                rs.headers = __assign(__assign({}, rs.headers), { 'Content-Type': 'application/x-www-form-urlencoded' });
                var formData = new FormData();
                for (var key in body) {
                    if (!((_a = params.body) === null || _a === void 0 ? void 0 : _a[key])) {
                        continue;
                    }
                    formData.append(key, "".concat(body[key]));
                }
                rs.body = formData;
                break;
            }
            case 'file': {
                rs.body = file;
                break;
            }
            default: {
                rs.headers = __assign(__assign({}, rs.headers), { 'Content-Type': 'application/json' });
                rs.body = __assign(__assign({}, data), body);
                break;
            }
        }
        return rs;
    };
    // -------------------------------------------------------------
    // GET_REQUEST_URL
    // -------------------------------------------------------------
    BaseDataProviderService.prototype.getRequestUrl = function (opts) {
        var _a;
        var baseUrl = opts === null || opts === void 0 ? void 0 : opts.baseUrl;
        var paths = (_a = opts === null || opts === void 0 ? void 0 : opts.paths) !== null && _a !== void 0 ? _a : [];
        if (!baseUrl || (0, utilities_1.isEmpty)(baseUrl)) {
            throw (0, utilities_1.getError)({
                statusCode: 500,
                message: '[getRequestUrl] Invalid configuration for third party request base url!',
            });
        }
        if (baseUrl.endsWith('/')) {
            baseUrl = baseUrl.slice(0, -1); // Remove / at the end
        }
        var joined = paths
            .map(function (path) {
            if (!path.startsWith('/')) {
                path = "/".concat(path); // Add / to the start of url path
            }
            return path;
        })
            .join('');
        return "".concat(baseUrl).concat(joined);
    };
    // -------------------------------------------------------------
    // DO_REQUEST
    // -------------------------------------------------------------
    BaseDataProviderService.prototype.doRequest = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var type, _a, baseUrl, method, paths, body, headers, cache, query, params, url, bodyOpts;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        type = opts.type, _a = opts.baseUrl, baseUrl = _a === void 0 ? this.baseUrl : _a, method = opts.method, paths = opts.paths, body = opts.body, headers = opts.headers, cache = opts.cache, query = opts.query, params = opts.params;
                        if (!baseUrl || (0, utilities_1.isEmpty)(baseUrl)) {
                            throw (0, utilities_1.getError)({ message: '[doRequest] Invalid baseUrl to send request!' });
                        }
                        url = this.getRequestUrl({ baseUrl: baseUrl, paths: paths });
                        bodyOpts = method === 'GET' ? undefined : body;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.networkHelper
                                    .send({
                                    url: url,
                                    method: method,
                                    params: query,
                                    body: bodyOpts,
                                    configs: __assign({ headers: headers }, (cache && { cache: cache })),
                                })
                                    .then(function (rs) { return __awaiter(_this, void 0, void 0, function () {
                                    var status;
                                    var _a, _b, _c, _d;
                                    return __generator(this, function (_e) {
                                        switch (_e.label) {
                                            case 0:
                                                status = rs.status;
                                                if (!(status < 200 || status >= 300)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, rs.text().then(function (text) {
                                                        var _a;
                                                        var json = JSON.parse(text);
                                                        var err = new Error("".concat((_a = json === null || json === void 0 ? void 0 : json.error) === null || _a === void 0 ? void 0 : _a.message));
                                                        err.code = status;
                                                        throw err;
                                                    })];
                                            case 1: return [2 /*return*/, _e.sent()];
                                            case 2:
                                                if (status === 204) {
                                                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                                                    resolve({ status: 204, data: {} });
                                                }
                                                _e.label = 3;
                                            case 3:
                                                if (![(_a = rs.headers) === null || _a === void 0 ? void 0 : _a.get('content-type'), (_b = rs.headers) === null || _b === void 0 ? void 0 : _b.get('Content-Type')].includes('application/octet-stream')) return [3 /*break*/, 5];
                                                return [4 /*yield*/, rs.blob().then(function (blob) {
                                                        var _a;
                                                        return { status: rs.status, data: blob, headers: (_a = rs.headers) !== null && _a !== void 0 ? _a : {} };
                                                    })];
                                            case 4: return [2 /*return*/, _e.sent()];
                                            case 5:
                                                if (![(_c = rs.headers) === null || _c === void 0 ? void 0 : _c.get('content-type'), (_d = rs.headers) === null || _d === void 0 ? void 0 : _d.get('Content-Type')].includes('binary/octet-stream')) return [3 /*break*/, 7];
                                                return [4 /*yield*/, rs.blob().then(function (blob) {
                                                        var _a, _b;
                                                        var data = blob;
                                                        if ((0, utilities_1.isClientSideRendering)()) {
                                                            try {
                                                                var url_1 = window.URL.createObjectURL(blob);
                                                                var a = document.createElement('a');
                                                                a.href = url_1;
                                                                a.download =
                                                                    (_a = rs.headers.get('Normalizename')) !== null && _a !== void 0 ? _a : "".concat(common_1.NextPublicEnv.NEXT_PUBLIC_APP_ENV_APPLICATION_NAME, "-download");
                                                                document.body.appendChild(a);
                                                                a.click();
                                                                a.remove();
                                                                window.URL.revokeObjectURL(url_1);
                                                                data = {};
                                                            }
                                                            catch (error) {
                                                                console.error('Failed to download file:', error);
                                                                throw error;
                                                            }
                                                        }
                                                        return { status: rs.status, data: data, headers: (_b = rs.headers) !== null && _b !== void 0 ? _b : {} };
                                                    })];
                                            case 6: return [2 /*return*/, _e.sent()];
                                            case 7: return [4 /*yield*/, rs.json().then(function (data) {
                                                    var _a;
                                                    return { status: rs.status, data: data, headers: (_a = rs.headers) !== null && _a !== void 0 ? _a : {} };
                                                })];
                                            case 8: return [2 /*return*/, _e.sent()];
                                        }
                                    });
                                }); })
                                    .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                    var responseHandlerService, normalized;
                                    return __generator(this, function (_a) {
                                        responseHandlerService = tsyringe_1.container.resolve(common_1.BindingKeys.NEXT_DATA_PROVIDER_HANDLER);
                                        normalized = responseHandlerService.convertResponse({ response: response, type: type, params: params });
                                        resolve(normalized);
                                        return [2 /*return*/];
                                    });
                                }); })
                                    .catch(function (error) {
                                    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
                                    reject(error);
                                });
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // SEND
    // -------------------------------------------------------------
    BaseDataProviderService.prototype.send = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, method, rest, request, paths, response;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!((_b = opts === null || opts === void 0 ? void 0 : opts.params) === null || _b === void 0 ? void 0 : _b.method)) {
                            throw (0, utilities_1.getError)({
                                message: '[send] Invalid http method to send request!',
                            });
                        }
                        _a = opts.params, method = _a.method, rest = __rest(_a, ["method"]);
                        request = this.getRequestProps(rest);
                        paths = [opts.resource];
                        return [4 /*yield*/, this.doRequest(__assign({ type: common_1.RequestTypes.SEND, baseUrl: opts.baseUrl, method: method, paths: paths, params: opts.params }, request))];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    BaseDataProviderService = __decorate([
        (0, tsyringe_1.injectable)(),
        __param(0, (0, tsyringe_1.inject)(common_1.BindingKeys.APPLICATION_SEND_BASE_URL)),
        __metadata("design:paramtypes", [String])
    ], BaseDataProviderService);
    return BaseDataProviderService;
}());
exports.BaseDataProviderService = BaseDataProviderService;
tsyringe_1.container.register(BaseDataProviderService.name, { useClass: BaseDataProviderService });
//# sourceMappingURL=base-data-provider.service.js.map