import { BindingKeys, DataProviders } from '@/common';
import { NetworkHelper, type IBaseLogger } from '@/helpers';
import { ClientLogger } from '@/helpers/client-logger.helper';
import { ApplicationLogger } from '@/helpers/server-logger.helper';
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
  useFactory: instanceCachingFactory<NetworkHelper>(c => {
    const loggerInstance = c.resolve<IBaseLogger>(BindingKeys.LOGGER_INSTANCE);

    return new NetworkHelper(loggerInstance, {
      name: typeof window !== 'undefined' ? 'CLIENT_SIDE_NETWORK_SERVICE' : 'SERVER_SIDE_NETWORK_SERVICE',
    });
  }),
});

container.register(BindingKeys.LOGGER_INSTANCE, {
  useFactory: (_c): IBaseLogger => {
    const isClient = typeof window !== 'undefined';
    return isClient ? ClientLogger.getInstance() : new ApplicationLogger();
  },
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
