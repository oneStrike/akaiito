import * as path from 'node:path'
import * as process from 'node:process'
import { pathToFileURL } from 'node:url'

const defaultConfig = {
  typingsPath: 'src/apis/types',
  apiPath: 'src/apis/',
  field: 'data',
  headerField: 'header',
  nameDepth: 1,
}

const configFilePath = pathToFileURL(path.join(process.cwd(), 'api.config.js'))

export async function getConfig(key?: string) {
  // @ts-expect-error ignore
  const config = Object.assign(defaultConfig, (await import(configFilePath)).default)
  if (key) {
    return config[key]
  }
  return config
}
