"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var common_1 = require("../common");
var tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
var services_1 = require("../services");
var utilities_1 = require("../utilities");
tsyringe_1.container.register(common_1.BindingKeys.RESPONSE_HANDLER_DATA_PROVIDER, {
    useFactory: function (c) {
        var currentDataProvider = c.resolve(common_1.BindingKeys.DATA_PROVIDER_IDENTIFIER);
        switch (currentDataProvider) {
            case common_1.DataProviders.LOOPBACK: {
                return c.resolve(services_1.LBResponseHandlerService);
            }
            default: {
                throw (0, utilities_1.getError)({ message: 'Invalid data provider' });
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
                throw (0, utilities_1.getError)({ message: 'Invalid data provider' });
            }
        }
    },
});
//# sourceMappingURL=data-provider.provider.js.map