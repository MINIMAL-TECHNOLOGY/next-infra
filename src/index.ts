import '@abraham/reflection';
import { applicationLogger } from '@/helpers';
import { container } from 'tsyringe';
import { BindingKeys } from './common';

const {
  NODE_ENV,
  RUN_MODE,
  APP_ENV_SEND_BASE_URL,
  APP_ENV_DATA_PROVIDER_IDENTIFIER,
  APP_ENV_APPLICATION_NAME = 'NextJS Infrastructure',
} = process.env;

applicationLogger.info('------------------------------------');
applicationLogger.info('Application configures:');
applicationLogger.info('- Env: %s | Run mode: %s', NODE_ENV, RUN_MODE);
applicationLogger.info('- Name: %s', APP_ENV_APPLICATION_NAME);
applicationLogger.info('- Data Provider: %s', APP_ENV_DATA_PROVIDER_IDENTIFIER ?? 'Base');
applicationLogger.info('- Send base url: %s', APP_ENV_SEND_BASE_URL ?? 'N/A');
applicationLogger.info('------------------------------------');

container.register(BindingKeys.DATA_PROVIDER_IDENTIFIER, { useValue: APP_ENV_DATA_PROVIDER_IDENTIFIER });
container.register(BindingKeys.APPLICATION_SEND_BASE_URL, { useValue: APP_ENV_SEND_BASE_URL });

export * from './helpers';
export * from './services';
export * from './utilities';
export * from './providers';
