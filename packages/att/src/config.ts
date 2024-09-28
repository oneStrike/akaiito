import * as path from 'node:path'
import * as process from 'node:process'

// 将本地路径转换为有效的 file:// URL
function toFileUrl(filePath: string): string {
  // 将路径转换为绝对路径
  const absolutePath = path.resolve(filePath)
  // 将绝对路径转换为 file:// URL
  return `file://${absolutePath.replace(/\\/g, '/')}`
}

const configFilePath = path.join(process.cwd(), 'api.config.js')
const fileUrl = toFileUrl(configFilePath)

export async function getConfig(key?: string) {
  const config = (await import(fileUrl)).default
  if (key) {
    return config[key]
  }
  return config
}
