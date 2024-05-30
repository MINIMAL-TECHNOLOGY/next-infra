"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.ServerLogger = exports.applicationLogger = exports.applicationLogFormatter = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-argument */
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var path_1 = __importDefault(require("path"));
var winston_1 = require("winston");
require("winston-daily-rotate-file");
var tsyringe_1 = require("tsyringe");
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
var ServerLogger = /** @class */ (function () {
    function ServerLogger() {
        this.scopes = [];
        this._environment = process.env.NODE_ENV;
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
    ServerLogger.prototype.info = function (message) {
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
    ServerLogger.prototype.error = function (message) {
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
    ServerLogger = __decorate([
        (0, tsyringe_1.singleton)(),
        __metadata("design:paramtypes", [])
    ], ServerLogger);
    return ServerLogger;
}());
exports.ServerLogger = ServerLogger;
tsyringe_1.container.register(ServerLogger.name, { useClass: ServerLogger });
//# sourceMappingURL=server-logger.helper.js.map