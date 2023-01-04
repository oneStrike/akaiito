import type { ServerOptions } from 'vite'

export const viteServer: ServerOptions = {
  port: 3300,
  proxy: {
    '/foo': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/foo/, '')
    }
  }
}
