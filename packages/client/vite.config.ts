import { defineConfig } from 'vite'
import { generateIcon } from './src/components/libs/utils/iconify'
import TransformPages from './src/components/libs/utils/pagesJson'
import { ViteBuild } from './vite/build'
import { VitePlugins } from './vite/plugins'

import { ViteProxy } from './vite/proxy'
import { ViteResolve } from './vite/resolve'

export default ({ mode }) => {
  return defineConfig({
    base: './',
    plugins: VitePlugins(),
    resolve: ViteResolve,
    server: ViteProxy(),
    build: ViteBuild,
    esbuild: {
      drop: mode !== 'development' ? ['console', 'debugger'] : [],
    },
    define: {
      ROUTES: new TransformPages().routes,
      icon: generateIcon('/src/static/icons'),
    },
  })
}
