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
exports.NetworkHelper = void 0;
var helpers_1 = require("../helpers");
var utilities_1 = require("../utilities");
var tsyringe_1 = require("tsyringe");
var HTTP = 'http';
var HTTPS = 'https';
// -------------------------------------------------------------
var NetworkHelper = /** @class */ (function () {
    function NetworkHelper(opts) {
        var _a;
        var name = opts.name;
        this.name = name;
        void this.initializeLogger((_a = opts.scopes) !== null && _a !== void 0 ? _a : [NetworkHelper_1.name]);
    }
    NetworkHelper_1 = NetworkHelper;
    NetworkHelper.prototype.initializeLogger = function (scopes) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, helpers_1.LoggerFactory.getLogger(scopes)];
                    case 1:
                        _a.logger = _b.sent();
                        this.logger.info('Creating new network request worker instance! Name: %s', this.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    NetworkHelper.prototype.getProtocol = function (url) {
        return url.startsWith('http:') ? HTTP : HTTPS;
    };
    // -------------------------------------------------------------
    // SEND REQUEST
    // -------------------------------------------------------------
    NetworkHelper.prototype.send = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var t, url, _a, method, params, body, configs, props, requestUrl, response;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        t = new Date().getTime();
                        url = opts.url, _a = opts.method, method = _a === void 0 ? 'GET' : _a, params = opts.params, body = opts.body, configs = opts.configs;
                        props = __assign({ method: method, body: JSON.stringify(body) }, configs);
                        requestUrl = url;
                        if (params) {
                            requestUrl = "".concat(url, "?").concat((0, utilities_1.stringify)(params));
                        }
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info('[send] URL: %s | Props: %o', requestUrl, props);
                        return [4 /*yield*/, fetch(requestUrl, props)];
                    case 1:
                        response = _d.sent();
                        (_c = this.logger) === null || _c === void 0 ? void 0 : _c.info("[network]][send] Took: %s(ms)", new Date().getTime() - t);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // GET REQUEST
    // -------------------------------------------------------------
    NetworkHelper.prototype.get = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, params, configs, rest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = opts.url, params = opts.params, configs = opts.configs, rest = __rest(opts, ["url", "params", "configs"]);
                        return [4 /*yield*/, this.send(__assign(__assign({}, rest), { url: url, method: 'GET', params: params, configs: configs }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    // POST REQUEST
    // -------------------------------------------------------------
    NetworkHelper.prototype.post = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, configs, rest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = opts.url, body = opts.body, configs = opts.configs, rest = __rest(opts, ["url", "body", "configs"]);
                        return [4 /*yield*/, this.send(__assign(__assign({}, rest), { url: url, method: 'POST', body: body, configs: configs }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    NetworkHelper.prototype.put = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, configs, rest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = opts.url, body = opts.body, configs = opts.configs, rest = __rest(opts, ["url", "body", "configs"]);
                        return [4 /*yield*/, this.send(__assign(__assign(__assign({}, rest), { url: url, method: 'PUT', body: body, configs: configs }), rest))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    NetworkHelper.prototype.patch = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, configs, rest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = opts.url, body = opts.body, configs = opts.configs, rest = __rest(opts, ["url", "body", "configs"]);
                        return [4 /*yield*/, this.send(__assign(__assign({}, rest), { url: url, method: 'PATCH', body: body, configs: configs }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // -------------------------------------------------------------
    NetworkHelper.prototype.delete = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var url, configs, rest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = opts.url, configs = opts.configs, rest = __rest(opts, ["url", "configs"]);
                        return [4 /*yield*/, this.send(__assign(__assign({}, rest), { url: url, method: 'DELETE', configs: configs }))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    var NetworkHelper_1;
    NetworkHelper = NetworkHelper_1 = __decorate([
        (0, tsyringe_1.injectable)(),
        __metadata("design:paramtypes", [Object])
    ], NetworkHelper);
    return NetworkHelper;
}());
exports.NetworkHelper = NetworkHelper;
//# sourceMappingURL=network.helper.js.map
