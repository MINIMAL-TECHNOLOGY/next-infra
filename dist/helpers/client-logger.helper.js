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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientLogger = void 0;
var utilities_1 = require("../utilities");
var applicationLogger = console;
var ClientLogger = /** @class */ (function () {
    function ClientLogger() {
        this.scopes = [];
    }
    ClientLogger.prototype.withScope = function (scope) {
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
    ClientLogger.getInstance = function () {
        if (!this.instance) {
            this.instance = new ClientLogger();
        }
        return this.instance;
    };
    ClientLogger.prototype.getTimestamp = function () {
        return new Date().toISOString();
    };
    ClientLogger.prototype.generateLog = function (opts) {
        var level = opts.level, message = opts.message;
        var timestamp = this.getTimestamp();
        return "".concat(timestamp, " - [").concat(level, "]\t ").concat(message);
    };
    ClientLogger.prototype.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!applicationLogger) {
            throw (0, utilities_1.getError)({ message: '[info] Invalid logger instance!' });
        }
        applicationLogger.info.apply(applicationLogger, __spreadArray([this.generateLog({ level: 'INFO', message: message })], args, false));
    };
    ClientLogger.prototype.debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!applicationLogger) {
            throw (0, utilities_1.getError)({ message: '[debug] Invalid logger instance!' });
        }
        applicationLogger.debug.apply(applicationLogger, __spreadArray([this.generateLog({ level: 'DEBUG', message: message })], args, false));
    };
    ClientLogger.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!applicationLogger) {
            throw (0, utilities_1.getError)({ message: '[error] Invalid logger instance!' });
        }
        applicationLogger.error.apply(applicationLogger, __spreadArray([this.generateLog({ level: 'ERROR', message: message })], args, false));
    };
    return ClientLogger;
}());
exports.ClientLogger = ClientLogger;
//# sourceMappingURL=client-logger.helper.js.map