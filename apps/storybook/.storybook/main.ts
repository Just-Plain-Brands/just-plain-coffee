import {fileURLToPath} from 'node:url';

import type {StorybookConfig} from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import {mergeConfig} from 'vite';

const storefrontApp = fileURLToPath(
  new URL('../../storefront/app', import.meta.url),
);
const workspaceRoot = fileURLToPath(new URL('../../../', import.meta.url));

const config = {
  stories: ['../../storefront/app/components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  staticDirs: ['../../storefront/public'],
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '~': storefrontApp,
        },
      },
      server: {
        fs: {
          allow: [workspaceRoot],
        },
      },
    });
  },
} satisfies StorybookConfig;

export default config;
