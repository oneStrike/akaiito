import { defineConfig } from 'vite'
import { createVitePlugins } from './src/vite/plugins'
import { viteResolve } from './src/vite/resolve'
import { viteServer } from './src/vite/server'
import { viteBuild } from './src/vite/build'
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
    include: ['naive-ui']
  }
})
