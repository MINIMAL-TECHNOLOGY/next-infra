"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var common_1 = require("../common");
var helpers_1 = require("../helpers");
var services_1 = require("../services");
var utilities_1 = require("../utilities");
var tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
tsyringe_1.container.register(common_1.BindingKeys.NETWORK_HELPER_FACTORY, {
    useFactory: (0, tsyringe_1.instanceCachingFactory)(function () {
        return new helpers_1.NetworkHelper({
            name: 'NEXT_INFRA_NETWORK_SERVICE',
        });
    }),
});
tsyringe_1.container.register(common_1.BindingKeys.NEXT_DATA_PROVIDER_HANDLER, {
    useFactory: function (c) {
        var currentDataProvider = c.resolve(common_1.BindingKeys.DATA_PROVIDER_IDENTIFIER);
        switch (currentDataProvider) {
            case common_1.DataProviders.LOOPBACK: {
                return c.resolve(services_1.LBResponseHandlerService.name);
            }
            case common_1.DataProviders.BASE: {
                return c.resolve(services_1.BaseResponseHandlerService.name);
            }
            default: {
                throw (0, utilities_1.getError)({ message: 'Invalid data provider' });
            }
        }
    },
});
tsyringe_1.container.register(common_1.BindingKeys.NEXT_DATA_PROVIDER, {
    useFactory: function (c) {
        var currentDataProvider = c.resolve(common_1.BindingKeys.DATA_PROVIDER_IDENTIFIER);
        switch (currentDataProvider) {
            case common_1.DataProviders.LOOPBACK: {
                return c.resolve(services_1.LBDataProviderService.name);
            }
            case common_1.DataProviders.BASE: {
                return c.resolve(services_1.BaseDataProviderService.name);
            }
            default: {
                throw (0, utilities_1.getError)({ message: 'Invalid data provider' });
            }
        }
    },
});
//# sourceMappingURL=data-provider.provider.js.map