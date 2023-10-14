import { defineConfig, loadEnv } from 'vite'
import { VitePlugins } from './vite/plugins'
import { ViteResolve } from './vite/resolve'
import { ViteProxy } from './vite/proxy'
import { ViteBuild } from './vite/build'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE')
  return {
    base: './',
    plugins: VitePlugins(),
    resolve: ViteResolve,
    server: ViteProxy(env),
    build: ViteBuild,
    esbuild: {
      drop: mode !== 'development' ? ['console', 'debugger'] : []
    }
  }
})
