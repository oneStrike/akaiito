import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { ConfigFilePathEnum } from '@/enum/configFilePath'
import { Inject, MidwayConfigService, Provide } from '@midwayjs/core'
import * as yaml from 'yaml'
import type { IterateObject } from '@auy/types'

@Provide()
export class ConfigService {
  @Inject()
  midwayConfigServer: MidwayConfigService

  @Inject()
  baseDir: string

  // 异步加载配置
  async loadConfig() {
    // 遍历 ConfigFilePathEnum 枚举的键
    for (const configFilePathEnumKey in ConfigFilePathEnum) {
      // 获取当前键对应的值
      const item = ConfigFilePathEnum[configFilePathEnumKey]
      // 获取配置文件的内容
      const config: IterateObject = await this.getYamlConfig(item)
      // 将配置对象添加到 midwayConfigServer 中
      this.midwayConfigServer.addObject(config)
    }
  }

  // 获取配置
  async getYamlConfig<T>(
    pathEnum?: ConfigFilePathEnum,
    field?: keyof T,
  ): Promise<T | T[keyof T]> {
    // 拼接配置文件路径
    const yamlFilePath = path.join(this.baseDir, pathEnum)
    // 读取配置文件内容
    const yamlFileContent = await fs.readFile(yamlFilePath, 'utf8')
    // 将配置文件内容解析为 YAML 对象
    const yamlConfig = yaml.parse(yamlFileContent) as T
    // 如果指定了 field，则返回指定字段的值；否则返回整个配置对象
    return field ? yamlConfig[field] : yamlConfig
  }

  // 设置配置
  async setConfig<T>(type: ConfigFilePathEnum, config: T): Promise<void> {
    // 获取当前配置文件的配置对象
    const yamlConfig = await this.getYamlConfig<T>(type)
    // 将传入的配置对象合并到当前配置对象中
    Object.assign(yamlConfig, config)
    // 将配置对象转换为 YAML 字符串
    const yamlStr = yaml.stringify(yamlConfig)
    // 拼接配置文件路径
    const yamlFilePath = path.join(this.baseDir, type)
    // 将 YAML 字符串写入配置文件
    await fs.writeFile(yamlFilePath, yamlStr)
  }
}
