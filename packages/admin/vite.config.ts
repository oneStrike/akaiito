import { defineConfig } from 'vite'
import { createVitePlugins } from './vite/plugins'
import { viteResolve } from './vite/resolve'
import { viteServer } from './vite/server'
import { viteBuild } from './vite/build'
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
  optimizeDeps: {
    include: ['element-plus']
  }
})
