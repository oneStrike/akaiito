import { Inject, Provide } from '@midwayjs/core'
import * as yaml from 'js-yaml'
import * as fs from 'fs/promises'
import * as path from 'path'
import { ConfigEnum } from '../shared/enum/config.enum'
@Provide()
export class ConfigService {
  @Inject()
  baseDir: any

  async getConfig<T>(
    type: ConfigEnum,
    filed?: keyof T
  ): Promise<T | T[keyof T]> {
    const yamlFile = await fs.readFile(path.join(this.baseDir, type), 'utf8')
    const yamlConfig = yaml.load(yamlFile) as T
    return filed ? yamlConfig[filed] : yamlConfig
  }

  async setConfig<T>(type: ConfigEnum, config: T): Promise<void> {
    const yamlConfig = this.getConfig(type)
    Object.assign(yamlConfig, config)
    const yamlStr = yaml.dump(yamlConfig)
    await fs.writeFile(type, yamlStr)
  }
}
