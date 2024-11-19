import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { vitePlugins } from './vite/plugin'
import { viteProxy } from './vite/proxy'

export default defineConfig({
  plugins: vitePlugins(),
  server: viteProxy,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
