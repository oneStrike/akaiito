import { defineConfig } from 'vite'
import { createVitePlugins } from './vite/plugins'
import { viteResolve } from './vite/resolve'
import { viteServer } from './vite/server'
import { viteBuild } from './vite/build'
import { viteCss } from './vite/css'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: createVitePlugins(),
  resolve: viteResolve,
  server: viteServer,
  esbuild: {
    pure: ['console.log']
  },
  build: viteBuild,
  css: viteCss,
  optimizeDeps: {
    include: ['ant-design-vue']
  }
})
