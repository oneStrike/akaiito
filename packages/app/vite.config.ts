import { defineConfig } from 'vite'
import { generateIcon } from './src/components/libs/utils/iconify'
import TransformPages from './src/components/libs/utils/pagesJson'
import { ViteBuild } from './vite/build'
import { VitePlugins } from './vite/plugins'
import { ViteResolve } from './vite/resolve'

export default ({ mode }) => {
  return defineConfig({
    base: './',
    plugins: VitePlugins(),
    resolve: ViteResolve,
    build: ViteBuild,
    esbuild: {
      drop: mode !== 'development' ? ['console', 'debugger'] : [],
    },
    define: {
      ROUTES: new TransformPages().routes,
      icon: generateIcon('/src/static/icons'),
    },
    server: {
      port: 9099,
      proxy: {
        '/api': {
          target: 'http://172.20.128.1:7001',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
