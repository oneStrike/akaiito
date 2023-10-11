import { defineConfig } from 'vite'
import { VitePlugins } from './vite/plugins'
import { ViteResolve } from './vite/resolve'
import { ViteProxy } from './vite/proxy'
import { ViteBuild } from './vite/build'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: './',
    plugins: VitePlugins(),
    resolve: ViteResolve,
    server: ViteProxy,
    build: ViteBuild,
    esbuild: {
      drop: mode !== 'development' ? ['console', 'debugger'] : []
    }
  }
})
