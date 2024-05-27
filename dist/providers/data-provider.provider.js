"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var common_1 = require("../common");
var helpers_1 = require("../helpers");
var services_1 = require("../services");
var tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
tsyringe_1.container.register(common_1.BindingKeys.NETWORK_HELPER_FACTORY, {
    useFactory: (0, tsyringe_1.instanceCachingFactory)(function () {
        return new helpers_1.NetworkHelper({
            name: 'APPLICATION_NETWORK_SERVICE',
        });
    }),
});
tsyringe_1.container.register(common_1.BindingKeys.RESPONSE_HANDLER_DATA_PROVIDER, {
    useFactory: function (c) {
        var currentDataProvider = c.resolve(common_1.BindingKeys.DATA_PROVIDER_IDENTIFIER);
        switch (currentDataProvider) {
            case common_1.DataProviders.LOOPBACK: {
                return c.resolve(services_1.LBResponseHandlerService);
            }
            default: {
                return c.resolve(services_1.BaseDataProviderService);
            }
        }
    },
});
tsyringe_1.container.register(common_1.BindingKeys.NEXT_DATA_PROVIDER_PROVIDER, {
    useFactory: function (c) {
        var currentDataProvider = c.resolve(common_1.BindingKeys.DATA_PROVIDER_IDENTIFIER);
        switch (currentDataProvider) {
            case common_1.DataProviders.LOOPBACK: {
                return c.resolve(services_1.LBDataProviderService);
            }
            default: {
                return c.resolve(services_1.BaseResponseHandlerService);
            }
        }
    },
});
//# sourceMappingURL=data-provider.provider.js.map