import type { IterateObject } from '@akaiito/typings/src'
import type { ServerOptions } from 'vite'

export function ViteProxy(env: IterateObject<string>): ServerOptions {
  const proxyKeys = JSON.parse(env.VITE_PROXY_KEY)
  const proxyObj = {}
  proxyKeys.forEach((item: string) => {
    const [url, key, rewrite = ''] = item
    proxyObj[key] = {
      target: url,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(key, rewrite),
    }
  })
  return {
    proxy: proxyObj,
    host: '0.0.0.0',
  }
}
