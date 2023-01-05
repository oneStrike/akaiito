import { defineConfig } from 'vite'
import { createVitePlugins } from './vite/plugins'
import { viteResolve } from './vite/resolve'
import { viteServer } from './vite/server'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
  resolve: viteResolve,
  server: viteServer,
  optimizeDeps: {
    includes: ['@dcloudio/uni-ui']
  }
})
