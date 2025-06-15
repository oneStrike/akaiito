import * as fs from 'node:fs'
import * as path from 'node:path'
import * as maxmind from '@maxmind/geoip2-node'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import axios from 'axios'
import * as cron from 'node-cron'
import * as tar from 'tar'
import { MaxMindConfigService } from '@/config/maxmind.config'

/**
 * IP地理位置信息接口
 */
export interface GeoLocationInfo {
  /** 国家 */
  country?: string
  /** 省份/州 */
  subdivision?: string
  /** 城市 */
  city?: string
  /** 完整地址描述 */
  fullLocation: string
  /** 是否为内网地址 */
  isPrivate: boolean
}

/**
 * MaxMind GeoIP服务
 * 提供IP地址地理位置解析和数据库自动更新功能
 */
@Injectable()
export class MaxMindGeoIPService implements OnModuleInit {
  private readonly logger = new Logger(MaxMindGeoIPService.name)
  private reader: maxmind.Reader | null = null
  private readonly cityDbPath: string

  constructor(private readonly configService: MaxMindConfigService) {
    const dataDirectory = path.resolve(this.configService.getDataDirectory())
    this.cityDbPath = path.join(dataDirectory, 'GeoLite2-City.mmdb')
  }

  async onModuleInit() {
    // 确保数据目录存在
    await this.ensureDataDirectory()

    // 初始化数据库
    await this.initializeDatabase()

    // 设置每日自动更新任务（每天凌晨2点执行）
    if (this.configService.isAutoUpdateEnabled()) {
      this.scheduleAutoUpdate()
    }
  }

  /**
   * 解析IP地址获取地理位置信息
   * @param ip IP地址
   * @returns 地理位置信息
   */
  async getGeoLocation(ip: string): Promise<GeoLocationInfo> {
    // 检查是否为内网地址
    if (this.isPrivateIP(ip)) {
      return {
        fullLocation: '内网地址',
        isPrivate: true,
      }
    }

    // 检查是否为未知地址
    if (ip === 'Unknown' || !ip) {
      return {
        fullLocation: '未知地址',
        isPrivate: false,
      }
    }

    // 使用MaxMind数据库解析
    if (!this.reader) {
      this.logger.warn('MaxMind数据库未初始化，返回默认地址信息')
      return {
        fullLocation: '外网地址',
        isPrivate: false,
      }
    }
    // @ts-expect-error ignore
    const response = this.reader.city(ip)
    const country =
      response.country?.names?.['zh-CN'] || response.country?.names?.en || ''
    const subdivision =
      response.subdivisions?.[0]?.names?.['zh-CN'] ||
      response.subdivisions?.[0]?.names?.en ||
      ''
    const city =
      response.city?.names?.['zh-CN'] || response.city?.names?.en || ''

    // 构建完整地址
    const locationParts = [country, subdivision, city].filter(Boolean)
    const fullLocation =
      locationParts.length > 0 ? locationParts.join(' ') : '外网地址'

    return {
      country,
      subdivision,
      city,
      fullLocation,
      isPrivate: false,
    }
  }

  /**
   * 检查是否为内网IP地址
   * @param ip IP地址
   * @returns 是否为内网地址
   */
  private isPrivateIP(ip: string): boolean {
    if (ip === '127.0.0.1' || ip === '::1') {
      return true
    }

    // IPv4内网地址段
    const ipv4Patterns = [
      /^192\.168\./,
      /^10\./,
      /^172\.(1[6-9]|2\d|3[01])\./,
      /^169\.254\./,
    ]

    return ipv4Patterns.some((pattern) => pattern.test(ip))
  }

