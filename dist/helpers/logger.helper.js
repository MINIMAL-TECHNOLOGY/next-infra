"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = exports.ApplicationLogger = void 0;
var utilities_1 = require("../utilities");
var LOG_ENVIRONMENTS = new Set(['development', 'alpha', 'beta', 'staging']);
var LOGGER_PREFIX = (_a = process.env.NEXT_PUBLIC_APP_ENV_APPLICATION_NAME) !== null && _a !== void 0 ? _a : 'next-infra';
var ApplicationLogger = /** @class */ (function () {
    function ApplicationLogger() {
        this.scopes = [];
        this._environment = process.env.NODE_ENV;
    }
    ApplicationLogger.prototype.importWinstonModules = function () {
        return __awaiter(this, void 0, void 0, function () {
            var winston;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(/* webpackIgnore: true */ 'winston')); })];
                    case 1:
                        winston = _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(/* webpackIgnore: true */ 'winston-daily-rotate-file')); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, winston];
                }
            });
        });
    };
    ApplicationLogger.prototype.initializeClientLogger = function () {
        this.applicationLogger = {
            log: function (level, message) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                if (typeof message === 'string') {
                    var formattedMessage = message
                        .replace(/%[sd]/g, function (match) {
                        if (args.length === 0) {
                            return match;
                        }
                        var arg = args.shift();
                        switch (match) {
                            case '%s':
                                return String(arg);
                            case '%d':
                                return String(Number(arg));
                            default:
                                return match;
                        }
                    })
                        .replace(/%o/g, function () {
                        if (args.length === 0) {
                            return '%o';
                        }
                        var arg = args.shift();
                        return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
                    });
                    var method = console[level] || console.log;
                    method(formattedMessage);
                }
                else {
                    var method = console[level] || console.log;
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    method.apply(void 0, __spreadArray([message], args, false));
                }
            },
        };
    };
    ApplicationLogger.prototype.initializeServerLogger = function () {
        return __awaiter(this, void 0, void 0, function () {
            var winston, transports, format, LOGGER_FOLDER_PATH, consoleLogTransport, infoLogTransport, errorLogTransport, applicationLogFormatter;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.importWinstonModules()];
                    case 1:
                        winston = _b.sent();
                        transports = {
                            Console: winston.transports.Console,
                            DailyRotateFile: winston.transports.DailyRotateFile,
                        };
                        format = winston.format;
                        LOGGER_FOLDER_PATH = (_a = process.env.APP_ENV_LOGGER_FOLDER_PATH) !== null && _a !== void 0 ? _a : './app_data/logs';
                        consoleLogTransport = new transports.Console({
                            level: 'debug',
                        });
                        infoLogTransport = new transports.DailyRotateFile({
                            frequency: '1h',
                            maxSize: '100m',
                            maxFiles: '5d',
                            datePattern: 'YYYYMMDD_HH',
                            filename: "".concat(LOGGER_FOLDER_PATH, "/").concat(LOGGER_PREFIX, "-info-%DATE%.log"),
                            level: 'info',
                        });
                        errorLogTransport = new transports.DailyRotateFile({
                            frequency: '1h',
                            maxSize: '100m',
                            maxFiles: '5d',
                            datePattern: 'YYYYMMDD_HH',
                            filename: "".concat(LOGGER_FOLDER_PATH, "/").concat(LOGGER_PREFIX, "-error-%DATE%.log"),
                            level: 'error',
                        });
                        applicationLogFormatter = format.combine(format.label({ label: LOGGER_PREFIX }), format.splat(), format.align(), format.timestamp(), format.simple(), format.colorize(), format.printf(function (info) {
                            var level = info.level, message = info.message, label = info.label, timestamp = info.timestamp;
                            return "".concat(timestamp, " [").concat(label, "] ").concat(level, ": ").concat(message);
                        }), format.errors({ stack: true }));
                        this.applicationLogger = winston.createLogger({
                            format: applicationLogFormatter,
                            exitOnError: false,
                            transports: [consoleLogTransport, infoLogTransport, errorLogTransport],
                            exceptionHandlers: [consoleLogTransport, errorLogTransport],
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationLogger.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((0, utilities_1.isServerSideRendering)() && process.env.NEXT_RUNTIME === 'nodejs')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initializeServerLogger()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.initializeClientLogger();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationLogger.prototype.withScope = function (scope) {
        if (this.scopes.length < 2) {
            this.scopes.push(scope);
            return this;
        }
        while (this.scopes.length > 2) {
            this.scopes.pop();
        }
        this.scopes[1] = scope;
        return this;
    };
    ApplicationLogger.prototype._enhanceMessage = function (parts, message) {
        var enhanced = parts === null || parts === void 0 ? void 0 : parts.reduce(function (prevState, current) {
            if (prevState === void 0) { prevState = ''; }
            if ((0, utilities_1.isEmpty)(prevState)) {
                return current;
            }
            return prevState.concat("-".concat(current));
        }, '');
        return "[".concat(enhanced, "]").concat(message);
    };
    ApplicationLogger.prototype.debug = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._environment && !LOG_ENVIRONMENTS.has(this._environment)) {
            return;
        }
        if (!this.applicationLogger) {
            return;
        }
        if (!process.env.DEBUG) {
            return;
        }
        var enhanced = this._enhanceMessage(this.scopes, message);
        (_a = this.applicationLogger).log.apply(_a, __spreadArray(['debug', enhanced], args, false));
    };
    ApplicationLogger.prototype.info = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.applicationLogger) {
            return;
        }
        var enhanced = this._enhanceMessage(this.scopes, message);
        (_a = this.applicationLogger).log.apply(_a, __spreadArray(['info', enhanced], args, false));
    };
    ApplicationLogger.prototype.error = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.applicationLogger) {
            return;
        }
        var enhanced = this._enhanceMessage(this.scopes, message);
        (_a = this.applicationLogger).log.apply(_a, __spreadArray(['error', enhanced], args, false));
    };
    return ApplicationLogger;
}());
exports.ApplicationLogger = ApplicationLogger;
var LoggerFactory = /** @class */ (function () {
    function LoggerFactory() {
    }
    LoggerFactory.getLogger = function (scopes) {
        return __awaiter(this, void 0, void 0, function () {
            var logger;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger = new ApplicationLogger();
                        return [4 /*yield*/, logger.initialize()];
                    case 1:
                        _a.sent();
                        logger.withScope(scopes.join('-'));
                        return [2 /*return*/, logger];
                }
            });
        });
    };
    return LoggerFactory;
}());
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=logger.helper.js.map