# Next-infra

## Installation

First of all, ensure that you have already set up a Next.js project. Then, run the following command to install the package:

```bash
pnpm add @mt/next-infra@github:MINIMAL-TECHNOLOGY/next-infra
pnpm add -D terser-webpack-plugin@^5.3.10
```

This command installs this package as a dependency in your project.

### Setup

In your `next.config.mjs` file, set up webpack as well as the external packages:

```mjs
import TerserPlugin from 'terser-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['@mt/next-infra'],
    instrumentationHook: true,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            keep_fnames: true,
          },
        }),
      ];
    }
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

export default nextConfig;
```

Don't forget to change these environment value in `.env`:

```
NEXT_PUBLIC_APP_ENV_APPLICATION_NAME=<your_project_name>
NEXT_PUBLIC_APP_ENV_DATA_PROVIDER_IDENTIFIER=loopback | base
NEXT_PUBLIC_APP_ENV_SEND_BASE_URL=<your_base_url>

NODE_ENV=development | production | alpha | beta | staging
RUN_MODE=dev | prod
```

Next step, in `/src` folder create 2 files named `data-provider.ts` and `instrumentation.ts`

- data-provider.ts
```typescript
import { BindingKeys, type ILBDataProvider, nextInfraContainer } from '@mt/next-infra';

// Initialize the data provider when the server started
const dataProvider = nextInfraContainer?.resolve<ILBDataProvider>(BindingKeys.NEXT_DATA_PROVIDER);

export default dataProvider;
```

- instrumentation.ts
```typescript
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./data-provider');
  }
}
```
