import { extname } from 'node:path'
import { memoryStorage } from 'multer'

/**
 * Fastify 文件上传配置
 * 使用内存存储以优化Fastify性能
 */
export const fastifyUploadConfig = {
  // 使用内存存储，与Fastify multipart插件配合
  storage: memoryStorage(),

  // 文件大小限制（与main.ts中的multipart配置保持一致）
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
    files: 50, // 最大文件数
    fields: 20, // 最大字段数
    fieldNameSize: 100, // 字段名最大长度
    fieldSize: 1024 * 1024, // 字段值最大大小 1MB
  },

  // 文件过滤器
  fileFilter: (req, file, cb) => {
    // 基础验证，详细验证在 FileValidationService 中进行
    if (!file.originalname) {
      cb(new Error('文件名不能为空'), false)
      return
    }

    // 检查文件名长度
    if (file.originalname.length > 255) {
      cb(new Error('文件名过长'), false)
      return
    }

    // 检查危险扩展名
    const dangerousExtensions = [
      '.exe',
      '.bat',
      '.cmd',
      '.com',
      '.pif',
      '.scr',
      '.vbs',
      '.js',
    ]
    const ext = extname(file.originalname).toLowerCase()
    if (dangerousExtensions.includes(ext)) {
      cb(new Error(`不允许上传 ${ext} 类型的文件`), false)
      return
    }

    cb(null, true)
  },

  // 保留原始文件名
  preservePath: false,
}

/**
 * Fastify multipart配置选项
 * 与main.ts中的插件配置保持一致
 */
export const fastifyMultipartConfig = {
  limits: {
    fieldNameSize: 100, // 字段名最大长度
    fieldSize: 1024 * 1024, // 字段值最大大小 1MB
    fields: 20, // 最大字段数
    fileSize: 100 * 1024 * 1024, // 文件最大大小 100MB
    files: 50, // 最大文件数
    headerPairs: 2000, // 最大header对数
  },
  attachFieldsToBody: true, // 将字段附加到body
  throwFileSizeLimit: true, // 超出大小限制时抛出错误
  addToBody: true, // 添加到请求体
}

/**
 * 获取动态上传配置
 */
export function getDynamicUploadConfig(
  maxFileSize?: number,
  maxFiles?: number,
) {
  return {
    ...fastifyUploadConfig,
    limits: {
      ...fastifyUploadConfig.limits,
      fileSize:
        maxFileSize ||
        fastifyUploadConfig.limits?.fileSize ||
        100 * 1024 * 1024,
      files: maxFiles || fastifyUploadConfig.limits?.files || 50,
    },
  }
}
