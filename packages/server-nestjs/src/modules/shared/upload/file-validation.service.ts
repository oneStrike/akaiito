import { Injectable, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as crypto from 'crypto'
import * as path from 'path'
import * as fs from 'fs'
import { FileTypeEnum } from './dto/upload.dto'

/**
 * 文件验证配置接口
 */
interface FileValidationConfig {
  maxFileSize: number // 最大文件大小（字节）
  allowedMimeTypes: string[] // 允许的 MIME 类型
  allowedExtensions: string[] // 允许的文件扩展名
  dangerousExtensions: string[] // 危险的文件扩展名
  maxFilenameLength: number // 最大文件名长度
}

/**
 * 文件验证结果接口
 */
interface ValidationResult {
  isValid: boolean
  error?: string
  fileType?: FileTypeEnum
  hash?: string
}

@Injectable()
export class FileValidationService {
  private readonly config: FileValidationConfig

  constructor(private readonly configService: ConfigService) {
    this.config = {
      maxFileSize: this.configService.get<number>(
        'UPLOAD_MAX_FILE_SIZE',
        10 * 1024 * 1024,
      ), // 默认 10MB
      allowedMimeTypes: [
        // 图片类型
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        // 文档类型
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // 视频类型
        'video/mp4',
        'video/avi',
        'video/mov',
        'video/wmv',
        // 音频类型
        'audio/mp3',
        'audio/wav',
        'audio/ogg',
      ],
      allowedExtensions: [
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.webp',
        '.svg',
        '.pdf',
        '.doc',
        '.docx',
        '.xls',
        '.xlsx',
        '.mp4',
        '.avi',
        '.mov',
        '.wmv',
        '.mp3',
        '.wav',
        '.ogg',
      ],
      dangerousExtensions: [
        '.exe',
        '.bat',
        '.cmd',
        '.com',
        '.pif',
        '.scr',
        '.vbs',
        '.js',
        '.jar',
        '.php',
        '.asp',
        '.jsp',
        '.sh',
        '.ps1',
        '.msi',
        '.dll',
      ],
      maxFilenameLength: 255,
    }
  }

  /**
   * 验证单个文件
   */
  async validateFile(file: Express.Multer.File): Promise<ValidationResult> {
    try {
      // 检查文件是否为空
      if (!file || file.size === 0) {
        return {
          isValid: false,
          error: '文件为空或不存在',
        }
      }

      // 检查文件大小
      if (file.size > this.config.maxFileSize) {
        return {
          isValid: false,
          error: `文件大小超过限制，最大允许 ${this.formatFileSize(this.config.maxFileSize)}`,
        }
      }

      // 检查文件名长度
      if (file.originalname.length > this.config.maxFilenameLength) {
        return {
          isValid: false,
          error: `文件名过长，最大允许 ${this.config.maxFilenameLength} 个字符`,
        }
      }

      // 检查文件扩展名
      const ext = path.extname(file.originalname).toLowerCase()
      if (this.config.dangerousExtensions.includes(ext)) {
        return {
          isValid: false,
          error: `不允许上传 ${ext} 类型的文件`,
        }
      }

      if (!this.config.allowedExtensions.includes(ext)) {
        return {
          isValid: false,
          error: `不支持的文件类型 ${ext}`,
        }
      }

      // 检查 MIME 类型
      if (!this.config.allowedMimeTypes.includes(file.mimetype)) {
        return {
          isValid: false,
          error: `不支持的文件格式 ${file.mimetype}`,
        }
      }

      // 验证文件内容与扩展名是否匹配
      const contentValidation = await this.validateFileContent(file)
      if (!contentValidation.isValid) {
        return contentValidation
      }

      // 计算文件哈希值
      const hash = await this.calculateFileHash(file.buffer)

      // 确定文件类型
      const fileType = this.determineFileType(file.mimetype)

      return {
        isValid: true,
        fileType,
        hash,
      }
    } catch (error) {
      return {
        isValid: false,
        error: `文件验证失败: ${error.message}`,
      }
    }
  }

  /**
   * 验证多个文件
   */
  async validateFiles(
    files: Express.Multer.File[],
  ): Promise<ValidationResult[]> {
    const results: ValidationResult[] = []

    for (const file of files) {
      const result = await this.validateFile(file)
      results.push(result)
    }

    return results
  }

  /**
   * 验证文件内容（检查文件头）
   */
  private async validateFileContent(
    file: Express.Multer.File,
  ): Promise<ValidationResult> {
    if (!file.buffer || file.buffer.length === 0) {
      return {
        isValid: false,
        error: '文件内容为空',
      }
    }

    // 检查文件头魔数
    const fileHeader = file.buffer.slice(0, 8).toString('hex').toUpperCase()
    const isValidHeader = this.validateFileHeader(fileHeader, file.mimetype)

    if (!isValidHeader) {
      return {
        isValid: false,
        error: '文件内容与文件类型不匹配，可能是恶意文件',
      }
    }

    return { isValid: true }
  }

  /**
   * 验证文件头魔数
   */
  private validateFileHeader(header: string, mimetype: string): boolean {
    const magicNumbers: Record<string, string[]> = {
      'image/jpeg': ['FFD8FF'],
      'image/png': ['89504E47'],
      'image/gif': ['474946'],
      'image/webp': ['52494646'],
      'application/pdf': ['25504446'],
      'video/mp4': ['00000018', '00000020'],
      'audio/mp3': ['494433', 'FFFB'],
    }

    const expectedHeaders = magicNumbers[mimetype]
    if (!expectedHeaders) {
      // 对于没有定义魔数的文件类型，暂时通过验证
      return true
    }

    return expectedHeaders.some((expected) => header.startsWith(expected))
  }

  /**
   * 计算文件哈希值
   */
  private async calculateFileHash(buffer: Buffer): Promise<string> {
    return crypto.createHash('sha256').update(buffer).digest('hex')
  }

  /**
   * 根据 MIME 类型确定文件类型
   */
  private determineFileType(mimetype: string): FileTypeEnum {
    if (mimetype.startsWith('image/')) {
      return FileTypeEnum.IMAGE
    }
    if (mimetype.startsWith('video/')) {
      return FileTypeEnum.VIDEO
    }
    if (mimetype.startsWith('audio/')) {
      return FileTypeEnum.AUDIO
    }
    if (
      mimetype.includes('pdf') ||
      mimetype.includes('document') ||
      mimetype.includes('sheet')
    ) {
      return FileTypeEnum.DOCUMENT
    }
    return FileTypeEnum.OTHER
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
   * 检查文件名是否安全
   */
  isFilenameSafe(filename: string): boolean {
    // 检查是否包含危险字符
    const dangerousChars = /[<>:"/\\|?*\x00-\x1f]/
    if (dangerousChars.test(filename)) {
      return false
    }

    // 检查是否为保留文件名（Windows）
    const reservedNames = [
      'CON',
      'PRN',
      'AUX',
      'NUL',
      'COM1',
      'COM2',
      'COM3',
      'COM4',
      'COM5',
      'COM6',
      'COM7',
      'COM8',
      'COM9',
      'LPT1',
      'LPT2',
      'LPT3',
      'LPT4',
      'LPT5',
      'LPT6',
      'LPT7',
      'LPT8',
      'LPT9',
    ]
    const nameWithoutExt = path.parse(filename).name.toUpperCase()
    if (reservedNames.includes(nameWithoutExt)) {
      return false
    }

    return true
  }

  /**
   * 生成安全的文件名
   */
  generateSafeFilename(originalname: string): string {
    const ext = path.extname(originalname)
    const nameWithoutExt = path.parse(originalname).name

    // 移除危险字符并限制长度
    const safeName = nameWithoutExt
      .replace(/[<>:"/\\|?*\x00-\x1f]/g, '_')
      .substring(0, 100)

    // 添加时间戳确保唯一性
    const timestamp = Date.now()
    const randomStr = crypto.randomBytes(4).toString('hex')

    return `${safeName}_${timestamp}_${randomStr}${ext}`
  }
}
