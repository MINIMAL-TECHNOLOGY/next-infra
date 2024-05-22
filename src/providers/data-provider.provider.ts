import { BindingKeys, DataProviders } from '@/common';
import { container } from 'tsyringe';
import { LBDataProviderService, LBResponseHandlerService } from '@/services';
import { getError } from '@/utilities';

container.register(BindingKeys.RESPONSE_HANDLER_DATA_PROVIDER, {
  useFactory: c => {
    const currentDataProvider = c.resolve<DataProviders>(BindingKeys.DATA_PROVIDER_IDENTIFIER);

    switch (currentDataProvider) {
      case DataProviders.LOOPBACK: {
        return c.resolve(LBResponseHandlerService);
      }
      default: {
        throw getError({ message: 'Invalid data provider' });
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
        throw getError({ message: 'Invalid data provider' });
      }
    }
  },
});

export { container };
