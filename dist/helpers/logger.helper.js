"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
var client_logger_helper_1 = require("./client-logger.helper");
var server_logger_helper_1 = require("./server-logger.helper");
var LoggerFactory = /** @class */ (function () {
    function LoggerFactory() {
    }
    LoggerFactory.getLogger = function (scopes, isClient) {
        var logger = isClient ? client_logger_helper_1.ClientLogger.getInstance() : new server_logger_helper_1.ApplicationLogger();
        logger.withScope(scopes.join('-'));
        return logger;
    };
    return LoggerFactory;
}());
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=logger.helper.js.map