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
  allowedMimeTypes: {
    all: string[]
    image: string[]
    video: string[]
    audio: string[]
    document: string[]
    archive: string[]
  }
  /** 允许的文件扩展名 */
  allowedExtensions: {
    all: string[]
    image: string[]
    video: string[]
    audio: string[]
    document: string[]
    archive: string[]
  }
  /** 上传目录 */
  uploadDir: string
  /** 是否保留原始文件名 */
  preserveOriginalName: boolean
}

export interface MulterConfig
  extends Omit<UploadConfig, 'allowedMimeTypes' | 'allowedExtensions'> {
  allowedMimeTypes: string[]
  allowedExtensions: string[]
}

/**
 * 默认上传配置
 */
const defaultUploadConfig: UploadConfig = {
  maxFileSize: 100 * 1024 * 1024, // 100MB
  maxFiles: 50,
  allowedMimeTypes: {
    all: ['*'],
    image: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/apng',
      'image/bmp',
      'image/x-bmp',
      'image/tiff',
    ],
    video: [
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-flv',
      'video/webm',
      'video/ogg',
      'video/mpeg',
    ],
    audio: [
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/x-m4a',
      'audio/webm',
      'audio/flac',
      'audio/aac',
      'audio/x-wma',
      'audio/x-alac',
    ],
    document: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/rtf',
      'application/vnd.oasis.opendocument.text',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    ],
    archive: [
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      'application/x-tar',
      'application/x-bzip2',
      'application/gzip',
    ],
  },
  allowedExtensions: {
    all: ['*'],
    image: [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.svg',
      '.apng',
      '.bmp',
      '.tif',
      '.tiff',
    ],
    video: ['.mp4', '.mov', '.avi', '.flv', '.webm', '.ogv', '.mpeg', '.mkv'],
    audio: [
      '.mp3',
      '.wav',
      '.ogg',
      '.m4a',
      '.webm',
      '.flac',
      '.aac',
      '.wma',
      '.alac',
    ],
    document: [
      '.pdf',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
      '.rtf',
      '.odt',
      '.dotx',
    ],
    archive: ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2'],
  },
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
export function createMulterConfig(config: MulterConfig): MulterOptions {
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
      const isValidMimeType = config.allowedMimeTypes.includes('*') || config.allowedMimeTypes.includes(file.mimetype)
      const isValidExtension = config.allowedExtensions.includes('*') || config.allowedExtensions.includes(ext)

      if (isValidMimeType && isValidExtension) {
        cb(null, true)
      } else {
        // 创建更详细的错误信息
        let errorMessage = `不支持的文件类型: ${file.originalname}`
        if (!isValidMimeType && !isValidExtension) {
          errorMessage += ` (MIME类型: ${file.mimetype}, 扩展名: ${ext} 均不被支持)`
        } else if (!isValidMimeType) {
          errorMessage += ` (MIME类型: ${file.mimetype} 不被支持)`
        } else if (!isValidExtension) {
          errorMessage += ` (扩展名: ${ext} 不被支持)`
        }

        const error = new Error(errorMessage)
        error.name = 'UnsupportedFileTypeError'
        cb(error, false)
      }
    },
  }
}

/**
 * 注册上传配置
 */
export default registerAs('upload', (): UploadConfig => {
  // 辅助函数，用于解析环境变量中的类型配置
  const parseTypeConfig = (
    type: keyof UploadConfig['allowedMimeTypes'],
    envPrefix: string,
  ) => {
    const envMimeTypes = process.env[`${envPrefix}_MIME_TYPES`]
    const envExtensions = process.env[`${envPrefix}_EXTENSIONS`]
    return {
      miniTypes: envMimeTypes
        ? envMimeTypes.split(',')
        : defaultUploadConfig.allowedMimeTypes[type],
      extensions: envExtensions
        ? envExtensions.split(',')
        : defaultUploadConfig.allowedExtensions[type],
    }
  }

  const imageConfig = parseTypeConfig('image', 'UPLOAD_IMAGE')
  const videoConfig = parseTypeConfig('video', 'UPLOAD_VIDEO')
  const audioConfig = parseTypeConfig('audio', 'UPLOAD_AUDIO')
  const documentConfig = parseTypeConfig('document', 'UPLOAD_DOCUMENT')
  const archiveConfig = parseTypeConfig('archive', 'UPLOAD_ARCHIVE')

  return {
    maxFileSize: Number.parseInt(
      process.env.UPLOAD_MAX_FILE_SIZE ||
        String(defaultUploadConfig.maxFileSize),
    ),
    maxFiles: Number.parseInt(
      process.env.UPLOAD_MAX_FILES || String(defaultUploadConfig.maxFiles),
    ),
    allowedMimeTypes: {
      all: [
        ...imageConfig.miniTypes,
        ...videoConfig.miniTypes,
        ...audioConfig.miniTypes,
        ...documentConfig.miniTypes,
        ...archiveConfig.miniTypes,
      ],
      image: imageConfig.miniTypes,
      video: videoConfig.miniTypes,
      audio: audioConfig.miniTypes,
      document: documentConfig.miniTypes,
      archive: archiveConfig.miniTypes,
    },
    allowedExtensions: {
      all: [
        ...imageConfig.extensions,
        ...videoConfig.extensions,
        ...audioConfig.extensions,
        ...documentConfig.extensions,
        ...archiveConfig.extensions,
      ],
      image: imageConfig.extensions,
      video: videoConfig.extensions,
      audio: audioConfig.extensions,
      document: documentConfig.extensions,
      archive: archiveConfig.extensions,
    },
    uploadDir: process.env.UPLOAD_DIR || defaultUploadConfig.uploadDir,
    preserveOriginalName: process.env.UPLOAD_PRESERVE_ORIGINAL_NAME === 'true',
  }
})
