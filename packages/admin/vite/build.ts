import type { BuildOptions } from 'vite'
export const viteBuild: BuildOptions = {
  rollupOptions: {
    output: {
      chunkFileNames: 'static/js/[name]-[hash].js',
      entryFileNames: 'static/js/[name]-[hash].js',
      // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      manualChunks(id: string) {
        if (id.includes('node_modules')) {
          return id
            .toString()
            .split('node_modules/')[1]
            .split('/')[0]
            .toString()
        }
      }
    }
  }
}
