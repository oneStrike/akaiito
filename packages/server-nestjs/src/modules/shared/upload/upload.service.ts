import { promises as fs } from 'node:fs'
import { extname, join } from 'node:path'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as mime from 'mime-types'
import { v4 as uuidv4 } from 'uuid'
import {
  FileInfoDto,
  FileUploadResponseDto,
  MultipleFileUploadResponseDto,
  UploadConfigResponseDto,
} from '@/common/dto/upload.dto'
import { UploadConfig } from '@/config/upload.config'

/**
 * 文件信息接口
 */
export interface FileInfo {
  id: string
  originalName: string
  fileName: string
  filePath: string
  size: number
  mimeType: string
  extension: string
  uploadTime: Date
  uploaderId?: string
}

/**
 * 文件上传服务
 */
@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name)
  private readonly uploadConfig: UploadConfig
  private readonly fileStorage = new Map<string, FileInfo>() // 简单的内存存储，实际项目中应使用数据库

  constructor(private readonly configService: ConfigService) {
    this.uploadConfig = this.configService.get<UploadConfig>('upload')!
  }

  /**
   * 单文件上传
   */
  async uploadSingleFile(
    file: Express.Multer.File,
    uploaderId?: string,
  ): Promise<FileUploadResponseDto> {
    try {
      this.logger.log(`开始上传单个文件: ${file.originalname}`)

      // 验证文件
      await this.validateFile(file)

      // 生成文件信息
      const fileInfo = await this.processFile(file, uploaderId)

      // 存储文件信息
      this.fileStorage.set(fileInfo.id, fileInfo)

      // 记录上传日志
      this.logger.log(
        `文件上传成功: ${file.originalname} -> ${fileInfo.fileName}, 大小: ${file.size} bytes`,
      )

      return this.mapToResponseDto(fileInfo)
    } catch (error) {
      this.logger.error(`单文件上传失败: ${file.originalname}`, error.stack)
      throw error
    }
  }

  /**
   * 多文件上传
   */
  async uploadMultipleFiles(
    files: Express.Multer.File[],
    uploaderId?: string,
  ): Promise<MultipleFileUploadResponseDto> {
    this.logger.log(`开始上传多个文件，数量: ${files.length}`)

    const successFiles: FileUploadResponseDto[] = []
    const failedFiles: { originalName: string; error: string }[] = []

    // 验证文件数量
    if (files.length > this.uploadConfig.maxFiles) {
      throw new BadRequestException(
        `文件数量超出限制，最多允许上传 ${this.uploadConfig.maxFiles} 个文件`,
      )
    }

    // 并发处理文件上传
    const uploadPromises = files.map(async (file) => {
      try {
        const result = await this.uploadSingleFile(file, uploaderId)
        successFiles.push(result)
      } catch (error) {
        failedFiles.push({
          originalName: file.originalname,
          error: error.message,
        })
        this.logger.warn(`文件上传失败: ${file.originalname}, 错误: ${error.message}`)
      }
    })

    await Promise.allSettled(uploadPromises)

    this.logger.log(
      `多文件上传完成，成功: ${successFiles.length}, 失败: ${failedFiles.length}`,
    )

    return {
      successFiles,
      failedFiles,
      totalFiles: files.length,
      successCount: successFiles.length,
      failedCount: failedFiles.length,
    }
  }

  /**
   * 获取文件信息
   */
  async getFileInfo(fileId: string): Promise<FileInfoDto | null> {
    const fileInfo = this.fileStorage.get(fileId)
    if (!fileInfo) {
      return null
    }

    return {
      id: fileInfo.id,
      originalName: fileInfo.originalName,
      size: fileInfo.size,
      mimeType: fileInfo.mimeType,
      uploadTime: fileInfo.uploadTime,
      status: 'active',
      uploaderId: fileInfo.uploaderId,
    }
  }

  /**
   * 删除文件
   */
  async deleteFiles(fileIds: string[]): Promise<{ deletedCount: number; errors: string[] }> {
    const errors: string[] = []
    let deletedCount = 0

    for (const fileId of fileIds) {
      try {
        const fileInfo = this.fileStorage.get(fileId)
        if (!fileInfo) {
          errors.push(`文件不存在: ${fileId}`)
          continue
        }

        // 删除物理文件
        await fs.unlink(fileInfo.filePath)

        // 从存储中移除
        this.fileStorage.delete(fileId)
        deletedCount++

        this.logger.log(`文件删除成功: ${fileInfo.fileName}`)
      } catch (error) {
        errors.push(`删除文件失败 ${fileId}: ${error.message}`)
        this.logger.error(`删除文件失败: ${fileId}`, error.stack)
      }
    }

    return { deletedCount, errors }
  }

  /**
   * 获取上传配置
   */
  getUploadConfig(): UploadConfigResponseDto {
    return {
      maxFileSize: this.uploadConfig.maxFileSize,
      maxFiles: this.uploadConfig.maxFiles,
      allowedMimeTypes: this.uploadConfig.allowedMimeTypes,
      allowedExtensions: this.uploadConfig.allowedExtensions,
    }
  }

  /**
   * 验证文件
   */
  private async validateFile(file: Express.Multer.File): Promise<void> {
    // 验证文件大小
    if (file.size > this.uploadConfig.maxFileSize) {
      throw new BadRequestException(
        `文件大小超出限制，最大允许 ${this.uploadConfig.maxFileSize / 1024 / 1024}MB`,
      )
    }

    // 验证文件类型
    const ext = extname(file.originalname).toLowerCase()
    if (!this.uploadConfig.allowedExtensions.includes(ext)) {
      throw new BadRequestException(`不支持的文件扩展名: ${ext}`)
    }

    if (!this.uploadConfig.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`不支持的文件类型: ${file.mimetype}`)
    }

    // 二次验证：检查文件内容与扩展名是否匹配
    await this.validateFileContent(file)
  }

  /**
   * 验证文件内容
   */
  private async validateFileContent(file: Express.Multer.File): Promise<void> {
    try {
      // 读取文件头部字节进行验证
      const buffer = file.buffer || (await fs.readFile(file.path))
      const fileSignature = this.getFileSignature(buffer)
      const expectedMimeType = mime.lookup(file.originalname)

      // 简单的文件头验证
      if (expectedMimeType && expectedMimeType !== file.mimetype) {
        this.logger.warn(
          `文件类型不匹配: 期望 ${expectedMimeType}, 实际 ${file.mimetype}`,
        )
      }

      // 验证常见文件类型的魔数
      this.validateFileSignature(fileSignature, file.mimetype)
    } catch (error) {
      this.logger.error('文件内容验证失败', error.stack)
      throw new BadRequestException('文件内容验证失败，可能是恶意文件')
    }
  }

  /**
   * 获取文件签名（魔数）
   */
  private getFileSignature(buffer: Buffer): string {
    return buffer.subarray(0, 8).toString('hex').toUpperCase()
  }

  /**
   * 验证文件签名
   */
  private validateFileSignature(signature: string, mimeType: string): void {
    const validSignatures: Record<string, string[]> = {
      'image/jpeg': ['FFD8FF'],
      'image/png': ['89504E47'],
      'image/gif': ['47494638'],
      'application/pdf': ['25504446'],
      'text/plain': [], // 文本文件没有固定签名
    }

    const expectedSignatures = validSignatures[mimeType]
    if (expectedSignatures && expectedSignatures.length > 0) {
      const isValid = expectedSignatures.some((expected) => signature.startsWith(expected))
      if (!isValid) {
        throw new BadRequestException('文件签名验证失败，文件可能已损坏或被篡改')
      }
    }
  }

  /**
   * 处理文件
   */
  private async processFile(file: Express.Multer.File, uploaderId?: string): Promise<FileInfo> {
    const fileId = uuidv4()
    const ext = extname(file.originalname)
    const fileName = `${fileId}_${Date.now()}${ext}`
    const filePath = join(this.uploadConfig.uploadDir, fileName)

    // 如果文件还没有保存到磁盘，则保存
    if (file.buffer) {
      await fs.writeFile(filePath, file.buffer)
    }

    return {
      id: fileId,
      originalName: file.originalname,
      fileName,
      filePath,
      size: file.size,
      mimeType: file.mimetype,
      extension: ext,
      uploadTime: new Date(),
      uploaderId,
    }
  }

  /**
   * 映射到响应DTO
   */
  private mapToResponseDto(fileInfo: FileInfo): FileUploadResponseDto {
    return {
      id: fileInfo.id,
      originalName: fileInfo.originalName,
      fileName: fileInfo.fileName,
      filePath: fileInfo.filePath,
      size: fileInfo.size,
      mimeType: fileInfo.mimeType,
      extension: fileInfo.extension,
      uploadTime: fileInfo.uploadTime,
      url: `/api/upload/file/${fileInfo.id}`, // 文件访问URL
    }
  }
}
