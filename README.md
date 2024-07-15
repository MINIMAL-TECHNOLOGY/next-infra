# Next-infra

## Installation

First of all, ensure that you have already set up a Next.js project. Then, run the following command to install the package:

```bash
pnpm add @mt/next-infra@github:MINIMAL-TECHNOLOGY/next-infra
pnpm add -D terser-webpack-plugin@^5.3.10
```

This command installs this package as a dependency in your project.

## Setup

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

## Integrations

1. `NextAuth`: dataProvider can be used to set the default header in the entire application for both client side and server side like this:
- data-provider-server.ts
```typescript
import { auth } from '@/auth';
import dataProvider from '@/data-provider';

export async function getServerSideDataProvider() {
  const session = await auth();

  if (session?.sessionToken) {
    dataProvider?.setDefaultHeaders({ Authorization: `Bearer ${session.sessionToken}` });
  } else {
    dataProvider?.setDefaultHeaders({});
  }

  return dataProvider;
}
```
- data-provider-client.tsx
```tsx
'use client';
import React, { useEffect, useState } from 'react';

import { type ILBDataProvider } from '@mt/next-infra';
import { useSession } from 'next-auth/react';
import dataProviderClient from '@/data-provider';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = useSession();
  const [dataProvider, setDataProvider] = useState<ILBDataProvider | undefined>(dataProviderClient);

  useEffect(() => {
    if (!session?.data?.sessionToken) {
      dataProvider?.setDefaultHeaders({});
      return;
    }

    dataProvider?.setDefaultHeaders({ Authorization: `Bearer ${session.data.sessionToken}` });

    setDataProvider(dataProvider);
  }, [session, dataProvider]);

  return <DataProviderContext.Provider value={dataProvider}>{children}</DataProviderContext.Provider>;
};

export const DataProviderContext = React.createContext<ILBDataProvider | undefined>(undefined);

export const useDataProvider = () => React.useContext(DataProviderContext);
```

