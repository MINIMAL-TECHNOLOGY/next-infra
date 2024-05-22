"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = void 0;
var stringify = function (params) {
    var normalizedParams = {};
    for (var key in params) {
        switch (typeof params[key]) {
            case 'number':
            case 'string': {
                normalizedParams[key] = params[key];
                break;
            }
            default: {
                normalizedParams[key] = JSON.stringify(params[key]);
                break;
            }
        }
    }
    var rs = new URLSearchParams(normalizedParams);
    return rs.toString();
};
exports.stringify = stringify;
//# sourceMappingURL=url.utility.js.map