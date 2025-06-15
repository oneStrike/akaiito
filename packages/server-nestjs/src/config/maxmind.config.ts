import * as process from 'node:process'
import { Injectable } from '@nestjs/common'
import { ConfigService, registerAs } from '@nestjs/config'

/**
 * MaxMind配置接口
 */
export interface MaxMindConfig {
  /** MaxMind许可密钥 */
  licenseKey: string
  /** 数据库存储目录 */
  dataDirectory: string
  /** 是否启用自动更新 */
  enableAutoUpdate: boolean
  /** 自动更新时间（cron表达式） */
  updateSchedule: string
  /** 下载超时时间（毫秒） */
  downloadTimeout: number
}

/**
 * MaxMind配置工厂函数
 * 使用 registerAs 延迟加载环境变量，确保在 ConfigModule 初始化后读取
 */
export default registerAs('maxmind', (): MaxMindConfig => {
  return {
    licenseKey: process.env.MAXMIND_LICENSE_KEY || '',
    dataDirectory: process.env.MAXMIND_DATA_DIR || './data/maxmind',
    enableAutoUpdate: process.env.MAXMIND_AUTO_UPDATE !== 'false',
    updateSchedule: process.env.MAXMIND_UPDATE_SCHEDULE || '0 2 * * *', // 每天凌晨2点
    downloadTimeout: Number.parseInt(
      process.env.MAXMIND_DOWNLOAD_TIMEOUT || '300000',
    ), // 5分钟
  }
})

/**
 * MaxMind配置服务
 */
@Injectable()
export class MaxMindConfigService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * 获取MaxMind配置
   */
  getConfig(): MaxMindConfig {
    return this.configService.get<MaxMindConfig>('maxmind')!
  }

  /**
   * 获取许可密钥
   */
  getLicenseKey(): string {
    return this.configService.get<string>('maxmind.licenseKey', '')!
  }

  /**
   * 获取数据目录
   */
  getDataDirectory(): string {
    return this.configService.get<string>('maxmind.dataDirectory', './data/maxmind')!
  }

  /**
   * 是否启用自动更新
   */
  isAutoUpdateEnabled(): boolean {
    return this.configService.get<boolean>('maxmind.enableAutoUpdate', true)!
  }

  /**
   * 获取更新计划
   */
  getUpdateSchedule(): string {
    return this.configService.get<string>('maxmind.updateSchedule', '0 2 * * *')!
  }

  /**
   * 获取下载超时时间
   */
  getDownloadTimeout(): number {
    return this.configService.get<number>('maxmind.downloadTimeout', 300000)!
  }
}
