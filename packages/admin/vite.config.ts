import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import { ViteBuild } from './vite/build'
import { VitePlugins } from './vite/plugins'
import { ViteProxy } from './vite/proxy'
import { ViteResolve } from './vite/resolve'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDev = mode === 'development'

  return {
    base: './',
    plugins: VitePlugins(isDev),
    resolve: ViteResolve,
    build: ViteBuild,
    server: {
      ...ViteProxy(env),
      // 开发服务器性能优化
      hmr: {
        overlay: false, // 禁用错误遮罩层，提升开发体验
      },
      fs: {
        // 允许访问工作区根目录之外的文件
        allow: ['..'],
      },
    },
    // 依赖预构建优化
    optimizeDeps: {
      include: [
        'element-plus/es',
        'element-plus/es/components/button/style/css',
        'element-plus/es/components/input/style/css',
        'element-plus/es/components/form/style/css',
        'element-plus/es/components/table/style/css',
        '@element-plus/icons-vue',
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        'axios',
      ],
      // 强制预构建某些依赖
      force: isDev,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
      // 开发环境禁用CSS代码分割，提升HMR性能
      devSourcemap: isDev,
    },
    // 开发环境性能优化
    esbuild: {
      // 开发环境移除console和debugger
      drop: isDev ? [] : ['console', 'debugger'],
    },
  }
})
