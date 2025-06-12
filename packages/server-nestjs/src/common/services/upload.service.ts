import type { ConfigService } from '@nestjs/config'
import type { FastifyRequest } from 'fastify'
import type { UploadResponseDto } from '@/common/dto/upload.dto'
import type { UploadConfig } from '@/config/upload.config'
import { createHash } from 'node:crypto'
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'node:fs'
import { extname, join } from 'node:path'
import process from 'node:process'
import { pipeline, Transform } from 'node:stream'
import { promisify } from 'node:util'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

const pump = promisify(pipeline)

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name)
  private readonly uploadPath = join(
    process.cwd(),
    process.env.UPLOAD_DIR || 'uploads',
  )

  private uploadConfig: UploadConfig | null = null
  private mimeTypeMap: Map<string, string> = new Map()

  constructor(private configService: ConfigService) {}

  /**
   * 初始化MIME类型映射表（性能优化：避免重复数组查找）
   */
  private initializeMimeTypeMap(): void {
    if (this.mimeTypeMap.size > 0) {
      return // 已经初始化过了
    }

    const config = this.getUploadConfig()
    const typeCategories = [
      { category: 'image', types: config.imageType.mimeTypes },
      { category: 'audio', types: config.audioType.mimeTypes },
      { category: 'video', types: config.videoType.mimeTypes },
      { category: 'document', types: config.documentType.mimeTypes },
      { category: 'archive', types: config.archiveType.mimeTypes },
    ]

    typeCategories.forEach(({ category, types }) => {
      types.forEach((mimeType) => {
        this.mimeTypeMap.set(mimeType, category)
      })
    })
  }

  private getUploadConfig(): UploadConfig {
    // 缓存配置以避免重复获取
    if (!this.uploadConfig) {
      this.uploadConfig = this.configService.get<UploadConfig>('upload')!
    }
    return this.uploadConfig
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
   * 根据MIME类型获取文件类型分类（性能优化：使用Map查找）
   * @param mimeType MIME类型
   * @returns 文件类型分类
   */
  private getFileTypeCategory(mimeType: string): string {
    // 确保MIME类型映射表已初始化
    this.initializeMimeTypeMap()
    return this.mimeTypeMap.get(mimeType) || 'other'
  }

  /**
   * 生成文件保存路径
   * @param fileType 文件类型
   * @param scene 场景
   * @returns 文件保存路径
   */
  private generateFilePath(fileType: string, scene: string): string {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0') // 月份从0开始
    const day = String(today.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}` // 按服务器本地时区
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
   * 创建文件处理流（包含大小监控和哈希计算）
   * @param config 上传配置
   * @param filename 文件名
   * @returns 转换流和状态对象
   */
  private createFileProcessingStream(config: UploadConfig, filename: string) {
    let totalSize = 0
    const hash = createHash('md5')

    const processingStream = new Transform({
      transform(chunk: any, encoding: any, callback: any) {
        totalSize += chunk.length

        // 实时检查文件大小，超过限制立即停止
        if (totalSize > config.maxFileSize) {
          const error = new BadRequestException(
            `文件 ${filename} 大小超出限制 ${config.maxFileSize} 字节`,
          )
          return callback(error)
        }

        hash.update(chunk)
        callback(null, chunk)
      },
    })

    return {
      stream: processingStream,
      getSize: () => totalSize,
      getHash: () => hash.digest('hex'),
    }
  }

  /**
   * 上传多个文件（性能优化：并行处理，内联文件处理逻辑）
   * @param data Fastify multipart数据
   * @param scene 场景
   * @returns 上传结果数组
   */
  async uploadMultipleFiles(
    data: FastifyRequest,
    scene?: string,
  ): Promise<UploadResponseDto[]> {
    const config = this.getUploadConfig()
    const files = data.files()
    const filePromises: Promise<UploadResponseDto | null>[] = []
    const errors: Error[] = []

    scene = scene || 'shared' // 默认场景

    // 收集所有文件处理任务
    for await (const file of files) {
      // 内联文件处理逻辑以提高性能
      const filePromise = (async (): Promise<UploadResponseDto | null> => {
        const startTime = Date.now()

        try {
          // 验证文件
          this.validateFile(file, config)

          // 获取文件类型分类
          const fileType = this.getFileTypeCategory(file.mimetype)

          // 生成保存路径
          const savePath = this.generateFilePath(fileType, scene)
          this.ensureUploadDirectory(savePath)

          // 生成文件名
          const ext = extname(file.filename)
          const filename = `${uuidv4()}${ext}`

          const fullPath = join(savePath, filename)
          const writeStream = createWriteStream(fullPath)

          // 创建文件处理流
          const {
            stream: processingStream,
            getSize,
            getHash,
          } = this.createFileProcessingStream(config, file.filename)

          try {
            // 使用管道流式处理文件
            await pump(file.file, processingStream, writeStream)

            // 检查文件是否被截断（超出大小限制）
            if (file.file.truncated) {
              // 删除已写入的部分文件
              try {
                if (existsSync(fullPath)) {
                  unlinkSync(fullPath)
                  this.logger.warn(
                    `文件 ${file.filename} 超出大小限制，已删除磁盘残留文件: ${fullPath}`,
                  )
                }
              } catch (deleteError) {
                this.logger.error(
                  `删除超限文件时出错: ${deleteError.message}`,
                  deleteError.stack,
                )
              }
              throw new BadRequestException(
                `文件 ${file.filename} 超出大小限制 ${config.maxFileSize} 字节`,
              )
            }

            const processingTime = Date.now() - startTime
            const fileSize = getSize()
            const fileHash = getHash()

            // 二次验证文件大小（防止流处理过程中的边界情况）
            if (fileSize > config.maxFileSize) {
              // 删除已写入的文件
              try {
                if (existsSync(fullPath)) {
                  unlinkSync(fullPath)
                  this.logger.warn(
                    `文件 ${file.filename} 实际大小超限，已删除: ${fullPath}`,
                  )
                }
              } catch (deleteError) {
                this.logger.error(
                  `删除超限文件时出错: ${deleteError.message}`,
                  deleteError.stack,
                )
              }
              throw new BadRequestException(
                `文件 ${file.filename} 大小 ${fileSize} 字节超出限制 ${config.maxFileSize} 字节`,
              )
            }

            this.logger.log(
              `文件上传成功: ${file.filename} (${fileSize} bytes, ${processingTime}ms, hash: ${fileHash})`,
            )
            console.log(this.uploadPath)
            // 计算相对路径（相对于uploads目录）
            const filePath = fullPath
              .replace(process.cwd(), '')
              .replace(/^[/\\]/, '')
              .replace(/\\/g, '/')

            return {
              filename,
              originalName: file.filename,
              filePath,
              fileSize,
              mimeType: file.mimetype,
              fileType,
              scene,
              uploadTime: new Date(),
            }
          } catch (error) {
            // 如果上传失败，尝试删除已创建的文件
            try {
              if (existsSync(fullPath)) {
                unlinkSync(fullPath)
                this.logger.warn(`上传失败，已删除残留文件: ${fullPath}`)
              }
            } catch (deleteError) {
              this.logger.error(
                `删除失败文件时出错: ${deleteError.message}`,
                deleteError.stack,
              )
            }
            throw error
          }
        } catch (error) {
          errors.push(error as Error)
          return null
        }
      })()

      filePromises.push(filePromise)
    }

    if (filePromises.length === 0) {
      throw new BadRequestException('没有有效的文件被上传')
    }

    // 并行处理所有文件
    const results = await Promise.all(filePromises)

    // 过滤掉失败的文件
    const successResults = results.filter(
      (result) => result !== null,
    ) as UploadResponseDto[]

    // 如果有错误且没有成功的文件，抛出第一个错误
    if (errors.length > 0 && successResults.length === 0) {
      throw errors[0]
    }

    // 如果有部分失败，记录警告
    if (errors.length > 0) {
      this.logger.warn(
        `${errors.length} 个文件上传失败，${successResults.length} 个文件上传成功`,
      )
    }

    return successResults
  }
}
