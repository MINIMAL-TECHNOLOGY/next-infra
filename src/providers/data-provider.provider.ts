import { BindingKeys, DataProviders } from '@/common';
import { NetworkHelper } from '@/helpers';
import {
  BaseDataProviderService,
  BaseResponseHandlerService,
  LBDataProviderService,
  LBResponseHandlerService,
  type IBaseResponseHandlerService,
  type IBaseRestRequestService,
} from '@/services';
import { getError } from '@/utilities';
import { container, instanceCachingFactory } from 'tsyringe';

container.register(BindingKeys.NETWORK_HELPER_FACTORY, {
  useFactory: instanceCachingFactory<NetworkHelper>(() => {
    return new NetworkHelper({
      name: 'NEXT_INFRA_NETWORK_SERVICE',
    });
  }),
});

container.register(BindingKeys.NEXT_DATA_PROVIDER_HANDLER, {
  useFactory: (c): IBaseResponseHandlerService => {
    const currentDataProvider = c.resolve<string>(BindingKeys.DATA_PROVIDER_IDENTIFIER);

    switch (currentDataProvider) {
      case DataProviders.LOOPBACK: {
        return c.resolve(LBResponseHandlerService.name);
      }
      case DataProviders.BASE: {
        return c.resolve(BaseResponseHandlerService.name);
      }
      default: {
        throw getError({ message: 'Invalid data provider' });
      }
    }
  },
});

container.register(BindingKeys.NEXT_DATA_PROVIDER, {
  useFactory: (c): IBaseRestRequestService => {
    const currentDataProvider = c.resolve<string>(BindingKeys.DATA_PROVIDER_IDENTIFIER);

    switch (currentDataProvider) {
      case DataProviders.LOOPBACK: {
        return c.resolve(LBDataProviderService.name);
      }
      case DataProviders.BASE: {
        return c.resolve(BaseDataProviderService.name);
      }
      default: {
        throw getError({ message: 'Invalid data provider' });
      }
    }
  },
});

export { container };
