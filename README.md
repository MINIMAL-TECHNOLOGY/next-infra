# Next-infra

## Installation

First of all, ensure that you have already set up a Next.js project. Then, run the following command to install the package:

```
pnpm add @mt/next-infra@github:MINIMAL-TECHNOLOGY/next-infra
```

This command installs this package as a dependency in your project.

### Setup

In your `next.config.mjs` file, set up webpack as well as the external packages:

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['@mt/next-infra'],
  },

  webpack: config => {
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
