"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponseHandlerService = void 0;
var tsyringe_1 = require("tsyringe");
var BaseResponseHandlerService = /** @class */ (function () {
    function BaseResponseHandlerService() {
    }
    BaseResponseHandlerService.prototype.convertResponse = function (opts) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return { statusCode: opts.response.status, data: opts.response.data, headers: opts.response.headers };
    };
    BaseResponseHandlerService = __decorate([
        (0, tsyringe_1.injectable)()
    ], BaseResponseHandlerService);
    return BaseResponseHandlerService;
}());
exports.BaseResponseHandlerService = BaseResponseHandlerService;
tsyringe_1.container.register(BaseResponseHandlerService.name, { useClass: BaseResponseHandlerService });
//# sourceMappingURL=base-response-handler.service.js.map