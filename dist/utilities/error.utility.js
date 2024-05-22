"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getError = exports.ApplicationError = void 0;
var ApplicationError = /** @class */ (function (_super) {
    __extends(ApplicationError, _super);
    function ApplicationError(opts) {
        var _this = this;
        var message = opts.message, messageCode = opts.messageCode, _a = opts.statusCode, statusCode = _a === void 0 ? 400 : _a;
        _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.messageCode = messageCode;
        return _this;
    }
    return ApplicationError;
}(Error));
exports.ApplicationError = ApplicationError;
var getError = function (opts) {
    var error = new ApplicationError(opts);
    return error;
};
exports.getError = getError;
//# sourceMappingURL=error.utility.js.map