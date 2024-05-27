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
var helpers_1 = require("@/helpers");
var tsyringe_1 = require("tsyringe");
var common_1 = require("./common");
var _a = process.env, NODE_ENV = _a.NODE_ENV, RUN_MODE = _a.RUN_MODE, APP_ENV_DATA_PROVIDER_IDENTIFIER = _a.APP_ENV_DATA_PROVIDER_IDENTIFIER, _b = _a.APP_ENV_APPLICATION_NAME, APP_ENV_APPLICATION_NAME = _b === void 0 ? 'NextJS Infrastructure' : _b;
helpers_1.applicationLogger.info('------------------------------------');
helpers_1.applicationLogger.info('Application configures:');
helpers_1.applicationLogger.info('- Env: %s | Run mode: %s', NODE_ENV, RUN_MODE);
helpers_1.applicationLogger.info('- Name: %s', APP_ENV_APPLICATION_NAME);
helpers_1.applicationLogger.info('- Data Provider: %s', APP_ENV_DATA_PROVIDER_IDENTIFIER);
helpers_1.applicationLogger.info('------------------------------------');
tsyringe_1.container.register(common_1.BindingKeys.DATA_PROVIDER_IDENTIFIER, { useValue: APP_ENV_DATA_PROVIDER_IDENTIFIER });
__exportStar(require("./helpers"), exports);
__exportStar(require("./services"), exports);
__exportStar(require("./utilities"), exports);
__exportStar(require("./providers"), exports);
//# sourceMappingURL=index.js.map