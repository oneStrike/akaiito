export const filePath = (path: string) => {
  return uni.$es.systemInfo.uniPlatform === 'web'
    ? path
    : import.meta.env.VITE_PROXY_PATH + path
}
