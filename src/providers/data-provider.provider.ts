import { BindingKeys, DataProviders } from '@/common';
import {
  BaseDataProviderService,
  BaseResponseHandlerService,
  LBDataProviderService,
  LBResponseHandlerService,
  type IBaseResponseHandlerService,
  type IBaseRestRequestService,
} from '@/services';
import { getError } from '@/utilities';
import { container } from 'tsyringe';

export const setupContainer = () => {
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

  return container;
};
