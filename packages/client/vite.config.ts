import { defineConfig, loadEnv } from 'vite'
import { ViteResolve } from './vite/resolve'
import { ViteProxy } from './vite/proxy'
import { ViteBuild } from './vite/build'
import { VitePlugins } from './vite/plugins'
import TransformPages from './src/components/libs/utils/pagesJson'

export default async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE')
  return defineConfig({
    base: './',
    plugins: await VitePlugins(),
    resolve: ViteResolve,
    server: mode !== 'development' ? {} : ViteProxy(env),
    build: ViteBuild,
    esbuild: {
      drop: mode !== 'development' ? ['console', 'debugger'] : []
    },
    define: {
      ROUTES: new TransformPages().routes
    }
  })
}
