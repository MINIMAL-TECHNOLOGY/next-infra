import '@abraham/reflection';
import { applicationLogger } from '@/helpers';

const {
  NODE_ENV,
  RUN_MODE,
  APP_ENV_DATA_PROVIDER_IDENTIFIER,
  APP_ENV_APPLICATION_NAME = 'NextJS Infrastructure',
} = process.env;

applicationLogger.info('------------------------------------');
applicationLogger.info('Application configures:');
applicationLogger.info('- Env: %s | Run mode: %s', NODE_ENV, RUN_MODE);
applicationLogger.info('- Name: %s', APP_ENV_APPLICATION_NAME);
applicationLogger.info('- Data Provider: %s', APP_ENV_DATA_PROVIDER_IDENTIFIER);
applicationLogger.info('------------------------------------');

export * from './helpers';
export * from './services';
export * from './utilities';
