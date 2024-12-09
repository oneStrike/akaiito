import type { ServerOptions } from 'vite'

export function ViteProxy(env: IterateObject<string>): ServerOptions {
  const proxyList = JSON.parse(env.VITE_PROXY_LIST)
  const proxyObj: IterateObject = {}
  proxyList.forEach((item: string) => {
    const [key, target, rewrite = ''] = item.split(',')
    console.log(key, rewrite)
    proxyObj[key] = {
      target,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(key, rewrite),
    }
  })
  return {
    proxy: proxyObj,
    host: '0.0.0.0',
  }
}
