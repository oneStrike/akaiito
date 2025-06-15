import * as process from 'node:process'

/**
 * 请求日志配置
 * 用于管理admin和client两个子项目的请求日志记录配置
 */
export interface RequestLogConfig {
  /** 是否启用请求日志记录 */
  enabled: boolean
  /** 日志保留天数 */
  retentionDays: number
  /** 是否记录请求参数 */
  logRequestParams: boolean
  /** 是否记录响应数据 */
  logResponseData: boolean
  /** 敏感字段列表（将被脱敏处理） */
  sensitiveFields: string[]
  /** 跳过日志记录的路径模式 */
  skipPaths: string[]
  /** 跳过日志记录的HTTP方法 */
  skipMethods: string[]
  /** 最大请求参数长度（超过将被截断） */
  maxParamsLength: number
}

/**
 * 默认请求日志配置
 */
export const DEFAULT_REQUEST_LOG_CONFIG: RequestLogConfig = {
  enabled: true,
  retentionDays: 30,
  logRequestParams: true,
  logResponseData: false,
  sensitiveFields: [
    'password',
    'token',
    'secret',
    'key',
    'authorization',
    'captcha',
    'verificationCode',
    'smsCode',
    'accessToken',
    'refreshToken',
  ],
  skipPaths: ['/health', '/metrics', '/favicon.ico', '/robots.txt'],
  skipMethods: ['OPTIONS'],
  maxParamsLength: 10000,
}

/**
 * 管理端请求日志配置
 */
export const ADMIN_REQUEST_LOG_CONFIG: RequestLogConfig = {
  ...DEFAULT_REQUEST_LOG_CONFIG,
  // 管理端可能需要更详细的日志记录
  logResponseData: true,
  retentionDays: 90, // 管理端日志保留更长时间
  skipPaths: [
    ...DEFAULT_REQUEST_LOG_CONFIG.skipPaths,
    '/admin/auth/captcha', // 跳过验证码接口
    '/admin/upload/temp', // 跳过临时文件上传
  ],
}

/**
 * 客户端请求日志配置
 */
export const CLIENT_REQUEST_LOG_CONFIG: RequestLogConfig = {
  ...DEFAULT_REQUEST_LOG_CONFIG,
  // 客户端日志相对简化
  logResponseData: false,
  retentionDays: 30,
  skipPaths: [
    ...DEFAULT_REQUEST_LOG_CONFIG.skipPaths,
    '/client/auth/captcha', // 跳过验证码接口
    '/client/upload/avatar', // 跳过头像上传
  ],
  sensitiveFields: [
    ...DEFAULT_REQUEST_LOG_CONFIG.sensitiveFields,
    'mobile', // 客户端额外保护手机号
    'email', // 客户端额外保护邮箱
    'idCard', // 客户端额外保护身份证
  ],
}

/**
 * 请求日志配置服务
 */
export class RequestLogConfigService {
  /**
   * 获取管理端请求日志配置
   */
  static getAdminConfig(): RequestLogConfig {
    return {
      ...ADMIN_REQUEST_LOG_CONFIG,
      // 可以从环境变量或配置文件中覆盖配置
      enabled: process.env.ADMIN_REQUEST_LOG_ENABLED !== 'false',
      retentionDays: Number.parseInt(
        process.env.ADMIN_REQUEST_LOG_RETENTION_DAYS || '90',
      ),
    }
  }

  /**
   * 获取客户端请求日志配置
   */
  static getClientConfig(): RequestLogConfig {
    return {
      ...CLIENT_REQUEST_LOG_CONFIG,
      // 可以从环境变量或配置文件中覆盖配置
      enabled: process.env.CLIENT_REQUEST_LOG_ENABLED !== 'false',
      retentionDays: Number.parseInt(
        process.env.CLIENT_REQUEST_LOG_RETENTION_DAYS || '30',
      ),
    }
  }

  /**
   * 检查路径是否应该跳过日志记录
   * @param path 请求路径
   * @param config 配置对象
   * @returns 是否跳过
   */
  static shouldSkipPath(path: string, config: RequestLogConfig): boolean {
    return config.skipPaths.some((skipPath) => {
      // 支持通配符匹配
      if (skipPath.includes('*')) {
        const regex = new RegExp(skipPath.replace(/\*/g, '.*'))
        return regex.test(path)
      }
      return path.startsWith(skipPath)
    })
  }

  /**
   * 检查HTTP方法是否应该跳过日志记录
   * @param method HTTP方法
   * @param config 配置对象
   * @returns 是否跳过
   */
  static shouldSkipMethod(method: string, config: RequestLogConfig): boolean {
    return config.skipMethods.includes(method.toUpperCase())
  }

  /**
   * 脱敏处理敏感字段
   * @param data 数据对象
   * @param config 配置对象
   * @returns 脱敏后的数据
   */
  static sanitizeData(data: any, config: RequestLogConfig): any {
    if (!data || typeof data !== 'object') {
      return data
    }

    const sanitized = Array.isArray(data) ? [...data] : { ...data }

    for (const field of config.sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '***'
      }
    }

    // 递归处理嵌套对象
    for (const key in sanitized) {
      if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
        sanitized[key] = this.sanitizeData(sanitized[key], config)
      }
    }

    return sanitized
  }

  /**
   * 截断过长的参数字符串
   * @param params 参数字符串
   * @param config 配置对象
   * @returns 截断后的参数字符串
   */
  static truncateParams(params: string, config: RequestLogConfig): string {
    if (!params || params.length <= config.maxParamsLength) {
      return params
    }

    return `${params.substring(0, config.maxParamsLength)}... (truncated)`
  }
}
