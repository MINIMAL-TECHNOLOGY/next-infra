import '@abraham/reflection';
import { LoggerFactory, type ApplicationLogger } from '@/helpers';
import { container } from 'tsyringe';
import { BindingKeys, DataProviders } from '@/common';
import { getError } from '@/utilities';

const NEXT_PUBLIC_APP_ENV_SEND_BASE_URL = process.env.NEXT_PUBLIC_APP_ENV_SEND_BASE_URL;
const NEXT_PUBLIC_APP_ENV_APPLICATION_NAME =
  process.env.NEXT_PUBLIC_APP_ENV_APPLICATION_NAME ?? 'NextJS Infrastructure';
const NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER =
  process.env.NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER ?? DataProviders.BASE;

if (typeof window === 'undefined') {
  const NODE_ENV = process.env.NODE_ENV;
  const RUN_MODE = process.env.RUN_MODE;

  void LoggerFactory.getLogger(['next-server']).then(async (applicationLogger: ApplicationLogger) => {
    applicationLogger.info('------------------------------------');
    applicationLogger.info(' Application configures:');
    applicationLogger.info(' - Env: %s | Run mode: %s', NODE_ENV, RUN_MODE);
    applicationLogger.info(' - Name: %s', NEXT_PUBLIC_APP_ENV_APPLICATION_NAME);
    applicationLogger.info(' - Data Provider: %s', NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER);
    applicationLogger.info(' - Send base url: %s', NEXT_PUBLIC_APP_ENV_SEND_BASE_URL ?? 'N/A');
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
