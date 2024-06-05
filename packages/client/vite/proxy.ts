import type { ServerOptions } from 'vite'
import type { IterateObject } from '@akaiito/typings/src'

export const ViteProxy = (env: IterateObject<string>): ServerOptions => {
  const proxyKeys = JSON.parse(env.VITE_PROXY_KEY)
  const proxyObj = {}
  proxyKeys.forEach((item: string) => {
    const [key, rewrite = ''] = item.split('.')
    proxyObj[key] = {
      target: env.VITE_PROXY_PATH,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(key, rewrite)
    }
  })
  return {
    proxy: proxyObj,
    host: '0.0.0.0'
  }
}
