import type { RequestOptions } from '@/components/libs/typings/hooks'

export async function httpClient<T>(config: Omit<RequestOptions, 'baseUrl'>): Promise<T> {
  const client = new uni.$es.httpClient({
    baseUrl:
      uni.$es.systemInfo.uniPlatform === 'web' ? '' : import.meta.env.VITE_PROXY_PATH,
    ...config,
  })
  return await client.request(config)
}
