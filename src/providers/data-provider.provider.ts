import { BindingKeys, DataProviders } from '@/common';
import {
  BaseDataProviderService,
  BaseResponseHandlerService,
  LBDataProviderService,
  LBResponseHandlerService,
} from '@/services';
import { container } from 'tsyringe';

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
