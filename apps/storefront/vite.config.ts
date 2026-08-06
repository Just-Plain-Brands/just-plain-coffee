import {fileURLToPath} from 'node:url';

import mdx from '@mdx-js/rollup';
import {reactRouter} from '@react-router/dev/vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import {defineConfig, type Plugin} from 'vite';

function journalMdxPlugin(): Plugin {
  const plugin = mdx({
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    rehypePlugins: [rehypeSlug],
  });
  const transform = plugin.transform;

  if (typeof transform !== 'function') {
    throw new Error('Expected the MDX plugin to provide a transform hook.');
  }

  return {
    ...plugin,
    enforce: 'pre',
    transform(source, id) {
      if (/[?&]raw(?:&|$)/.test(id)) return null;

      return transform.call(this, source, id);
    },
  };
}

export default defineConfig({
  plugins: [
    journalMdxPlugin(),
    tailwindcss(),
    hydrogen(),
    oxygen(),
    reactRouter(),
  ],
  resolve: {
    alias: {
      // Vite's native tsconfig path resolver does not cover JavaScript
      // projects that use jsconfig.json, so define Hydrogen's app alias here.
      '~': fileURLToPath(new URL('./app', import.meta.url)),
    },
    tsconfigPaths: true,
  },
  build: {
    // Allow a strict Content-Security-Policy
    // without inlining assets as base64:
    assetsInlineLimit: 0,
  },
  ssr: {
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: [
        'use-sync-external-store/shim/with-selector',
        'use-sync-external-store/shim',
        'react-router > set-cookie-parser',
        'react-router > cookie',
        'react-router',
      ],
    },
  },
  server: {
    allowedHosts: ['.tryhydrogen.dev'],
  },
});
