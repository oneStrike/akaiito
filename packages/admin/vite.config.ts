import { defineConfig, loadEnv } from 'vite'
import { VitePlugins } from './vite/plugins'
import { ViteResolve } from './vite/resolve'
import { ViteProxy } from './vite/proxy'
import { ViteBuild } from './vite/build'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE')
  return defineConfig({
    base: './',
    plugins: VitePlugins(),
    resolve: ViteResolve,
    server: mode !== 'development' ? {} : ViteProxy(env),
    build: ViteBuild,
    esbuild: {
      drop: mode !== 'development' ? ['console', 'debugger'] : []
    }
  })
}
