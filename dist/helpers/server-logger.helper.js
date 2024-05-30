"use strict";
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
exports.ApplicationLogger = exports.applicationLogger = exports.applicationLogFormatter = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-argument */
var path_1 = __importDefault(require("path"));
var winston_1 = require("winston");
require("winston-daily-rotate-file");
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var LOGGER_FOLDER_PATH = (_a = process.env.APP_ENV_LOGGER_FOLDER_PATH) !== null && _a !== void 0 ? _a : './app_data/logs';
var LOG_ENVIRONMENTS = new Set(['development', 'alpha', 'beta', 'staging']);
var LOGGER_PREFIX = (_b = process.env.APP_ENV_APPLICATION_NAME) !== null && _b !== void 0 ? _b : 'next-infra';
var consoleLogTransport = new winston_1.transports.Console({
    level: 'debug',
});
var infoLogTransport = new winston_1.transports.DailyRotateFile({
    frequency: '1h',
    maxSize: '100m',
    maxFiles: '5d',
    datePattern: 'YYYYMMDD_HH',
    filename: path_1.default.join(LOGGER_FOLDER_PATH, "/".concat(LOGGER_PREFIX, "-info-%DATE%.log")),
    level: 'info',
});
var errorLogTransport = new winston_1.transports.DailyRotateFile({
    frequency: '1h',
    maxSize: '100m',
    maxFiles: '5d',
    datePattern: 'YYYYMMDD_HH',
    filename: path_1.default.join(LOGGER_FOLDER_PATH, "/".concat(LOGGER_PREFIX, "-error-%DATE%.log")),
    level: 'error',
});
exports.applicationLogFormatter = winston_1.format.combine(winston_1.format.label({ label: LOGGER_PREFIX }), winston_1.format.splat(), winston_1.format.align(), winston_1.format.timestamp(), winston_1.format.simple(), winston_1.format.colorize(), winston_1.format.printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
    return "".concat(timestamp, " [").concat(label, "] ").concat(level, ": ").concat(message);
}), winston_1.format.errors({ stack: true }));
exports.applicationLogger = (0, winston_1.createLogger)({
    format: exports.applicationLogFormatter,
    exitOnError: false,
    transports: [consoleLogTransport, infoLogTransport, errorLogTransport],
    exceptionHandlers: [consoleLogTransport, errorLogTransport],
});
var ApplicationLogger = /** @class */ (function () {
    function ApplicationLogger() {
        this.scopes = [];
        this._environment = process.env.NODE_ENV;
    }
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
            if ((0, isEmpty_1.default)(prevState)) {
                return current;
            }
            return prevState.concat("-".concat(current));
        }, '');
        return "[".concat(enhanced, "]").concat(message);
    };
    ApplicationLogger.prototype.debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._environment && !LOG_ENVIRONMENTS.has(this._environment)) {
            return;
        }
        if (!exports.applicationLogger) {
            throw new Error('Invalid logger instance!');
        }
        if (!process.env.DEBUG) {
            return;
        }
        var enhanced = this._enhanceMessage(this.scopes, message);
        exports.applicationLogger.log.apply(exports.applicationLogger, __spreadArray(['debug', enhanced], args, false));
    };
    ApplicationLogger.prototype.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!exports.applicationLogger) {
            throw new Error('Invalid logger instance!');
        }
        var enhanced = this._enhanceMessage(this.scopes, message);
        exports.applicationLogger.log.apply(exports.applicationLogger, __spreadArray(['info', enhanced], args, false));
    };
    ApplicationLogger.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!exports.applicationLogger) {
            throw new Error('Invalid logger instance!');
        }
        var enhanced = this._enhanceMessage(this.scopes, message);
        exports.applicationLogger.log.apply(exports.applicationLogger, __spreadArray(['error', enhanced], args, false));
    };
    return ApplicationLogger;
}());
exports.ApplicationLogger = ApplicationLogger;
//# sourceMappingURL=server-logger.helper.js.map