import { Inject, Provide } from '@midwayjs/core'
import * as yaml from 'js-yaml'
import * as fs from 'fs/promises'
import * as path from 'path'
import { ConfigEnum } from '../shared/enum/config.enum'

@Provide()
export class ConfigService {
  @Inject()
  baseDir: string

  /**
   * 根据类型和可选字段获取配置信息
   * @param type - 配置类型
   * @param field - 可选字段
   * @returns 配置信息或指定字段的值
   */
  async getConfig<T>(
    type: ConfigEnum,
    field?: keyof T
  ): Promise<T | T[keyof T]> {
    const yamlFilePath = path.join(this.baseDir, type)
    const yamlFileContent = await fs.readFile(yamlFilePath, 'utf8')
    const yamlConfig = yaml.load(yamlFileContent) as T

    return field ? yamlConfig[field] : yamlConfig
  }

  /**
   * 根据类型设置配置信息
   * @param type - 配置类型
   * @param config - 要设置的新配置信息
   */
  async setConfig<T>(type: ConfigEnum, config: T): Promise<void> {
    const yamlConfig = await this.getConfig<T>(type)
    Object.assign(yamlConfig, config)
    const yamlStr = yaml.dump(yamlConfig)
    const yamlFilePath = path.join(this.baseDir, type)
    await fs.writeFile(yamlFilePath, yamlStr)
  }
}
