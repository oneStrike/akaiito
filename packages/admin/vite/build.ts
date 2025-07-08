import type { BuildOptions } from 'vite'

export const ViteBuild: BuildOptions = {
  // 构建目标
  target: 'es2015',
  // 启用CSS代码分割
  cssCodeSplit: true,
  // 构建时生成sourcemap
  sourcemap: false,
  // 设置chunk大小警告限制
  chunkSizeWarningLimit: 1000,
  rollupOptions: {
    output: {
      chunkFileNames: 'static/js/[name]-[hash].js',
      entryFileNames: 'static/js/[name]-[hash].js',
      assetFileNames: (assetInfo) => {
        if (
          assetInfo.type === 'asset' &&
          assetInfo.name &&
          /\.(?:jpe?g|png|gif|svg)$/i.test(assetInfo.name)
        ) {
          return 'static/images/[name].[hash][ext]'
        }
        if (
          assetInfo.type === 'asset' &&
          assetInfo.name &&
          /\.(?:ttf|woff|woff2|eot)$/i.test(assetInfo.name)
        ) {
          return 'static/fonts/[name].[hash][ext]'
        }
        return 'static/[ext]/[name]-[hash].[ext]'
      },
      // 代码分割优化
      manualChunks: {
        // 将Vue相关库打包到一个chunk
        'vue': ['vue', 'vue-router', 'pinia'],
        // 将Element Plus相关库打包到一个chunk
        'element-plus': ['element-plus', '@element-plus/icons-vue'],
        // 将工具库打包到一个chunk
        'utils': ['axios', '@vueuse/core', 'lodash-es'],
      },
    },
    // 外部依赖优化（如果需要CDN）
    external: [],
  },
  // 压缩配置
  minify: 'esbuild',
  // 启用gzip压缩报告
  reportCompressedSize: true,
}
