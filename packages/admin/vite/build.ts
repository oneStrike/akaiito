import type { BuildOptions } from 'vite'

export const ViteBuild: BuildOptions = {
  rollupOptions: {
    output: {
      chunkFileNames: 'static/js/[name]-[hash].js',
      entryFileNames: 'static/js/[name]-[hash].js',
      assetFileNames: (assetInfo) => {
        if (
          assetInfo.type === 'asset' &&
          assetInfo.name &&
          /\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name)
        ) {
          return 'static/images/[name].[hash][ext]'
        }
        if (
          assetInfo.type === 'asset' &&
          assetInfo.name &&
          /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name)
        ) {
          return 'static/fonts/[name].[hash][ext]'
        }
        return 'static/[ext]/name-[hash].[ext]'
      }
    }
  }
}
