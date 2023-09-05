import type { BuildOptions } from 'vite'

export const viteBuild: BuildOptions = {
  rollupOptions: {
    output: {
      chunkFileNames: 'static/js/[name]-[hash].js',
      entryFileNames: 'static/js/[name]-[hash].js'
    }
  }
}
