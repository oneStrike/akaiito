import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import { UploadLoggingInterceptor } from '@/common/interceptors/upload-logging.interceptor'
import uploadConfig, {
  createMulterConfig,
  UploadConfig,
} from '@/config/upload.config'

/**
 * 单文件上传装饰器选项
 */
export interface SingleFileUploadOptions {
  /** 字段名，默认为 'file' */
  fieldName?: string
  /** 最大文件大小（字节） */
  maxFileSize?: number
  /** 允许的文件类型 */
  allowedFileType?: keyof UploadConfig['allowedMimeTypes']
  /** 是否启用日志记录 */
  enableLogging?: boolean
  /** 自定义 Multer 配置 */
  multerOptions?: Partial<MulterOptions>
}

/**
 * 多文件上传装饰器选项
 */
export interface MultipleFileUploadOptions extends SingleFileUploadOptions {
  /** 最大文件数量 */
  maxFiles?: number
}

/**
 * 单文件上传装饰器
 * 自动配置文件上传拦截器、Swagger文档和日志记录
 */
export function SingleFileUpload(options: SingleFileUploadOptions = {}) {
  // 获取默认配置
  const defaultConfig = uploadConfig()

  const {
    fieldName = 'file',
    allowedFileType = 'all',
    maxFileSize = defaultConfig.maxFileSize,
    enableLogging = true,
    multerOptions = {},
  } = options

  const config = createMulterConfig({
    maxFileSize,
    maxFiles: 1,
    allowedMimeTypes: defaultConfig.allowedMimeTypes[allowedFileType],
    allowedExtensions: defaultConfig.allowedExtensions[allowedFileType],
    uploadDir: defaultConfig.uploadDir,
    preserveOriginalName: defaultConfig.preserveOriginalName,
    ...multerOptions,
  })

  const decorators = [
    UseInterceptors(FileInterceptor(fieldName, config)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: '文件上传',
      type: 'multipart/form-data',
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
            description: '要上传的文件',
          },
          uploaderId: {
            type: 'string',
            description: '上传者ID（可选）',
          },
        },
        required: [fieldName],
      },
    }),
  ]

  if (enableLogging) {
    decorators.push(UseInterceptors(UploadLoggingInterceptor))
  }

  return applyDecorators(...decorators)
}

/**
 * 多文件上传装饰器
 * 自动配置多文件上传拦截器、Swagger文档和日志记录
 */
export function MultipleFileUpload(options: MultipleFileUploadOptions = {}) {
  // 获取默认配置
  const defaultConfig = uploadConfig()

  const {
    fieldName = 'file',
    maxFiles = 50,
    allowedFileType = 'all',
    maxFileSize = defaultConfig.maxFileSize,
    enableLogging = true,
    multerOptions = {},
  } = options

  const config = createMulterConfig({
    maxFileSize,
    maxFiles,
    allowedMimeTypes: defaultConfig.allowedMimeTypes[allowedFileType],
    allowedExtensions: defaultConfig.allowedExtensions[allowedFileType],
    uploadDir: defaultConfig.uploadDir,
    preserveOriginalName: defaultConfig.preserveOriginalName,
    ...multerOptions,
  })

  const decorators = [
    UseInterceptors(FilesInterceptor(fieldName, maxFiles, config)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: '多文件上传',
      type: 'multipart/form-data',
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
            description: `要上传的文件列表（最多${maxFiles}个）`,
          },
          uploaderId: {
            type: 'string',
            description: '上传者ID（可选）',
          },
        },
        required: [fieldName],
      },
    }),
  ]

  if (enableLogging) {
    decorators.push(UseInterceptors(UploadLoggingInterceptor))
  }

  return applyDecorators(...decorators)
}

/**
 * 图片上传装饰器
 * 专门用于图片文件上传的预配置装饰器
 */
export function ImageUpload(options: Partial<SingleFileUploadOptions> = {}) {
  const defaultConfig = uploadConfig()
  return SingleFileUpload({
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileType: 'image',
    ...options,
  })
}

/**
 * 文档上传装饰器
 * 专门用于文档文件上传的预配置装饰器
 */
export function DocumentUpload(options: Partial<SingleFileUploadOptions> = {}) {
  const defaultConfig = uploadConfig()
  return SingleFileUpload({
    maxFileSize: 20 * 1024 * 1024, // 20MB
    allowedFileType: 'document',
    ...options,
  })
}

/**
 * 头像上传装饰器
 * 专门用于用户头像上传的预配置装饰器
 */
export function AvatarUpload(options: Partial<SingleFileUploadOptions> = {}) {
  const defaultConfig = uploadConfig()
  return SingleFileUpload({
    fieldName: 'avatar',
    maxFileSize: 2 * 1024 * 1024, // 2MB
    allowedFileType: 'image',
    ...options,
  })
}
