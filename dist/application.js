"use strict";
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("@abraham/reflection");
var common_1 = require("./common");
var helpers_1 = require("./helpers");
var providers_1 = require("./providers");
var utilities_1 = require("./utilities");
var tsyringe_1 = require("tsyringe");
var diContainerSingleton = function () {
    var _a;
    var isInitializedInServerSide = (0, utilities_1.isServerSideRendering)();
    if (isInitializedInServerSide && globalThis.fetch.constructor.name !== 'AsyncFunction') {
        return;
    }
    tsyringe_1.container.register(common_1.BindingKeys.DATA_PROVIDER_IDENTIFIER, {
        useValue: common_1.NextPublicEnv.NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER,
    });
    tsyringe_1.container.register(common_1.BindingKeys.APPLICATION_SEND_BASE_URL, {
        useValue: (_a = common_1.NextPublicEnv.NEXT_PUBLIC_APP_ENV_SEND_BASE_URL) !== null && _a !== void 0 ? _a : '',
    });
    var clientInfraContainer = (0, providers_1.setupContainer)();
    if (isInitializedInServerSide) {
        void helpers_1.LoggerFactory.getLogger(['next-server']).then(function (applicationLogger) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                applicationLogger.info('------------------------------------');
                applicationLogger.info(' Application configures:');
                applicationLogger.info(' - Env: %s | Run mode: %s', process.env.NODE_ENV, process.env.RUN_MODE);
                applicationLogger.info(' - Name: %s', common_1.NextPublicEnv.NEXT_PUBLIC_APP_ENV_APPLICATION_NAME);
                applicationLogger.info(' - Data Provider: %s', common_1.NextPublicEnv.NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER);
                applicationLogger.info(' - Send base url: %s', (_a = common_1.NextPublicEnv.NEXT_PUBLIC_APP_ENV_SEND_BASE_URL) !== null && _a !== void 0 ? _a : 'N/A');
                applicationLogger.info('------------------------------------');
                return [2 /*return*/];
            });
        }); });
    }
    return clientInfraContainer;
};
var container = (_a = globalThis.nextInfraContainer) !== null && _a !== void 0 ? _a : diContainerSingleton();
exports.default = container;
if (process.env.NODE_ENV !== 'production') {
    globalThis.nextInfraContainer = container;
}
//# sourceMappingURL=application.js.map