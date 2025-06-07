import { join } from 'node:path'
import { registerAs } from '@nestjs/config'

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
  imageType: { mimeTypes: string[]; extensions: string[] }
  audioType: { mimeTypes: string[]; extensions: string[] }
  videoType: { mimeTypes: string[]; extensions: string[] }
  documentType: { mimeTypes: string[]; extensions: string[] }
  archiveType: { mimeTypes: string[]; extensions: string[] }
  /** 上传目录 */
  uploadDir: string
  /** 是否保留原始文件名 */
  preserveOriginalName: boolean
}

/**
 * 允许的文件类型
 */

export const imageType = {
  mimeTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/apng',
    'image/bmp',
    'image/x-bmp',
    'image/tiff',
    'image/heic',
    'image/heif',
  ],
  extensions: [
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
    '.heic',
    '.heif',
  ],
}
// 音频类型
export const audioType = {
  mimeTypes: [
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/flac',
    'audio/aac',
    'audio/x-m4a',
    'audio/amr',
    'audio/3gpp',
  ],
  extensions: ['.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a', '.amr', '.3gp'],
}

// 视频类型
export const videoType = {
  mimeTypes: [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-flv',
    'video/ogg',
    'video/webm',
    'video/3gpp',
    'video/x-matroska',
  ],
  extensions: ['.mp4', '.mov', '.avi', '.flv', '.ogv', '.webm', '.3gp', '.mkv'],
}

// 文档类型
export const documentType = {
  mimeTypes: [
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.presentation',
    'text/csv',
  ],
  extensions: [
    '.pdf',
    '.txt',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.odt',
    '.ods',
    '.odp',
    '.csv',
  ],
}

// 压缩包类型
export const archiveType = {
  mimeTypes: [
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/gzip',
    'application/x-tar',
  ],
  extensions: ['.zip', '.rar', '.7z', '.gz', '.tar'],
}

/**
 * 注册上传配置
 */
export default registerAs('upload', (): UploadConfig => {
  // 获取图片类型配置 - 优先使用环境变量
  const imageMimeTypes = process.env.UPLOAD_IMAGE_MIME_TYPES
    ? process.env.UPLOAD_IMAGE_MIME_TYPES.split(',')
        .map((mt) => mt.trim())
        .filter((mt) => mt)
    : [...imageType.mimeTypes]

  const imageExtensions = process.env.UPLOAD_IMAGE_EXTENSIONS
    ? process.env.UPLOAD_IMAGE_EXTENSIONS.split(',')
        .map((ext) => ext.trim().toLowerCase())
        .filter((ext) => ext.startsWith('.') && ext.length > 1)
    : [...imageType.extensions]

  // 音频类型
  const audioMimeTypes = process.env.UPLOAD_AUDIO_MIME_TYPES
    ? process.env.UPLOAD_AUDIO_MIME_TYPES.split(',')
        .map((mt) => mt.trim())
        .filter((mt) => mt)
    : [...audioType.mimeTypes]

  const audioExtensions = process.env.UPLOAD_AUDIO_EXTENSIONS
    ? process.env.UPLOAD_AUDIO_EXTENSIONS.split(',')
        .map((ext) => ext.trim().toLowerCase())
        .filter((ext) => ext.startsWith('.') && ext.length > 1)
    : [...audioType.extensions]

  // 视频类型
  const videoMimeTypes = process.env.UPLOAD_VIDEO_MIME_TYPES
    ? process.env.UPLOAD_VIDEO_MIME_TYPES.split(',')
        .map((mt) => mt.trim())
        .filter((mt) => mt)
    : [...videoType.mimeTypes]

  const videoExtensions = process.env.UPLOAD_VIDEO_EXTENSIONS
    ? process.env.UPLOAD_VIDEO_EXTENSIONS.split(',')
        .map((ext) => ext.trim().toLowerCase())
        .filter((ext) => ext.startsWith('.') && ext.length > 1)
    : [...videoType.extensions]

  // 文档类型
  const documentMimeTypes = process.env.UPLOAD_DOCUMENT_MIME_TYPES
    ? process.env.UPLOAD_DOCUMENT_MIME_TYPES.split(',')
        .map((mt) => mt.trim())
        .filter((mt) => mt)
    : [...documentType.mimeTypes]

  const documentExtensions = process.env.UPLOAD_DOCUMENT_EXTENSIONS
    ? process.env.UPLOAD_DOCUMENT_EXTENSIONS.split(',')
        .map((ext) => ext.trim().toLowerCase())
        .filter((ext) => ext.startsWith('.') && ext.length > 1)
    : [...documentType.extensions]

  // 压缩包类型
  const archiveMimeTypes = process.env.UPLOAD_ARCHIVE_MIME_TYPES
    ? process.env.UPLOAD_ARCHIVE_MIME_TYPES.split(',')
        .map((mt) => mt.trim())
        .filter((mt) => mt)
    : [...archiveType.mimeTypes]

  const archiveExtensions = process.env.UPLOAD_ARCHIVE_EXTENSIONS
    ? process.env.UPLOAD_ARCHIVE_EXTENSIONS.split(',')
        .map((ext) => ext.trim().toLowerCase())
        .filter((ext) => ext.startsWith('.') && ext.length > 1)
    : [...archiveType.extensions]

  // 获取基本配置
  const maxFileSize = (() => {
    const value = process.env.UPLOAD_MAX_FILE_SIZE
    if (value) {
      const num = Number.parseInt(value, 10)
      return Number.isNaN(num) || num <= 0 ? 100 * 1024 * 1024 : num
    }
    return 100 * 1024 * 1024
  })()

  const maxFiles = (() => {
    const value = process.env.UPLOAD_MAX_FILES
    if (value) {
      const num = Number.parseInt(value, 10)
      return Number.isNaN(num) || num <= 0 ? 50 : num
    }
    return 50
  })()

  const uploadDir = (() => {
    const dir = process.env.UPLOAD_DIR || 'uploads'
    // 确保路径是绝对路径
    return process.env.UPLOAD_ABSOLUTE_PATH === 'true'
      ? dir
      : join(process.cwd(), dir)
  })()

  const preserveOriginalName = process.env.UPLOAD_PRESERVE_ORIGINAL_NAME
    ? ['true', '1', 'yes'].includes(
        process.env.UPLOAD_PRESERVE_ORIGINAL_NAME.toLowerCase(),
      )
    : true

  return {
    maxFileSize,
    maxFiles,
    imageType: {
      mimeTypes: imageMimeTypes,
      extensions: imageExtensions,
    },
    audioType: {
      mimeTypes: audioMimeTypes,
      extensions: audioExtensions,
    },
    videoType: {
      mimeTypes: videoMimeTypes,
      extensions: videoExtensions,
    },
    documentType: {
      mimeTypes: documentMimeTypes,
      extensions: documentExtensions,
    },
    archiveType: {
      mimeTypes: archiveMimeTypes,
      extensions: archiveExtensions,
    },
    allowedMimeTypes: [
      ...imageMimeTypes,
      ...audioMimeTypes,
      ...videoMimeTypes,
      ...documentMimeTypes,
      ...archiveMimeTypes,
    ],
    allowedExtensions: [
      ...imageExtensions,
      ...audioExtensions,
      ...videoExtensions,
      ...documentExtensions,
      ...archiveExtensions,
    ],
    uploadDir,
    preserveOriginalName,
  }
})
