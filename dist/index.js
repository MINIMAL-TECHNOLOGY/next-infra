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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@abraham/reflection");
var server_logger_helper_1 = require("./helpers/server-logger.helper");
var tsyringe_1 = require("tsyringe");
var common_1 = require("./common");
var utilities_1 = require("./utilities");
var _a = process.env, NODE_ENV = _a.NODE_ENV, RUN_MODE = _a.RUN_MODE, APP_ENV_SEND_BASE_URL = _a.APP_ENV_SEND_BASE_URL, _b = _a.APP_ENV_DATA_PROVIDER_IDENTIFIER, APP_ENV_DATA_PROVIDER_IDENTIFIER = _b === void 0 ? common_1.DataProviders.BASE : _b, _c = _a.APP_ENV_APPLICATION_NAME, APP_ENV_APPLICATION_NAME = _c === void 0 ? 'NextJS Infrastructure' : _c;
var applicationLogger = new server_logger_helper_1.ServerLogger();
applicationLogger.info('------------------------------------');
applicationLogger.info('Application configures:');
applicationLogger.info('- Env: %s | Run mode: %s', NODE_ENV, RUN_MODE);
applicationLogger.info('- Name: %s', APP_ENV_APPLICATION_NAME);
applicationLogger.info('- Data Provider: %s', APP_ENV_DATA_PROVIDER_IDENTIFIER);
applicationLogger.info('- Send base url: %s', APP_ENV_SEND_BASE_URL !== null && APP_ENV_SEND_BASE_URL !== void 0 ? APP_ENV_SEND_BASE_URL : 'N/A');
applicationLogger.info('------------------------------------');
if (!common_1.DataProviders.isValid(APP_ENV_DATA_PROVIDER_IDENTIFIER)) {
    throw (0, utilities_1.getError)({ message: 'Invalid data provider' });
}
tsyringe_1.container.register(common_1.BindingKeys.DATA_PROVIDER_IDENTIFIER, { useValue: APP_ENV_DATA_PROVIDER_IDENTIFIER });
tsyringe_1.container.register(common_1.BindingKeys.APPLICATION_SEND_BASE_URL, { useValue: APP_ENV_SEND_BASE_URL !== null && APP_ENV_SEND_BASE_URL !== void 0 ? APP_ENV_SEND_BASE_URL : '' });
__exportStar(require("./common"), exports);
__exportStar(require("./helpers"), exports);
__exportStar(require("./services"), exports);
__exportStar(require("./utilities"), exports);
__exportStar(require("./providers"), exports);
//# sourceMappingURL=index.js.map