  /**
   * 确保数据目录存在
   */
  private async ensureDataDirectory(): Promise<void> {
    try {
      const dataDirectory = path.dirname(this.cityDbPath)
      if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory, { recursive: true })
        this.logger.log(`创建MaxMind数据目录: ${dataDirectory}`)
      }
    } catch (error) {
      this.logger.error('创建数据目录失败', error.stack)
    }
  }

  /**
   * 初始化数据库
   */
  private async initializeDatabase(): Promise<void> {
    try {
      // 检查数据库文件是否存在
      if (!fs.existsSync(this.cityDbPath)) {
        this.logger.log('MaxMind数据库文件不存在，开始下载...')
        await this.downloadDatabase()
      } else {
        // 检查文件是否过期（超过7天）
        const stats = fs.statSync(this.cityDbPath)
        const daysSinceModified =
          (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24)

        if (daysSinceModified > 7) {
          this.logger.log('MaxMind数据库文件已过期，开始更新...')
          await this.downloadDatabase()
        }
      }

      // 初始化Reader
      await this.initializeReader()
    } catch (error) {
      this.logger.error('初始化MaxMind数据库失败', error.stack)
    }
  }

  /**
   * 初始化Reader
   */
  private async initializeReader(): Promise<void> {
    try {
      if (fs.existsSync(this.cityDbPath)) {
        this.reader = await maxmind.Reader.open(this.cityDbPath)
        this.logger.log('MaxMind GeoIP数据库初始化成功')
      } else {
        this.logger.warn('MaxMind数据库文件不存在，无法初始化Reader')
      }
    } catch (error) {
      this.logger.error('初始化MaxMind Reader失败', error.stack)
    }
  }

  /**
   * 下载MaxMind数据库
   */
  private async downloadDatabase(): Promise<void> {
    try {
      this.logger.log('开始下载MaxMind GeoLite2-City数据库...')
      // 下载tar.gz格式文件
      const licenseKey = this.configService.getLicenseKey()
      if (!licenseKey) {
        throw new Error('MaxMind许可密钥未配置')
      }

      const tarGzUrl = `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${licenseKey}&suffix=tar.gz`
      const response = await axios({
        method: 'GET',
        url: tarGzUrl,
        responseType: 'stream',
        timeout: this.configService.getDownloadTimeout(),
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      })

      // 创建临时tar.gz文件
      const tempTarPath = `${this.cityDbPath}.tar.gz`
      const writer = fs.createWriteStream(tempTarPath)
      response.data.pipe(writer)

      await new Promise((resolve, reject) => {
        writer.on('finish', async () => {
          try {
            // 解压tar.gz文件
            await this.extractTarGz(tempTarPath)
            resolve(undefined)
          } catch (error) {
            reject(error)
          }
        })
        writer.on('error', reject)
        response.data.on('error', reject)
      })

      this.logger.log('MaxMind数据库下载并解压完成')

      // 重新初始化Reader
      await this.initializeReader()
    } catch (error) {
      this.logger.error('下载MaxMind数据库失败', error.stack)

      // 清理临时文件
      const tempTarPath = `${this.cityDbPath}.tar.gz`
      if (fs.existsSync(tempTarPath)) {
        try {
          fs.unlinkSync(tempTarPath)
        } catch (cleanupError) {
          this.logger.error('清理临时tar.gz文件失败', cleanupError.stack)
        }
      }

      throw error
    }
  }

  /**
   * 解压tar.gz文件并提取.mmdb文件
   * @param tarGzPath tar.gz文件路径
   */
  private async extractTarGz(tarGzPath: string): Promise<void> {
    try {
      const dataDirectory = path.dirname(this.cityDbPath)
      const tempExtractDir = path.join(dataDirectory, 'temp_extract')

      // 确保临时解压目录存在
      if (!fs.existsSync(tempExtractDir)) {
        fs.mkdirSync(tempExtractDir, { recursive: true })
      }

      // 解压tar.gz文件到临时目录
      await tar.extract({
        file: tarGzPath,
        cwd: tempExtractDir,
        strip: 1, // 去掉顶层目录
      })

      // 查找.mmdb文件
      const files = fs.readdirSync(tempExtractDir)
      const mmdbFile = files.find((file) => file.endsWith('.mmdb'))

      if (!mmdbFile) {
        throw new Error('在解压的文件中未找到.mmdb文件')
      }

      const extractedMmdbPath = path.join(tempExtractDir, mmdbFile)

      // 删除旧的.mmdb文件（如果存在）
      if (fs.existsSync(this.cityDbPath)) {
        fs.unlinkSync(this.cityDbPath)
      }

      // 移动.mmdb文件到目标位置
      fs.renameSync(extractedMmdbPath, this.cityDbPath)

      // 清理临时文件和目录
      this.cleanupTempFiles(tempExtractDir, tarGzPath)

      this.logger.log(`成功提取并移动.mmdb文件: ${mmdbFile}`)
    } catch (error) {
      this.logger.error('解压tar.gz文件失败', error.stack)
      throw error
    }
  }

  /**
   * 清理临时文件和目录
   * @param tempDir 临时目录路径
   * @param tarGzPath tar.gz文件路径
   */
  private cleanupTempFiles(tempDir: string, tarGzPath: string): void {
    try {
      // 删除临时解压目录
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true })
      }

      // 删除tar.gz文件
      if (fs.existsSync(tarGzPath)) {
        fs.unlinkSync(tarGzPath)
      }
    } catch (error) {
      this.logger.error('清理临时文件失败', error.stack)
    }
  }

  /**
   * 设置自动更新任务
   */
  private scheduleAutoUpdate(): void {
    const schedule = this.configService.getUpdateSchedule()
    cron.schedule(
      schedule,
      async () => {
        this.logger.log('开始执行MaxMind数据库自动更新任务')
        try {
          await this.downloadDatabase()
          this.logger.log('MaxMind数据库自动更新完成')
        } catch (error) {
          this.logger.error('MaxMind数据库自动更新失败', error.stack)
        }
      },
      {
        timezone: 'Asia/Shanghai',
      },
    )

    this.logger.log(`MaxMind数据库自动更新任务已设置（${schedule}）`)
  }

  /**
   * 手动更新数据库
   */
  async updateDatabase(): Promise<void> {
    this.logger.log('开始手动更新MaxMind数据库')
    await this.downloadDatabase()
    this.logger.log('MaxMind数据库手动更新完成')
  }

  /**
   * 获取数据库信息
   */
  getDatabaseInfo(): { exists: boolean; path: string; lastModified?: Date } {
    const exists = fs.existsSync(this.cityDbPath)
    const info: any = {
      exists,
      path: this.cityDbPath,
    }

    if (exists) {
      const stats = fs.statSync(this.cityDbPath)
      info.lastModified = stats.mtime
    }

    return info
  }
}
