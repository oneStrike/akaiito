import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import { ViteBuild } from './vite/build'
import { VitePlugins } from './vite/plugins'
import { ViteProxy } from './vite/proxy'
import { ViteResolve } from './vite/resolve'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: './',
    plugins: VitePlugins(),
    resolve: ViteResolve,
    build: ViteBuild,
    server: ViteProxy(env),
    optimizeDeps: {
      include: ['element-plus/es'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or 'modern'
        },
      },
    },
  }
})
