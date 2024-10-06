import type { ServerOptions } from 'vite'

export function ViteProxy(): ServerOptions {
  return {
    proxy: {
      '/api': {
        target: 'http://192.168.31.223:7001',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
    host: '0.0.0.0',
  }
}
