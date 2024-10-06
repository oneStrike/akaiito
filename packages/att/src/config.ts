import * as path from 'node:path'

const configFilePath = path.join(process.cwd(), 'api.config.js')
export const getConfig = async (key?: string) => {
  const config = (await import(configFilePath)).default
  if (key) return config[key]
  return config
}
