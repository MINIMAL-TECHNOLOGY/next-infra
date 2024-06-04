import '@abraham/reflection';
import { LoggerFactory, type ApplicationLogger } from '@/helpers';
import { container } from 'tsyringe';
import { BindingKeys, DataProviders } from '@/common';
import { getError } from '@/utilities';

const {
  NODE_ENV,
  RUN_MODE,
  NEXT_PUBLIC_APP_ENV_SEND_BASE_URL,
  NEXT_PUBLIC_APP_ENV_APPLICATION_NAME = 'NextJS Infrastructure',
  NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER = DataProviders.BASE,
} = process.env;

if (typeof window === 'undefined') {
  void LoggerFactory.getLogger(['next-server']).then(async (applicationLogger: ApplicationLogger) => {
    applicationLogger.info('------------------------------------');
    applicationLogger.info('Application configures:');
    applicationLogger.info('- Env: %s | Run mode: %s', NODE_ENV, RUN_MODE);
    applicationLogger.info('- Name: %s', NEXT_PUBLIC_APP_ENV_APPLICATION_NAME);
    applicationLogger.info('- Data Provider: %s', NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER);
    applicationLogger.info('- Send base url: %s', NEXT_PUBLIC_APP_ENV_SEND_BASE_URL ?? 'N/A');
    applicationLogger.info('------------------------------------');
  });
}

if (!DataProviders.isValid(NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER)) {
  throw getError({ message: 'Invalid data provider' });
}

container.register(BindingKeys.DATA_PROVIDER_IDENTIFIER, { useValue: NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER });
container.register(BindingKeys.APPLICATION_SEND_BASE_URL, { useValue: NEXT_PUBLIC_APP_ENV_SEND_BASE_URL ?? '' });

export * from './common';
export * from './helpers';
export * from './services';
export * from './utilities';
export * from './providers';
