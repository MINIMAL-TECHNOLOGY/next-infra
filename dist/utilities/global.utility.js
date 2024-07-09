"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalRef = void 0;
var GlobalRef = /** @class */ (function () {
    function GlobalRef(uniqueName) {
        this.sym = Symbol.for(uniqueName);
    }
    Object.defineProperty(GlobalRef.prototype, "value", {
        get: function () {
            return global[this.sym];
        },
        set: function (value) {
            global[this.sym] = value;
        },
        enumerable: false,
        configurable: true
    });
    return GlobalRef;
}());
exports.GlobalRef = GlobalRef;
//# sourceMappingURL=global.utility.js.map