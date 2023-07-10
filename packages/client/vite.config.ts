import { defineConfig } from 'vite'
import { createVitePlugins } from './vite/plugins'
import { viteResolve } from './vite/resolve'
import { viteServer } from './vite/server'
import TransformPages from './src/components/libs/utils/pagesJson'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
  define: {
    ROUTES: new TransformPages().ROUTES
  },
  resolve: viteResolve,
  server: viteServer
  // optimizeDeps: {
  //   include: ['@dcloudio/uni-ui']
  // }
})
