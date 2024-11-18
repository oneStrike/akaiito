import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { vitePlugins } from './vite/plugin'

export default defineConfig({
  plugins: vitePlugins(),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
