import { Buffer } from 'node:buffer'
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
    scene?: string,
  ): Promise<FileUploadResponseDto> {
    try {
      this.logger.log(
        `开始上传单个文件: ${file.originalname}, 场景: ${scene || 'shared'}`,
      )

      // 验证文件
      await this.validateFile(file)

      // 生成文件信息
      const fileInfo = await this.processFile(file, scene)

      // 存储文件信息
      this.fileStorage.set(fileInfo.id, fileInfo)

      // 记录上传日志
      this.logger.log(
        `文件上传成功: ${file.originalname} -> ${fileInfo.fileName}, 大小: ${file.size} bytes, 场景: ${scene || 'shared'}`,
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
    scene?: string,
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
        const result = await this.uploadSingleFile(file, scene)
        successFiles.push(result)
      } catch (error) {
        failedFiles.push({
          originalName: file.originalname,
          error: error.message,
        })
        this.logger.warn(
          `文件上传失败: ${file.originalname}, 错误: ${error.message}`,
        )
      }
    })

    await Promise.allSettled(uploadPromises)

    this.logger.log(
      `多文件上传完成，成功: ${successFiles.length}, 失败: ${failedFiles.length}`,
    )

    return {
      successFiles,
      failedFiles,
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
      fileName: fileInfo.fileName,
      filePath: fileInfo.filePath,
      size: fileInfo.size,
      mimeType: fileInfo.mimeType,
      extension: fileInfo.extension,
      uploadTime: fileInfo.uploadTime,
    }
  }

  /**
   * 删除文件
   */
  async deleteFiles(
    fileIds: string[],
  ): Promise<{ deletedCount: number; errors: string[] }> {
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
      allowedMimeTypes: this.uploadConfig.allowedMimeTypes.all,
      allowedExtensions: this.uploadConfig.allowedExtensions.all,
    }
  }

  /**
   * 验证文件（仅保留FileInterceptor不支持的高级校验）
   */
  private async validateFile(file: Express.Multer.File): Promise<void> {
    // FileInterceptor已经处理了基础的文件大小、扩展名和MIME类型校验
    // 这里只保留高级的文件内容验证
    await this.validateFileContent(file)
  }

  /**
   * 验证文件内容
   */
  private async validateFileContent(file: Express.Multer.File): Promise<void> {
    try {
      // 检查文件是否为空
      if (!file.size || file.size === 0) {
        throw new BadRequestException('文件为空，请选择有效的文件')
      }

      // 读取文件头部字节进行验证
      let buffer: Buffer
      try {
        buffer = file.buffer || (await fs.readFile(file.path))
      } catch (readError) {
        this.logger.error(
          `无法读取文件内容: ${file.originalname}`,
          readError.stack,
        )
        throw new BadRequestException('无法读取文件内容，文件可能已损坏')
      }

      if (!buffer || buffer.length === 0) {
        throw new BadRequestException('文件内容为空或无法读取')
      }

      const fileSignature = this.getFileSignature(buffer)
      const expectedMimeType = mime.lookup(file.originalname)

      // 文件类型一致性验证
      if (expectedMimeType && expectedMimeType !== file.mimetype) {
        this.logger.warn(
          `文件类型不匹配: 文件名期望 ${expectedMimeType}, 实际上传 ${file.mimetype}`,
        )
        // 对于严重的类型不匹配，抛出错误
        if (
          this.isSignificantMimeTypeMismatch(expectedMimeType, file.mimetype)
        ) {
          throw new BadRequestException(
            `文件类型不匹配：文件扩展名与实际内容不符（期望: ${expectedMimeType}, 实际: ${file.mimetype}）`,
          )
        }
      }

      // 验证常见文件类型的魔数
      this.validateFileSignature(
        fileSignature,
        file.mimetype,
        file.originalname,
      )

      // 额外的安全检查
      this.performSecurityChecks(buffer, file)
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      this.logger.error(`文件内容验证失败: ${file.originalname}`, error.stack)
      throw new BadRequestException(
        `文件验证失败: ${error.message || '文件可能已损坏或为恶意文件'}`,
      )
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
  private validateFileSignature(
    signature: string,
    mimeType: string,
    originalName: string,
  ): void {
    const validSignatures: Record<string, string[]> = {
      'image/jpeg': ['FFD8FF'],
      'image/png': ['89504E47'],
      'image/gif': ['47494638', '474946383761', '474946383961'], // GIF87a, GIF89a
      'image/webp': ['52494646'], // RIFF (WebP starts with RIFF)
      'image/bmp': ['424D'], // BM
      'application/pdf': ['25504446'], // %PDF
      'application/zip': ['504B0304', '504B0506', '504B0708'], // PK
      'application/x-rar-compressed': ['526172211A07'], // Rar!
      'video/mp4': ['00000018667479704D534E56', '00000020667479704D534E56'], // ftyp
      'audio/mpeg': ['494433', 'FFFB', 'FFF3', 'FFF2'], // ID3, MP3 frames
      'text/plain': [], // 文本文件没有固定签名
      'application/json': [], // JSON文件没有固定签名
      'text/csv': [], // CSV文件没有固定签名
    }

    const expectedSignatures = validSignatures[mimeType]
    if (expectedSignatures && expectedSignatures.length > 0) {
      const isValid = expectedSignatures.some((expected) =>
        signature.startsWith(expected),
      )
      if (!isValid) {
        this.logger.warn(
          `文件签名验证失败: ${originalName}, 期望签名: ${expectedSignatures.join('|')}, 实际签名: ${signature}`,
        )
        throw new BadRequestException(
          `文件签名验证失败：${originalName} 的文件内容与声明的类型不匹配，可能是恶意文件或文件已损坏`,
        )
      }
    }
  }

  /**
   * 检查是否为严重的MIME类型不匹配
   */
  private isSignificantMimeTypeMismatch(
    expected: string,
    actual: string,
  ): boolean {
    // 定义严重不匹配的情况
    const dangerousMismatches = [
      // 可执行文件伪装成其他类型
      {
        expected: /^(image|text|application\/pdf)/,
        actual: /^application\/(x-)?executable/,
      },
      // 脚本文件伪装成图片
      {
        expected: /^image/,
        actual: /^(text\/html|application\/javascript|text\/javascript)/,
      },
      // 压缩文件伪装成图片
      { expected: /^image/, actual: /^application\/(zip|x-rar|x-7z)/ },
    ]

    return dangerousMismatches.some(
      ({ expected: expPattern, actual: actPattern }) =>
        expPattern.test(expected) && actPattern.test(actual),
    )
  }

  /**
   * 执行额外的安全检查
   */
  private performSecurityChecks(
    buffer: Buffer,
    file: Express.Multer.File,
  ): void {
    // 检查文件是否包含可疑的脚本内容
    const content = buffer.toString('utf8', 0, Math.min(buffer.length, 1024)) // 只检查前1KB

    // 检查是否包含恶意脚本标签
    const maliciousPatterns = [
      /<script[^>]*>/i,
      /<iframe[^>]*>/i,
      /<object[^>]*>/i,
      /<embed[^>]*>/i,
      /javascript:/i,
      /vbscript:/i,
      /on\w+\s*=/i, // 事件处理器如 onclick=
    ]

    const foundMalicious = maliciousPatterns.some((pattern) =>
      pattern.test(content),
    )
    if (foundMalicious) {
      this.logger.warn(`检测到可疑内容: ${file.originalname}`)
      throw new BadRequestException('文件包含可疑内容，上传被拒绝')
    }

    // 检查文件名是否包含可疑字符
    const suspiciousNamePatterns = [
      /\.(exe|bat|cmd|scr|pif|com)$/i, // 可执行文件扩展名
      /\.(php|asp|jsp|js)$/i, // 脚本文件扩展名（如果不在允许列表中）
      /[<>:"|?*]/, // Windows文件名非法字符
      /\.\./, // 路径遍历
    ]

    const hasSuspiciousName = suspiciousNamePatterns.some((pattern) =>
      pattern.test(file.originalname),
    )
    if (hasSuspiciousName) {
      this.logger.warn(`可疑文件名: ${file.originalname}`)
      throw new BadRequestException('文件名包含非法字符或可疑扩展名')
    }
  }

  /**
   * 处理文件
   */
  private async processFile(
    file: Express.Multer.File,
    scene?: string,
  ): Promise<FileInfo> {
    const fileId = uuidv4()
    const ext = extname(file.originalname)
    const fileName = `${fileId}_${Date.now()}${ext}`

    // 生成分层目录结构: uploads/2025/01/15/场景/文件类型/
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const sceneDir = scene || 'shared'
    const fileType = this.getFileTypeFromMimeType(file.mimetype)

    const relativePath = join(String(year), month, day, sceneDir, fileType)
    const fullDir = join(this.uploadConfig.uploadDir, relativePath)
    const filePath = join(fullDir, fileName)

    try {
      // 确保目录存在
      await this.ensureDirectoryExists(fullDir)

      // 如果文件还没有保存到磁盘，则保存
      if (file.buffer) {
        await fs.writeFile(filePath, file.buffer)
        this.logger.log(`文件从内存缓冲区保存到: ${filePath}`)
      } else if (file.path) {
        // 如果文件已经保存到临时路径，优化文件移动操作
        await this.moveFileOptimized(file.path, filePath)
        this.logger.log(`文件从临时路径移动到: ${filePath}`)
      } else {
        throw new BadRequestException('文件数据不可用，无法保存文件')
      }
    } catch (error) {
      this.logger.error(`文件处理失败: ${file.originalname}`, error.stack)
      throw new BadRequestException(`文件保存失败: ${error.message}`)
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
    }
  }

  /**
   * 根据MIME类型获取文件类型目录
   */
  private getFileTypeFromMimeType(mimeType: string): string {
    if (mimeType.startsWith('image/')) {
      return 'image'
    }
    if (mimeType.startsWith('video/')) {
      return 'video'
    }
    if (mimeType.startsWith('audio/')) {
      return 'audio'
    }
    if (mimeType.includes('pdf')) {
      return 'document'
    }
    if (
      mimeType.includes('word') ||
      mimeType.includes('excel') ||
      mimeType.includes('powerpoint') ||
      mimeType.includes('text')
    ) {
      return 'document'
    }
    if (
      mimeType.includes('zip') ||
      mimeType.includes('rar') ||
      mimeType.includes('7z') ||
      mimeType.includes('tar')
    ) {
      return 'archive'
    }
    return 'other'
  }

  /**
   * 确保目录存在
   */
  private async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      await fs.access(dirPath)
    } catch {
      await fs.mkdir(dirPath, { recursive: true })
    }
  }

  /**
   * 优化的文件移动操作
   * 先尝试rename，如果失败则使用copy+unlink
   */
  private async moveFileOptimized(
    sourcePath: string,
    targetPath: string,
  ): Promise<void> {
    try {
      // 首先尝试使用rename（同文件系统下最快）
      await fs.rename(sourcePath, targetPath)
    } catch (renameError) {
      this.logger.warn(
        `文件rename失败，尝试copy+unlink: ${renameError.message}`,
      )
      try {
        // 如果rename失败（可能是跨文件系统），使用copy+unlink
        await fs.copyFile(sourcePath, targetPath)
        await fs.unlink(sourcePath)
      } catch (copyError) {
        this.logger.error(`文件移动完全失败: ${copyError.message}`)
        throw new BadRequestException(`文件移动失败: ${copyError.message}`)
      }
    }
  }

  /**
   * 将文件信息映射为响应DTO
   */
  private mapToResponseDto(fileInfo: FileInfo): FileUploadResponseDto {
    return {
      fileName: fileInfo.fileName,
      filePath: fileInfo.filePath,
      size: fileInfo.size,
      mimeType: fileInfo.mimeType,
    }
  }
}
