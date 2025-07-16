import { defineConfig } from 'vite'
import { generateIcon } from './src/components/libs/utils/iconify'
import TransformPages from './src/components/libs/utils/pagesJson'
import { ViteBuild } from './vite/build'
import { VitePlugins } from './vite/plugins'
import { ViteResolve } from './vite/resolve'

export default ({ mode }) => {
  const isDev = mode === 'development'
  const isProd = mode === 'production'

  return defineConfig({
    base: './',
    plugins: VitePlugins(),
    resolve: ViteResolve,
    build: ViteBuild,

    // ESBuild 优化配置
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : [],
      legalComments: 'none', // 移除注释以减小包体积
    },

    define: {
      ROUTES: new TransformPages().routes,
      icon: generateIcon('/src/static/icons'),
      __DEV__: isDev,
      __PROD__: isProd,
    },

    // 开发服务器优化
    server: {
      port: 9099,
      host: '0.0.0.0', // 允许外部访问
      open: false, // 不自动打开浏览器
      cors: true, // 启用 CORS

      // HMR 优化
      hmr: {
        overlay: true, // 显示错误覆盖层
      },

      proxy: {
        '/api': {
          target: 'http://172.19.176.1:7001',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          // 添加超时配置
          timeout: 10000,
        },
      },
    },

    // CSS 优化
    css: {
      devSourcemap: isDev, // 开发环境启用 CSS sourcemap
    },
  })
}
