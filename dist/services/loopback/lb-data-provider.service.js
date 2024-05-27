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
exports.LBDataProviderService = void 0;
var common_1 = require("@/common");
var helpers_1 = require("@/helpers");
var services_1 = require("@/services");
var utilities_1 = require("@/utilities");
var lodash_utility_1 = require("@/utilities/lodash.utility");
var tsyringe_1 = require("tsyringe");
var LBDataProviderService = /** @class */ (function (_super) {
    __extends(LBDataProviderService, _super);
    function LBDataProviderService(networkHelper, baseUrl) {
        return _super.call(this, networkHelper, baseUrl) || this;
    }
    // -------------------------------------------------------------
    // GET_LIST
    // -------------------------------------------------------------
    LBDataProviderService.prototype.getList = function (resource, params, baseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var pagination, sort, filterGetList, meta, rest, filter, _a, page, _b, perPage, key, rootQuery, key, key, request, paths, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        pagination = params.pagination, sort = params.sort, filterGetList = params.filter, meta = params.meta, rest = __rest(params, ["pagination", "sort", "filter", "meta"]);
                        filter = {};
                        if (filterGetList === null || filterGetList === void 0 ? void 0 : filterGetList.where) {
                            filter = __assign(__assign({}, filterGetList), { where: __assign({}, filterGetList.where) });
                        }
                        else {
                            filter.where = __assign({}, (0, lodash_utility_1.omit)(filterGetList, ['include', 'params', 'noLimit', 'fields']));
                            filter.include = filterGetList === null || filterGetList === void 0 ? void 0 : filterGetList.include;
                            filter.fields = filterGetList === null || filterGetList === void 0 ? void 0 : filterGetList.fields;
                            filter.params = filterGetList === null || filterGetList === void 0 ? void 0 : filterGetList.params;
                            filter.noLimit = filterGetList === null || filterGetList === void 0 ? void 0 : filterGetList.noLimit;
                        }
                        if (sort === null || sort === void 0 ? void 0 : sort.field) {
                            filter.order = ["".concat(sort.field, " ").concat(sort.order)];
                        }
                        // Remove default limit and skip in react-admin
                        if (filter === null || filter === void 0 ? void 0 : filter.noLimit) {
                            filter.limit = undefined;
                            filter.skip = undefined;
                            filter.offset = undefined;
                            filter.noLimit = undefined;
                        }
                        else {
                            _a = pagination.page, page = _a === void 0 ? 0 : _a, _b = pagination.perPage, perPage = _b === void 0 ? 0 : _b;
                            if (perPage >= 0) {
                                filter.limit = perPage;
                            }
                            if (perPage > 0 && page >= 0) {
                                filter.skip = (page - 1) * perPage;
                                filter.offset = (page - 1) * perPage;
                            }
                        }
                        for (key in rest) {
                            // remove headers in query
                            if (!params[key] || key === 'headers') {
                                continue;
                            }
                            filter[key] = params[key];
                        }
                        rootQuery = {};
                        if (filter === null || filter === void 0 ? void 0 : filter.params) {
                            for (key in filter.params) {
                                rootQuery[key] = filter.params[key];
                            }
                            filter.params = undefined;
                        }
                        if (meta) {
                            for (key in meta) {
                                if (meta === null || meta === void 0 ? void 0 : meta.queryRefetch) {
                                    continue;
                                }
                                rootQuery[key] = meta[key];
                            }
                            filter.params = undefined;
                        }
                        request = this.getRequestProps(params);
                        paths = [resource];
                        return [4 /*yield*/, this.doRequest(__assign(__assign({ type: common_1.RequestTypes.GET_LIST, method: 'GET', baseUrl: baseUrl }, request), { query: __assign({ filter: filter }, rootQuery), paths: paths, params: params }))];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // GET_ONE
    // -------------------------------------------------------------
    LBDataProviderService.prototype.getOne = function (resource, params, baseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var request, filter, rootQuery, key, paths, response;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        request = this.getRequestProps(params);
                        filter = ((_a = params === null || params === void 0 ? void 0 : params.meta) === null || _a === void 0 ? void 0 : _a.filter) || {};
                        rootQuery = {};
                        if (filter === null || filter === void 0 ? void 0 : filter.params) {
                            for (key in filter.params) {
                                rootQuery[key] = filter.params[key];
                            }
                        }
                        paths = [resource, "".concat(params.id)];
                        return [4 /*yield*/, this.doRequest(__assign(__assign({ type: common_1.RequestTypes.GET_ONE, method: 'GET', baseUrl: baseUrl }, request), { query: __assign({ filter: __assign({}, (0, lodash_utility_1.omit)(filter, 'params')) }, rootQuery), paths: paths, params: params }))];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // GET_MANY
    // -------------------------------------------------------------
    LBDataProviderService.prototype.getMany = function (resource, params, baseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, request, filter, paths, response;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ids = ((_a = params === null || params === void 0 ? void 0 : params.ids) === null || _a === void 0 ? void 0 : _a.map(function (id) { return id; })) || [];
                        request = this.getRequestProps(params);
                        filter = {};
                        if ((ids === null || ids === void 0 ? void 0 : ids.length) > 0) {
                            filter.where = { id: { inq: ids } };
                        }
                        paths = [resource];
                        return [4 /*yield*/, this.doRequest(__assign(__assign({ type: common_1.RequestTypes.GET_MANY, method: 'GET', baseUrl: baseUrl }, request), { query: { filter: filter }, paths: paths, params: params }))];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // GET_MANY_REFERENCE
    // -------------------------------------------------------------
    LBDataProviderService.prototype.getManyReference = function (resource, params, baseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pagination, _b, sort, filterGetMany, target, id, rest, filter, _c, page, _d, perPage, key, rootQuery, key, request, paths, response;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = params.pagination, pagination = _a === void 0 ? {} : _a, _b = params.sort, sort = _b === void 0 ? {} : _b, filterGetMany = params.filter, target = params.target, id = params.id, rest = __rest(params, ["pagination", "sort", "filter", "target", "id"]);
                        filter = {};
                        if (filterGetMany === null || filterGetMany === void 0 ? void 0 : filterGetMany.where) {
                            filter = __assign(__assign({}, filterGetMany), { where: __assign({}, filterGetMany.where) });
                        }
                        else {
                            filter.where = __assign({}, (0, lodash_utility_1.omit)(filterGetMany, 'include', 'params', 'noLimit', 'fields'));
                            filter.include = filterGetMany === null || filterGetMany === void 0 ? void 0 : filterGetMany.include;
                            filter.fields = filterGetMany === null || filterGetMany === void 0 ? void 0 : filterGetMany.fields;
                            filter.params = filterGetMany === null || filterGetMany === void 0 ? void 0 : filterGetMany.params;
                            filter.noLimit = filterGetMany === null || filterGetMany === void 0 ? void 0 : filterGetMany.noLimit;
                        }
                        filter.where[target] = id;
                        if (sort === null || sort === void 0 ? void 0 : sort.field) {
                            filter.order = ["".concat(sort.field, " ").concat(sort.order)];
                        }
                        // Remove default limit and skip in react-admin
                        if (filter === null || filter === void 0 ? void 0 : filter.noLimit) {
                            filter.limit = undefined;
                            filter.skip = undefined;
                            filter.offset = undefined;
                            filter.noLimit = undefined;
                        }
                        else {
                            _c = pagination.page, page = _c === void 0 ? 0 : _c, _d = pagination.perPage, perPage = _d === void 0 ? 0 : _d;
                            if (perPage >= 0) {
                                filter.limit = perPage;
                            }
                            if (perPage > 0 && page >= 0) {
                                filter.skip = (page - 1) * perPage;
                                filter.offset = (page - 1) * perPage;
                            }
                        }
                        for (key in rest) {
                            if (!params[key] || key === 'headers') {
                                continue;
                            }
                            filter[key] = params[key];
                        }
                        rootQuery = {};
                        if (filter === null || filter === void 0 ? void 0 : filter.params) {
                            for (key in filter.params) {
                                rootQuery[key] = filter.params[key];
                            }
                            filter.params = undefined;
                        }
                        request = this.getRequestProps(params);
                        paths = [resource];
                        return [4 /*yield*/, this.doRequest(__assign(__assign({ type: common_1.RequestTypes.GET_MANY_REFERENCE, method: 'GET', baseUrl: baseUrl }, request), { query: __assign({ filter: filter }, rootQuery), paths: paths, params: params }))];
                    case 1:
                        response = _e.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // CREATE
    // -------------------------------------------------------------
    LBDataProviderService.prototype.create = function (resource, params, baseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var request, paths, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.getRequestProps(params);
                        paths = [resource];
                        return [4 /*yield*/, this.doRequest(__assign({ type: common_1.RequestTypes.CREATE, method: 'POST', paths: paths, params: params, baseUrl: baseUrl }, request))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // UPDATE
    // -------------------------------------------------------------
    LBDataProviderService.prototype.update = function (resource, params, baseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var request, paths, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.getRequestProps(params);
                        paths = [resource, (params === null || params === void 0 ? void 0 : params.id) ? "".concat(params.id) : ''];
                        return [4 /*yield*/, this.doRequest(__assign({ type: common_1.RequestTypes.UPDATE, baseUrl: baseUrl, method: 'PATCH', paths: paths, params: params }, request))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // UPDATE_MANY
    // -------------------------------------------------------------
    LBDataProviderService.prototype.updateMany = function (resource, params, baseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ids, _b, data, query, paths, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = params.ids, ids = _a === void 0 ? [] : _a, _b = params.data, data = _b === void 0 ? {} : _b;
                        if (!(ids === null || ids === void 0 ? void 0 : ids.length)) {
                            throw (0, utilities_1.getError)({ message: '[updateMany] No IDs to execute update!' });
                        }
                        query = {
                            filter: { where: { id: { inq: ids } } },
                        };
                        paths = [resource];
                        return [4 /*yield*/, this.doRequest({
                                type: common_1.RequestTypes.UPDATE_MANY,
                                baseUrl: baseUrl,
                                method: 'PATCH',
                                paths: paths,
                                params: params,
                                query: query,
                                body: data,
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // DELETE
    // -------------------------------------------------------------
    LBDataProviderService.prototype.delete = function (resource, params, baseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var request, paths, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.getRequestProps(params);
                        paths = [resource, "".concat(params.id)];
                        return [4 /*yield*/, this.doRequest(__assign({ type: common_1.RequestTypes.DELETE, baseUrl: baseUrl, method: 'DELETE', paths: paths, params: params }, request))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // DELETE_MANY
    // -------------------------------------------------------------
    LBDataProviderService.prototype.deleteMany = function (resource, params, baseUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ids, meta, request_1, paths, response, request, arrayPaths;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = params.ids, ids = _a === void 0 ? [] : _a, meta = params.meta;
                        if (!(ids === null || ids === void 0 ? void 0 : ids.length)) {
                            throw (0, utilities_1.getError)({ message: '[deleteMany] No IDs to execute delete!' });
                        }
                        if (!!(meta === null || meta === void 0 ? void 0 : meta.isDeleteOne)) return [3 /*break*/, 2];
                        request_1 = this.getRequestProps(__assign(__assign({}, (0, lodash_utility_1.omit)(params, ['ids'])), { body: { ids: ids } }));
                        paths = [resource];
                        return [4 /*yield*/, this.doRequest(__assign({ type: common_1.RequestTypes.DELETE_MANY, baseUrl: baseUrl, method: 'DELETE', paths: paths, params: params }, request_1))];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response];
                    case 2:
                        request = this.getRequestProps(params);
                        arrayPaths = ids.map(function (id) {
                            return [resource, "".concat(id)];
                        });
                        return [4 /*yield*/, Promise.all(arrayPaths.map(function (paths) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.doRequest(__assign({ type: common_1.RequestTypes.DELETE_MANY, baseUrl: baseUrl, method: 'DELETE', paths: paths, params: params }, request))];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })).then(function (responses) {
                                return {
                                    data: responses.map(function (response) { return response.data; }),
                                };
                            })];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    LBDataProviderService = __decorate([
        (0, tsyringe_1.injectable)(),
        __param(0, (0, tsyringe_1.inject)(common_1.BindingKeys.NETWORK_HELPER_FACTORY)),
        __param(1, (0, tsyringe_1.inject)(common_1.BindingKeys.APPLICATION_SEND_BASE_URL)),
        __metadata("design:paramtypes", [helpers_1.NetworkHelper, String])
    ], LBDataProviderService);
    return LBDataProviderService;
}(services_1.BaseDataProviderService));
exports.LBDataProviderService = LBDataProviderService;
tsyringe_1.container.register(LBDataProviderService.name, { useClass: LBDataProviderService });
//# sourceMappingURL=lb-data-provider.service.js.map