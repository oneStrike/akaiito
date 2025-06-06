import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FileTypeEnum, ProjectEnum } from './dto/upload.dto'

/**
 * 存储路径配置接口
 */
interface StoragePathConfig {
  baseDir: string
  project: ProjectEnum
  scene: string
  fileType: FileTypeEnum
  uploadDate: Date
}

/**
 * 存储结果接口
 */
interface StorageResult {
  success: boolean
  filePath?: string
  relativePath?: string
  url?: string
  error?: string
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name)
  private readonly baseUploadDir: string
  private readonly publicBaseUrl: string

  constructor(private readonly configService: ConfigService) {
    this.baseUploadDir = this.configService.get<string>(
      'UPLOAD_BASE_DIR',
      'public',
    )
    this.publicBaseUrl = this.configService.get<string>(
      'PUBLIC_BASE_URL',
      '/public',
    )
  }

  /**
   * 生成存储路径
   * 格式: public/admin/uploads/2025/05/05/shared/images
   */
  generateStoragePath(config: StoragePathConfig): string {
    const { project, scene, fileType, uploadDate } = config

    const year = uploadDate.getFullYear()
    const month = String(uploadDate.getMonth() + 1).padStart(2, '0')
    const day = String(uploadDate.getDate()).padStart(2, '0')

    return path.join(
      this.baseUploadDir,
      project,
      'uploads',
      String(year),
      month,
      day,
      scene,
      fileType,
    )
  }

  /**
   * 确保目录存在，如果不存在则创建
   */
  async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      await fs.access(dirPath)
    } catch (error) {
      // 目录不存在，创建目录
      await fs.mkdir(dirPath, { recursive: true })
      this.logger.log(`创建目录: ${dirPath}`)
    }
  }

  /**
   * 保存文件到指定路径
   */
  async saveFile(
    file: Express.Multer.File,
    config: StoragePathConfig,
    filename: string,
  ): Promise<StorageResult> {
    try {
      const storageDir = this.generateStoragePath(config)
      await this.ensureDirectoryExists(storageDir)

      const filePath = path.join(storageDir, filename)
      const relativePath = path.relative(process.cwd(), filePath)

      // 写入文件
      await fs.writeFile(filePath, file.buffer)

      // 生成访问 URL
      const url = this.generateFileUrl(relativePath)

      this.logger.log(`文件保存成功: ${relativePath}`)

      return {
        success: true,
        filePath,
        relativePath,
        url,
      }
    } catch (error) {
      this.logger.error(`文件保存失败: ${error.message}`, error.stack)
      return {
        success: false,
        error: `文件保存失败: ${error.message}`,
      }
    }
  }

  /**
   * 批量保存文件
   */
  async saveFiles(
    files: Express.Multer.File[],
    config: StoragePathConfig,
    filenames: string[],
  ): Promise<StorageResult[]> {
    const results: StorageResult[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const filename = filenames[i]
      const result = await this.saveFile(file, config, filename)
      results.push(result)
    }

    return results
  }

  /**
   * 生成文件访问 URL
   */
  private generateFileUrl(relativePath: string): string {
    // 将 Windows 路径分隔符转换为 URL 分隔符
    const urlPath = relativePath.replace(/\\/g, '/')
    return `${this.publicBaseUrl}/${urlPath}`.replace(/\/+/g, '/')
  }

  /**
   * 删除文件
   */
  async deleteFile(filePath: string): Promise<boolean> {
    try {
      await fs.unlink(filePath)
      this.logger.log(`文件删除成功: ${filePath}`)
      return true
    } catch (error) {
      this.logger.error(`文件删除失败: ${filePath}`, error.stack)
      return false
    }
  }

  /**
   * 检查文件是否存在
   */
  async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }

  /**
   * 获取文件信息
   */
  async getFileStats(filePath: string) {
    try {
      return await fs.stat(filePath)
    } catch {
      return null
    }
  }

  /**
   * 清理过期文件（可选功能）
   */
  async cleanupExpiredFiles(
    maxAge: number = 30 * 24 * 60 * 60 * 1000,
  ): Promise<void> {
    try {
      const now = Date.now()
      await this.cleanupDirectory(this.baseUploadDir, now, maxAge)
    } catch (error) {
      this.logger.error(`清理过期文件失败: ${error.message}`, error.stack)
    }
  }

  /**
   * 递归清理目录中的过期文件
   */
  private async cleanupDirectory(
    dirPath: string,
    now: number,
    maxAge: number,
  ): Promise<void> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name)

        if (entry.isDirectory()) {
          await this.cleanupDirectory(fullPath, now, maxAge)

          // 检查目录是否为空，如果为空则删除
          const remainingEntries = await fs.readdir(fullPath)
          if (remainingEntries.length === 0) {
            await fs.rmdir(fullPath)
            this.logger.log(`删除空目录: ${fullPath}`)
          }
        } else if (entry.isFile()) {
          const stats = await fs.stat(fullPath)
          const fileAge = now - stats.mtime.getTime()

          if (fileAge > maxAge) {
            await fs.unlink(fullPath)
            this.logger.log(`删除过期文件: ${fullPath}`)
          }
        }
      }
    } catch (error) {
      this.logger.error(`清理目录失败: ${dirPath}`, error.stack)
    }
  }

  /**
   * 获取存储统计信息
   */
  async getStorageStats(): Promise<{
    totalFiles: number
    totalSize: number
    byProject: Record<string, { files: number; size: number }>
  }> {
    const stats = {
      totalFiles: 0,
      totalSize: 0,
      byProject: {} as Record<string, { files: number; size: number }>,
    }

    try {
      await this.calculateDirectoryStats(this.baseUploadDir, stats)
    } catch (error) {
      this.logger.error(`获取存储统计失败: ${error.message}`, error.stack)
    }

    return stats
  }

  /**
   * 递归计算目录统计信息
   */
  private async calculateDirectoryStats(
    dirPath: string,
    stats: any,
    currentProject?: string,
  ): Promise<void> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name)

        if (entry.isDirectory()) {
          // 检查是否是项目目录
          const isProjectDir = Object.values(ProjectEnum).includes(
            entry.name as ProjectEnum,
          )
          const project = isProjectDir ? entry.name : currentProject

          await this.calculateDirectoryStats(fullPath, stats, project)
        } else if (entry.isFile()) {
          const fileStats = await fs.stat(fullPath)
          stats.totalFiles++
          stats.totalSize += fileStats.size

          if (currentProject) {
            if (!stats.byProject[currentProject]) {
              stats.byProject[currentProject] = { files: 0, size: 0 }
            }
            stats.byProject[currentProject].files++
            stats.byProject[currentProject].size += fileStats.size
          }
        }
      }
    } catch (error) {
      this.logger.error(`计算目录统计失败: ${dirPath}`, error.stack)
    }
  }
}
