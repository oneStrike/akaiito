import { existsSync, mkdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import { registerAs } from '@nestjs/config'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'

/**
 * 文件上传配置
 */
export interface UploadConfig {
  /** 最大文件大小 (字节) */
  maxFileSize: number
  /** 最大文件数量 */
  maxFiles: number
  /** 允许的文件类型 */
  allowedMimeTypes: string[]
  /** 允许的文件扩展名 */
  allowedExtensions: string[]
  /** 上传目录 */
  uploadDir: string
  /** 是否保留原始文件名 */
  preserveOriginalName: boolean
}

/**
 * 默认上传配置
 */
const defaultUploadConfig: UploadConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  allowedExtensions: [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.pdf',
    '.txt',
    '.doc',
    '.docx',
  ],
  uploadDir: join(process.cwd(), 'uploads'),
  preserveOriginalName: false,
}

/**
 * 生成唯一文件名
 */
export function generateUniqueFileName(originalName: string): string {
  const ext = extname(originalName)
  const uuid = uuidv4()
  const timestamp = Date.now()
  return `${uuid}_${timestamp}${ext}`
}

/**
 * 确保上传目录存在
 */
export function ensureUploadDir(uploadDir: string): void {
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
  }
}

/**
 * 创建 Multer 配置
 */
export function createMulterConfig(config: UploadConfig): MulterOptions {
  ensureUploadDir(config.uploadDir)

  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, config.uploadDir)
      },
      filename: (req, file, cb) => {
        const fileName = config.preserveOriginalName
          ? `${Date.now()}_${file.originalname}`
          : generateUniqueFileName(file.originalname)
        cb(null, fileName)
      },
    }),
    limits: {
      fileSize: config.maxFileSize,
      files: config.maxFiles,
    },
    fileFilter: (req, file, cb) => {
      const ext = extname(file.originalname).toLowerCase()
      const isValidMimeType = config.allowedMimeTypes.includes(file.mimetype)
      const isValidExtension = config.allowedExtensions.includes(ext)

      if (isValidMimeType && isValidExtension) {
        cb(null, true)
      } else {
        cb(new Error(`不支持的文件类型: ${file.mimetype} (${ext})`), false)
      }
    },
  }
}

/**
 * 注册上传配置
 */
export default registerAs('upload', (): UploadConfig => {
  return {
    maxFileSize: Number.parseInt(
      process.env.UPLOAD_MAX_FILE_SIZE ||
      String(defaultUploadConfig.maxFileSize),
    ),
    maxFiles: Number.parseInt(
      process.env.UPLOAD_MAX_FILES || String(defaultUploadConfig.maxFiles),
    ),
    allowedMimeTypes: process.env.UPLOAD_ALLOWED_MIME_TYPES
      ? process.env.UPLOAD_ALLOWED_MIME_TYPES.split(',')
      : defaultUploadConfig.allowedMimeTypes,
    allowedExtensions: process.env.UPLOAD_ALLOWED_EXTENSIONS
      ? process.env.UPLOAD_ALLOWED_EXTENSIONS.split(',')
      : defaultUploadConfig.allowedExtensions,
    uploadDir: process.env.UPLOAD_DIR || defaultUploadConfig.uploadDir,
    preserveOriginalName: process.env.UPLOAD_PRESERVE_ORIGINAL_NAME === 'true',
  }
})
