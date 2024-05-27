import { BindingKeys, DataProviders } from '@/common';
import { NetworkHelper } from '@/helpers';
import {
  BaseDataProviderService,
  BaseResponseHandlerService,
  LBDataProviderService,
  LBResponseHandlerService,
} from '@/services';
import { container, instanceCachingFactory } from 'tsyringe';

container.register(BindingKeys.NETWORK_HELPER_FACTORY, {
  useFactory: instanceCachingFactory<NetworkHelper>(() => {
    return new NetworkHelper({
      name: 'APPLICATION_NETWORK_SERVICE',
    });
  }),
});

container.register(BindingKeys.RESPONSE_HANDLER_DATA_PROVIDER, {
  useFactory: c => {
    const currentDataProvider = c.resolve<DataProviders>(BindingKeys.DATA_PROVIDER_IDENTIFIER);

    switch (currentDataProvider) {
      case DataProviders.LOOPBACK: {
        return c.resolve(LBResponseHandlerService);
      }
      default: {
        return c.resolve(BaseDataProviderService);
      }
    }
  },
});

container.register(BindingKeys.NEXT_DATA_PROVIDER_PROVIDER, {
  useFactory: c => {
    const currentDataProvider = c.resolve<DataProviders>(BindingKeys.DATA_PROVIDER_IDENTIFIER);

    switch (currentDataProvider) {
      case DataProviders.LOOPBACK: {
        return c.resolve(LBDataProviderService);
      }
      default: {
        return c.resolve(BaseResponseHandlerService);
      }
    }
  },
});

export { container };
