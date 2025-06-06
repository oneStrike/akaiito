import { registerAs } from '@nestjs/config'

/**
 * 文件上传配置
 */
export interface UploadConfig {
  // 基础配置
  baseDir: string
  publicBaseUrl: string
  tempDir: string

  // 文件限制
  maxFileSize: number
  maxFiles: number
  maxFilenameLength: number

  // 允许的文件类型
  allowedMimeTypes: string[]
  allowedExtensions: string[]
  dangerousExtensions: string[]

  // 性能配置
  enableStreaming: boolean
  chunkSize: number
  concurrentUploads: number

  // 安全配置
  enableVirusScan: boolean
  enableContentValidation: boolean
  enableHashCheck: boolean

  // 监控配置
  enableMetrics: boolean
  metricsHistorySize: number

  // 清理配置
  enableAutoCleanup: boolean
  cleanupInterval: number // 小时
  maxFileAge: number // 天
}

export default registerAs(
  'upload',
  (): UploadConfig => ({
    // 基础配置
    baseDir: process.env.UPLOAD_BASE_DIR || 'public',
    publicBaseUrl: process.env.PUBLIC_BASE_URL || '/public',
    tempDir: process.env.UPLOAD_TEMP_DIR || './temp',

    // 文件限制
    maxFileSize: Number.parseInt(
      process.env.UPLOAD_MAX_FILE_SIZE || '104857600',
    ), // 100MB
    maxFiles: Number.parseInt(process.env.UPLOAD_MAX_FILES || '50'),
    maxFilenameLength: Number.parseInt(
      process.env.UPLOAD_MAX_FILENAME_LENGTH || '255',
    ),

    // 允许的文件类型
    allowedMimeTypes: [
      // 图片类型
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/bmp',
      'image/tiff',

      // 文档类型
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv',

      // 视频类型
      'video/mp4',
      'video/avi',
      'video/mov',
      'video/wmv',
      'video/flv',
      'video/webm',
      'video/mkv',

      // 音频类型
      'audio/mp3',
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/aac',
      'audio/flac',

      // 压缩文件
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      'application/gzip',
    ],

    allowedExtensions: [
      // 图片
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.svg',
      '.bmp',
      '.tiff',
      // 文档
      '.pdf',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
      '.txt',
      '.csv',
      // 视频
      '.mp4',
      '.avi',
      '.mov',
      '.wmv',
      '.flv',
      '.webm',
      '.mkv',
      // 音频
      '.mp3',
      '.wav',
      '.ogg',
      '.aac',
      '.flac',
      // 压缩文件
      '.zip',
      '.rar',
      '.7z',
      '.gz',
    ],

    dangerousExtensions: [
      '.exe',
      '.bat',
      '.cmd',
      '.com',
      '.pif',
      '.scr',
      '.vbs',
      '.vbe',
      '.js',
      '.jse',
      '.jar',
      '.php',
      '.asp',
      '.aspx',
      '.jsp',
      '.sh',
      '.ps1',
      '.msi',
      '.dll',
      '.sys',
      '.reg',
      '.hta',
      '.cpl',
    ],

    // 性能配置
    enableStreaming: process.env.UPLOAD_ENABLE_STREAMING === 'true',
    chunkSize: Number.parseInt(process.env.UPLOAD_CHUNK_SIZE || '1048576'), // 1MB
    concurrentUploads: Number.parseInt(
      process.env.UPLOAD_CONCURRENT_UPLOADS || '10',
    ),

    // 安全配置
    enableVirusScan: process.env.UPLOAD_ENABLE_VIRUS_SCAN === 'true',
    enableContentValidation:
      process.env.UPLOAD_ENABLE_CONTENT_VALIDATION !== 'false',
    enableHashCheck: process.env.UPLOAD_ENABLE_HASH_CHECK !== 'false',

    // 监控配置
    enableMetrics: process.env.UPLOAD_ENABLE_METRICS !== 'false',
    metricsHistorySize: Number.parseInt(
      process.env.UPLOAD_METRICS_HISTORY_SIZE || '10000',
    ),

    // 清理配置
    enableAutoCleanup: process.env.UPLOAD_ENABLE_AUTO_CLEANUP === 'true',
    cleanupInterval: Number.parseInt(
      process.env.UPLOAD_CLEANUP_INTERVAL || '24',
    ), // 24小时
    maxFileAge: Number.parseInt(process.env.UPLOAD_MAX_FILE_AGE || '30'), // 30天
  }),
)

/**
 * 获取上传配置的辅助函数
 */
export function getUploadConfig(): UploadConfig {
  return {
    baseDir: process.env.UPLOAD_BASE_DIR || 'public',
    publicBaseUrl: process.env.PUBLIC_BASE_URL || '/public',
    tempDir: process.env.UPLOAD_TEMP_DIR || './temp',
    maxFileSize: Number.parseInt(
      process.env.UPLOAD_MAX_FILE_SIZE || '104857600',
    ),
    maxFiles: Number.parseInt(process.env.UPLOAD_MAX_FILES || '50'),
    maxFilenameLength: Number.parseInt(
      process.env.UPLOAD_MAX_FILENAME_LENGTH || '255',
    ),
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'application/msword',
      'video/mp4',
      'audio/mp3',
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
      '.mp4',
      '.mp3',
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
    ],
    enableStreaming: process.env.UPLOAD_ENABLE_STREAMING === 'true',
    chunkSize: Number.parseInt(process.env.UPLOAD_CHUNK_SIZE || '1048576'),
    concurrentUploads: Number.parseInt(
      process.env.UPLOAD_CONCURRENT_UPLOADS || '10',
    ),
    enableVirusScan: process.env.UPLOAD_ENABLE_VIRUS_SCAN === 'true',
    enableContentValidation:
      process.env.UPLOAD_ENABLE_CONTENT_VALIDATION !== 'false',
    enableHashCheck: process.env.UPLOAD_ENABLE_HASH_CHECK !== 'false',
    enableMetrics: process.env.UPLOAD_ENABLE_METRICS !== 'false',
    metricsHistorySize: Number.parseInt(
      process.env.UPLOAD_METRICS_HISTORY_SIZE || '10000',
    ),
    enableAutoCleanup: process.env.UPLOAD_ENABLE_AUTO_CLEANUP === 'true',
    cleanupInterval: Number.parseInt(
      process.env.UPLOAD_CLEANUP_INTERVAL || '24',
    ),
    maxFileAge: Number.parseInt(process.env.UPLOAD_MAX_FILE_AGE || '30'),
  }
}
