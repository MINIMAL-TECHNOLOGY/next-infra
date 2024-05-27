"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponseHandlerService = void 0;
var BaseResponseHandlerService = /** @class */ (function () {
    function BaseResponseHandlerService() {
    }
    BaseResponseHandlerService.prototype.convertResponse = function (opts) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return { data: opts.response.data };
    };
    return BaseResponseHandlerService;
}());
exports.BaseResponseHandlerService = BaseResponseHandlerService;
//# sourceMappingURL=base-response-handler.service.js.map