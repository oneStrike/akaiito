export const viteProxy = {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ''),
    },
    '/file': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  host: '0.0.0.0',
}
