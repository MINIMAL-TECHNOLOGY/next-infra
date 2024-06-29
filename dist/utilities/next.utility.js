"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClientSideRendering = exports.isServerSideRendering = void 0;
var isServerSideRendering = function () {
    return typeof window === 'undefined';
};
exports.isServerSideRendering = isServerSideRendering;
var isClientSideRendering = function () {
    return typeof window === 'object';
};
exports.isClientSideRendering = isClientSideRendering;
//# sourceMappingURL=next.utility.js.map