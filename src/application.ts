import '@abraham/reflection';

import { BindingKeys, NextPublicEnv } from '@/common';
import { type ApplicationLogger, LoggerFactory } from '@/helpers';
import { setupContainer } from '@/providers';
import { isEmpty, isServerSideRendering } from '@/utilities';
import { container as tsyringeContainer } from 'tsyringe';

const diContainerSingleton = () => {
  const isInitializedInServerSide = isServerSideRendering();
  if (isInitializedInServerSide && isEmpty(globalThis._traceGlobals)) {
    return;
  }

  const baseUrl =
    (NextPublicEnv.NEXT_PUBLIC_APP_ENV_SEND_BASE_URL ?? '') + (NextPublicEnv.NEXT_PUBLIC_APP_ENV_SEND_BASE_PATH ?? '');

  tsyringeContainer.register(BindingKeys.DATA_PROVIDER_IDENTIFIER, {
    useValue: NextPublicEnv.NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER,
  });
  tsyringeContainer.register(BindingKeys.APPLICATION_SEND_BASE_URL, {
    useValue: baseUrl,
  });

  const clientInfraContainer = setupContainer();

  if (isInitializedInServerSide) {
    void LoggerFactory.getLogger(['next-server']).then(async (applicationLogger: ApplicationLogger) => {
      applicationLogger.info('------------------------------------');
      applicationLogger.info(' Application configures:');
      applicationLogger.info(' - App env: %s | Run mode: %s', process.env.APP_ENV, process.env.RUN_MODE);
      applicationLogger.info(' - Name: %s', NextPublicEnv.NEXT_PUBLIC_APP_ENV_APPLICATION_NAME);
      applicationLogger.info(' - Data Provider: %s', NextPublicEnv.NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER);
      applicationLogger.info(' - Send base url: %s', baseUrl ?? 'N/A');
      applicationLogger.info('------------------------------------');
    });
  }

  return clientInfraContainer;
};

declare const globalThis: {
  nextInfraContainer: ReturnType<typeof diContainerSingleton>;
  _traceGlobals: Map<string, string>;
} & typeof global;

const container = globalThis.nextInfraContainer ?? diContainerSingleton();

export default container;

if (process.env.APP_ENV !== 'production') {
  globalThis.nextInfraContainer = container;
}
