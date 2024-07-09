import '@abraham/reflection';

import { BindingKeys, NextPublicEnv } from '@/common';
import { ApplicationLogger, LoggerFactory } from '@/helpers';
import { setupContainer } from '@/providers';
import { isServerSideRendering } from '@/utilities';
import { container as tsyringeContainer } from 'tsyringe';

const diContainerSingleton = () => {
  const isInitializedInServerSide = isServerSideRendering();
  if (isInitializedInServerSide && globalThis.fetch.constructor.name !== 'AsyncFunction') {
    return;
  }

  tsyringeContainer.register(BindingKeys.DATA_PROVIDER_IDENTIFIER, {
    useValue: NextPublicEnv.NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER,
  });
  tsyringeContainer.register(BindingKeys.APPLICATION_SEND_BASE_URL, {
    useValue: NextPublicEnv.NEXT_PUBLIC_APP_ENV_SEND_BASE_URL ?? '',
  });

  const clientInfraContainer = setupContainer();

  if (isInitializedInServerSide) {
    void LoggerFactory.getLogger(['next-server']).then(async (applicationLogger: ApplicationLogger) => {
      applicationLogger.info('------------------------------------');
      applicationLogger.info(' Application configures:');
      applicationLogger.info(' - Env: %s | Run mode: %s', process.env.NODE_ENV, process.env.RUN_MODE);
      applicationLogger.info(' - Name: %s', NextPublicEnv.NEXT_PUBLIC_APP_ENV_APPLICATION_NAME);
      applicationLogger.info(' - Data Provider: %s', NextPublicEnv.NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER);
      applicationLogger.info(' - Send base url: %s', NextPublicEnv.NEXT_PUBLIC_APP_ENV_SEND_BASE_URL ?? 'N/A');
      applicationLogger.info('------------------------------------');
    });
  }

  return clientInfraContainer;
};

declare const globalThis: {
  nextInfraContainer: ReturnType<typeof diContainerSingleton>;
} & typeof global;

const container = globalThis.nextInfraContainer ?? diContainerSingleton();

export default container;

if (process.env.NODE_ENV !== 'production') {
  globalThis.nextInfraContainer = container;
}
