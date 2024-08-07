"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingKeys = void 0;
var BindingKeys = /** @class */ (function () {
    function BindingKeys() {
    }
    BindingKeys.APPLICATION_ROOT_CONTEXT = '@next/infra/context/root';
    BindingKeys.APPLICATION_SEND_BASE_URL = '@next/infra/application_send_base_url';
    BindingKeys.DATA_PROVIDER_IDENTIFIER = '@next/infra/data_provider_identifier';
    BindingKeys.NEXT_DATA_PROVIDER = '@next/infra/next_data_provider';
    BindingKeys.NEXT_DATA_PROVIDER_HANDLER = '@next/infra/next_data_provider_handler';
    // These below keys use for outside projects manage next-infra
    BindingKeys.NEXT_INFRA_CONTAINER = '@next/infra/global/container';
    return BindingKeys;
}());
exports.BindingKeys = BindingKeys;
//# sourceMappingURL=keys.js.map