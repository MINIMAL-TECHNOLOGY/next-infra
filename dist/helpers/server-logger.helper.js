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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerLogger = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-argument */
var path_1 = __importDefault(require("path"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var LOGGER_FOLDER_PATH = (_a = process.env.APP_ENV_LOGGER_FOLDER_PATH) !== null && _a !== void 0 ? _a : './app_data/logs';
var LOG_ENVIRONMENTS = new Set(['development', 'alpha', 'beta', 'staging']);
var LOGGER_PREFIX = (_b = process.env.APP_ENV_APPLICATION_NAME) !== null && _b !== void 0 ? _b : 'next-infra';
var ServerLogger = /** @class */ (function () {
    function ServerLogger() {
        var _this = this;
        this.scopes = [];
        this._environment = process.env.NODE_ENV;
        if (typeof window === 'undefined') {
            // Only import Winston dependencies on the server-side
            void Promise.all([Promise.resolve().then(function () { return __importStar(require('winston')); }), Promise.resolve().then(function () { return __importStar(require('winston-daily-rotate-file')); })]).then(function (_a) {
                var winston = _a[0], DailyRotateFile = _a[1].default;
                var consoleLogTransport = new winston.transports.Console({
                    level: 'debug',
                });
                var infoLogTransport = new DailyRotateFile({
                    frequency: '1h',
                    maxSize: '100m',
                    maxFiles: '5d',
                    datePattern: 'YYYYMMDD_HH',
                    filename: path_1.default.join(LOGGER_FOLDER_PATH, "/".concat(LOGGER_PREFIX, "-info-%DATE%.log")),
                    level: 'info',
                });
                var errorLogTransport = new DailyRotateFile({
                    frequency: '1h',
                    maxSize: '100m',
                    maxFiles: '5d',
                    datePattern: 'YYYYMMDD_HH',
                    filename: path_1.default.join(LOGGER_FOLDER_PATH, "/".concat(LOGGER_PREFIX, "-error-%DATE%.log")),
                    level: 'error',
                });
                var applicationLogFormatter = winston.format.combine(winston.format.label({ label: LOGGER_PREFIX }), winston.format.splat(), winston.format.align(), winston.format.timestamp(), winston.format.simple(), winston.format.colorize(), winston.format.printf(function (_a) {
                    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
                    return "".concat(timestamp, " [").concat(label, "] ").concat(level, ": ").concat(message);
                }), winston.format.errors({ stack: true }));
                _this.logger = winston.createLogger({
                    format: applicationLogFormatter,
                    exitOnError: false,
                    transports: [consoleLogTransport, infoLogTransport, errorLogTransport],
                    exceptionHandlers: [consoleLogTransport, errorLogTransport],
                });
            });
        }
    }
    ServerLogger.prototype.withScope = function (scope) {
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
    ServerLogger.prototype._enhanceMessage = function (parts, message) {
        var enhanced = parts === null || parts === void 0 ? void 0 : parts.reduce(function (prevState, current) {
            if (prevState === void 0) { prevState = ''; }
            if ((0, isEmpty_1.default)(prevState)) {
                return current;
            }
            return prevState.concat("-".concat(current));
        }, '');
        return "[".concat(enhanced, "]").concat(message);
    };
    ServerLogger.prototype.debug = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._environment && !LOG_ENVIRONMENTS.has(this._environment)) {
            return;
        }
        if (!this.logger) {
            throw new Error('Invalid logger instance!');
        }
        if (!process.env.DEBUG) {
            return;
        }
        var enhanced = this._enhanceMessage(this.scopes, message);
        (_a = this.logger).log.apply(_a, __spreadArray(['debug', enhanced], args, false));
    };
    ServerLogger.prototype.info = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.logger) {
            throw new Error('Invalid logger instance!');
        }
        var enhanced = this._enhanceMessage(this.scopes, message);
        (_a = this.logger).log.apply(_a, __spreadArray(['info', enhanced], args, false));
    };
    ServerLogger.prototype.error = function (message) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.logger) {
            throw new Error('Invalid logger instance!');
        }
        var enhanced = this._enhanceMessage(this.scopes, message);
        (_a = this.logger).log.apply(_a, __spreadArray(['error', enhanced], args, false));
    };
    return ServerLogger;
}());
exports.ServerLogger = ServerLogger;
//# sourceMappingURL=server-logger.helper.js.map