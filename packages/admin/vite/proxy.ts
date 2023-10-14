import type { ServerOptions } from 'vite'
import { IterateObject } from '@akaiito/typings/src/global'

export const ViteProxy = (env: IterateObject<string>): ServerOptions => {
  const proxyList = JSON.parse(env.VITE_PROXY_LIST)
  const proxyObj = {}
  proxyList.forEach((item: string) => {
    const [key, target, rewrite = ''] = item.split(',')
    proxyObj[key] = {
      target,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(key, rewrite)
    }
  })
  return {
    proxy: proxyObj,
    host: '0.0.0.0'
  }
}
