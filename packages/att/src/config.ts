import path from 'node:path'
import * as process from 'node:process'
import { pathToFileURL } from 'node:url'

/**
 * ATT配置接口定义
 */
interface AttConfig {
  /** 类型定义文件输出路径 */
  typingsPath: string
  /** API文件输出路径 */
  apiPath: string
  /** 响应数据字段名 */
  field: string
  /** 请求头字段名 */
  headerField: string
  /** API名称深度 */
  nameDepth: number
  /** ApiFox API密钥 */
  key?: string
  /** 排除的文件夹ID列表 */
  exclude?: string[]
  /** HTTP客户端配置 */
  http?: {
    import: string
  }
  [key: string]: any
}

/**
 * 默认配置
 */
const defaultConfig: Partial<AttConfig> = {
  typingsPath: 'src/apis/types',
  apiPath: 'src/apis/',
  field: 'data',
  headerField: 'header',
  nameDepth: 1,
}

/**
 * 配置文件路径
 */
const configFilePath = pathToFileURL(path.join(process.cwd(), 'api.config.js'))

/**
 * 获取配置信息
 * 合并默认配置和用户自定义配置
 *
 * @param key - 可选，指定获取配置的某个字段
 * @returns 完整配置对象或指定字段的值
 */
export async function getConfig(): Promise<AttConfig>
export async function getConfig<K extends keyof AttConfig>(key: K): Promise<AttConfig[K]>
export async function getConfig(key?: string): Promise<any> {
  try {
    // 动态导入用户配置文件
    const userConfig = (await import(configFilePath.href)).default || {}

    // 合并默认配置和用户配置
    const config = Object.assign({}, defaultConfig, userConfig) as AttConfig

    // 验证必要的配置项
    if (!config.key) {
      throw new Error('配置文件中缺少必要的 key 字段（ApiFox API密钥）')
    }

    // 返回指定字段或完整配置
    if (key) {
      return config[key]
    }

    return config
  } catch (error) {
    if (error instanceof Error && error.message.includes('Cannot resolve module')) {
      throw new Error('未找到 api.config.js 配置文件，请在项目根目录创建该文件')
    }
    throw error
  }
}
