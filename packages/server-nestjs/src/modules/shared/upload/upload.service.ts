import * as crypto from 'node:crypto'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  FileInfoDto,
  FileTypeEnum,
  UploadFileDto,
  UploadMultipleFilesDto,
  UploadMultipleFilesResponseDto,
  UploadSingleFileResponseDto,
} from './dto/upload.dto'
import { FileValidationService } from './file-validation.service'
import { StorageService } from './storage.service'

/**
 * 上传结果接口
 */
interface UploadResult {
  success: boolean
  fileInfo?: FileInfoDto
  error?: string
}

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name)

  constructor(
    private readonly configService: ConfigService,
    private readonly fileValidationService: FileValidationService,
    private readonly storageService: StorageService,
  ) {}

  /**
   * 单文件上传
   */
  async uploadSingleFile(
    file: Express.Multer.File,
    uploadDto: UploadFileDto,
    userAgent?: string,
    clientIp?: string,
  ): Promise<UploadSingleFileResponseDto> {
    const startTime = Date.now()

    try {
      this.logger.log(
        `接收到单文件上传请求，文件名: ${file.originalname}, 大小: ${this.formatFileSize(file.size)}, 场景: ${uploadDto.scene || 'shared'}`,
      )

      // 验证文件
      const validationResult =
        await this.fileValidationService.validateFile(file)

      if (!validationResult.isValid) {
        throw new BadRequestException(`文件验证失败: ${validationResult.error}`)
      }

      // 处理文件上传
      const result = await this.processFileUpload(
        file,
        uploadDto,
        validationResult.fileType!,
        validationResult.hash!,
      )

      if (!result.success) {
        throw new InternalServerErrorException(result.error || '文件处理失败')
      }

      const duration = Date.now() - startTime
      this.logger.log(
        `文件上传成功，文件名: ${file.originalname}, 耗时: ${duration}ms, 路径: ${result.fileInfo!.path}`,
      )

      return {
        success: true,
        message: '文件上传成功',
        data: result.fileInfo!,
        duration,
      }
    } catch (error) {
      const duration = Date.now() - startTime
      this.logger.error(`文件上传失败: ${error.message}`, error.stack)

      return {
        success: false,
        message: error.message || '文件上传失败',
        data: null,
        duration,
      }
    }
  }

  /**
   * 多文件上传
   */
  async uploadMultipleFiles(
    files: Express.Multer.File[],
    uploadDto: UploadMultipleFilesDto,
    userAgent?: string,
    clientIp?: string,
  ): Promise<UploadMultipleFilesResponseDto> {
    const startTime = Date.now()
    const totalSize = files.reduce((sum, file) => sum + file.size, 0)

    try {
      this.logger.log(
        `接收到多文件上传请求，文件数量: ${files.length}, 总大小: ${this.formatFileSize(totalSize)}, 场景: ${uploadDto.scene || 'shared'}`,
      )

      // 检查文件数量限制
      if (files.length > (uploadDto.maxCount || 10)) {
        throw new BadRequestException(
          `文件数量超过限制，最大允许 ${uploadDto.maxCount || 10} 个文件`,
        )
      }

      // 验证所有文件
      const validationResults =
        await this.fileValidationService.validateFiles(files)

      const validFiles: Express.Multer.File[] = []
      const invalidFiles: Array<{ filename: string; error: string }> = []
      const validationData: Array<{ fileType: FileTypeEnum; hash: string }> = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const result = validationResults[i]

        if (result.isValid) {
          validFiles.push(file)
          validationData.push({
            fileType: result.fileType!,
            hash: result.hash!,
          })
        } else {
          invalidFiles.push({
            filename: file.originalname,
            error: result.error!,
          })
        }
      }

      // 处理有效文件
      const uploadResults: UploadResult[] = []
      const successfulUploads: FileInfoDto[] = []
      const failedUploads: Array<{ filename: string; error: string }> = []

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        const { fileType, hash } = validationData[i]

        try {
          const result = await this.processFileUpload(
            file,
            uploadDto,
            fileType,
            hash,
          )
          uploadResults.push(result)

          if (result.success) {
            successfulUploads.push(result.fileInfo!)
          } else {
            failedUploads.push({
              filename: file.originalname,
              error: result.error!,
            })
          }
        } catch (error) {
          failedUploads.push({
            filename: file.originalname,
            error: error.message,
          })
        }
      }

      // 合并失败文件列表
      const allFailedFiles = [...invalidFiles, ...failedUploads]
      const duration = Date.now() - startTime

      return {
        success: successfulUploads.length > 0,
        message: this.generateMultiUploadMessage(
          successfulUploads.length,
          allFailedFiles.length,
        ),
        data: successfulUploads,
        successCount: successfulUploads.length,
        failedCount: allFailedFiles.length,
        duration,
        failedFiles: allFailedFiles.length > 0 ? allFailedFiles : undefined,
      }
    } catch (error) {
      this.logger.error(`多文件上传失败: ${error.message}`, error.stack)

      const duration = Date.now() - startTime
      return {
        success: false,
        message: error.message || '文件上传失败',
        data: [],
        successCount: 0,
        failedCount: files.length,
        duration,
        failedFiles: files.map((f) => ({
          filename: f.originalname,
          error: error.message || '上传失败',
        })),
      }
    }
  }

  /**
   * 处理单个文件上传
   */
  private async processFileUpload(
    file: Express.Multer.File,
    uploadDto: UploadFileDto,
    fileType: FileTypeEnum,
    hash: string,
  ): Promise<UploadResult> {
    try {
      // 生成安全的文件名
      const safeFilename = this.fileValidationService.generateSafeFilename(
        file.originalname,
      )

      // 确定文件类型（如果未指定）
      const finalFileType = uploadDto.fileType || fileType

      // 配置存储路径
      const storageConfig = {
        baseDir: 'public',
        project: uploadDto.project,
        scene: uploadDto.scene || 'shared',
        fileType: finalFileType,
        uploadDate: new Date(),
      }

      // 保存文件
      const storageResult = await this.storageService.saveFile(
        file,
        storageConfig,
        safeFilename,
      )

      if (!storageResult.success) {
        return {
          success: false,
          error: storageResult.error,
        }
      }

      // 构建文件信息
      const fileInfo: FileInfoDto = {
        filename: safeFilename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        path: storageResult.relativePath!,
        url: storageResult.url!,
        fileType: finalFileType,
        uploadTime: new Date(),
        hash,
      }

      return {
        success: true,
        fileInfo,
      }
    } catch (error) {
      this.logger.error(`处理文件上传失败: ${file.originalname}`, error.stack)
      return {
        success: false,
        error: `处理文件失败: ${error.message}`,
      }
    }
  }

  /**
   * 生成上传 ID
   */
  private generateUploadId(): string {
    return `upload_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`
  }

  /**
   * 生成多文件上传消息
   */
  private generateMultiUploadMessage(
    successCount: number,
    failedCount: number,
  ): string {
    if (failedCount === 0) {
      return `所有文件上传成功，共 ${successCount} 个文件`
    }
    if (successCount === 0) {
      return `所有文件上传失败，共 ${failedCount} 个文件`
    }
    return `部分文件上传成功，成功 ${successCount} 个，失败 ${failedCount} 个`
  }

  /**
   * 格式化文件大小
   */
  private formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`
  }

  /**
   * 获取上传统计信息
   */
  async getUploadStats() {
    const storageStats = await this.storageService.getStorageStats()

    return {
      storage: storageStats,
    }
  }

  /**
   * 获取存储统计信息
   */
  async getStorageStats() {
    return await this.storageService.getStorageStats()
  }

  /**
   * 清理过期文件
   */
  async cleanupExpiredFiles(maxAge?: number): Promise<void> {
    await this.storageService.cleanupExpiredFiles(maxAge)
  }
}
