import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePlugins } from './vite/plugins'
import { ViteResolve } from './vite/resolve'
import { ViteProxy } from './vite/proxy'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: VitePlugins(),
  resolve: ViteResolve,
  server: ViteProxy
})
