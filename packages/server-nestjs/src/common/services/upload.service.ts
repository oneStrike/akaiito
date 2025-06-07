import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'node:fs'
import { extname, join } from 'node:path'
import { pipeline, Transform } from 'node:stream'
import { promisify } from 'node:util'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'
import {
  archiveType,
  audioType,
  documentType,
  imageType,
  UploadConfig,
  videoType,
} from '@/config/upload.config'

const pump = promisify(pipeline)

@Injectable()
export class UploadService {
  private readonly uploadPath = join(process.cwd(), 'uploads')

  constructor(private configService: ConfigService) {}

  private getUploadConfig(): UploadConfig {
    // 获取 'upload' 命名空间下的配置
    return this.configService.get<UploadConfig>('upload')!
  }

  /**
   * 确保上传目录存在
   * @param dirPath 目录路径
   */
  private ensureUploadDirectory(dirPath: string) {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true })
    }
  }

  /**
   * 根据MIME类型获取文件类型分类
   * @param mimeType MIME类型
   * @returns 文件类型分类
   */
  private getFileTypeCategory(mimeType: string): string {
    if (imageType.mimeTypes.includes(mimeType)) {
      return 'image'
    }
    if (audioType.mimeTypes.includes(mimeType)) {
      return 'audio'
    }
    if (videoType.mimeTypes.includes(mimeType)) {
      return 'video'
    }
    if (documentType.mimeTypes.includes(mimeType)) {
      return 'document'
    }
    if (archiveType.mimeTypes.includes(mimeType)) {
      return 'archive'
    }
    return 'other'
  }

  /**
   * 生成文件保存路径
   * @param fileType 文件类型
   * @param scene 场景
   * @returns 文件保存路径
   */
  private generateFilePath(fileType: string, scene: string): string {
    const today = new Date()
    const dateStr = today.toISOString().split('T')[0] // YYYY-MM-DD格式
    return join(this.uploadPath, dateStr, fileType, scene)
  }

  /**
   * 验证文件类型和大小
   * @param file 文件对象
   * @param config 上传配置
   */
  private validateFile(file: any, config: UploadConfig): void {
    // 验证MIME类型
    if (!config.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `文件 ${file.filename} 类型不支持: ${file.mimetype}`,
      )
    }

    // 验证文件扩展名
    const ext = extname(file.filename).toLowerCase()
    if (!config.allowedExtensions.includes(ext)) {
      throw new BadRequestException(
        `文件 ${file.filename} 扩展名不支持: ${ext}`,
      )
    }

    // 验证文件大小（注意：在流式处理中，我们需要在处理过程中检查大小）
    // 这里我们先做一个基本检查，实际大小检查在流处理中进行
  }

  /**
   * 上传多个文件
   * @param data Fastify multipart数据
   * @returns 上传结果数组
   */
  async uploadMultipleFiles(data: any): Promise<
    Array<{
      filename: string
      originalName: string
      path: string
      relativePath: string
      size: number
      mimeType: string
      fileType: string
      scene: string
    }>
  > {
    const files = data.files()
    const results: any[] = []
    const config = this.getUploadConfig()

    let fileCount = 0

    for await (const file of files) {
      // 检查文件数量限制
      if (fileCount >= config.maxFiles) {
        throw new BadRequestException(
          `文件数量超出限制，最多允许上传 ${config.maxFiles} 个文件`,
        )
      }

      // 获取场景，默认为 'shared'
      const scene = file.fields?.scene?.value || 'shared'

      // 验证文件
      this.validateFile(file, config)

      // 获取文件类型分类
      const fileType = this.getFileTypeCategory(file.mimetype)

      // 生成保存路径
      const savePath = this.generateFilePath(fileType, scene)
      this.ensureUploadDirectory(savePath)

      // 生成文件名
      const ext = extname(file.filename)
      const filename = config.preserveOriginalName
        ? `${uuidv4()}-${file.filename}`
        : `${uuidv4()}${ext}`

      const fullPath = join(savePath, filename)

      // 创建写入流并监控文件大小
      let totalSize = 0
      const writeStream = createWriteStream(fullPath)

      // 创建一个转换流来监控文件大小
      const sizeMonitorStream = new Transform({
        transform(chunk: any, encoding: any, callback: any) {
          totalSize += chunk.length
          if (totalSize > config.maxFileSize) {
            const error = new BadRequestException(
              `文件 ${file.filename} 大小超出限制，最大允许 ${Math.round(config.maxFileSize / 1024 / 1024)}MB`,
            )
            callback(error)
            return
          }
          callback(null, chunk)
        },
      })

      try {
        // 使用管道流式处理文件
        await pump(file.file, sizeMonitorStream, writeStream)

        // 计算相对路径（相对于uploads目录）
        const relativePath = fullPath
          .replace(this.uploadPath, '')
          .replace(/^[\\/]/, '')

        results.push({
          filename,
          originalName: file.filename,
          path: fullPath,
          relativePath,
          size: totalSize,
          mimeType: file.mimetype,
          fileType,
          scene,
        })

        fileCount++
      } catch (error) {
        // 如果上传失败，尝试删除已创建的文件
        try {
          if (existsSync(fullPath)) {
            unlinkSync(fullPath)
          }
        } catch (deleteError) {
          console.error('删除失败文件时出错:', deleteError)
        }
        throw error
      }
    }

    if (results.length === 0) {
      throw new BadRequestException('没有有效的文件被上传')
    }

    return results
  }
}
