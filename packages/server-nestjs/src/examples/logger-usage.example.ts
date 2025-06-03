/**
 * 日志模块使用示例
 * 展示各种场景下的日志使用方法
 */

import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
} from '@nestjs/common'
import {
  AdminLog,
  LogBusiness,
  LogPerformance,
} from '@/common/decorators/log.decorator'
import { LoggerFactoryService } from '@/common/services/logger-factory.service'
import { CustomLoggerService } from '@/common/services/logger.service'

// ==================== 服务层使用示例 ====================

@Injectable()
export class UserService {
  private readonly logger: CustomLoggerService

  constructor(private readonly loggerFactory: LoggerFactoryService) {
    // 创建专用的日志器
    this.logger = this.loggerFactory.createAdminLogger('UserService')
  }

  /**
   * 用户注册示例
   */
  async registerUser(userData: any): Promise<any> {
    // 设置操作上下文
    this.logger.setLogContext({
      action: 'register_user',
      email: userData.email,
    })

    this.logger.info('开始用户注册流程', {
      userData: this.sanitizeUserData(userData),
    })

    try {
      // 1. 数据验证
      this.logger.debug('验证用户数据')
      await this.validateUserData(userData)

      // 2. 检查邮箱是否已存在
      const existingUser = await this.checkEmailExists(userData.email)
      if (existingUser) {
        this.logger.logBusiness('用户注册', 'failure', { reason: '邮箱已存在' })
        throw new Error('邮箱已被注册')
      }

      // 3. 创建用户
      const startTime = Date.now()
      const user = await this.createUserInDatabase(userData)
      const dbDuration = Date.now() - startTime

      this.logger.logDatabase('INSERT', 'users', dbDuration, {
        userId: user.id,
      })

      // 4. 发送欢迎邮件
      await this.sendWelcomeEmail(user.email)

      // 5. 记录成功
      this.logger.logBusiness('用户注册', 'success', {
        userId: user.id,
        email: user.email,
      })

      this.logger.info('用户注册完成', { userId: user.id })

      return user
    } catch (error) {
      this.logger.error('用户注册失败', error.stack, {
        email: userData.email,
        errorType: error.constructor.name,
      })
      throw error
    } finally {
      // 清理上下文
      this.logger.clearContext()
    }
  }

  /**
   * 用户登录示例
   */
  async loginUser(email: string, password: string, ip: string): Promise<any> {
    const loginLogger = this.logger.child('UserLogin', {
      email,
      ip,
      loginAttempt: Date.now(),
    })

    loginLogger.logSecurity('用户登录尝试', 'info')

    try {
      // 检查用户是否存在
      const user = await this.findUserByEmail(email)
      if (!user) {
        loginLogger.logSecurity('登录失败', 'warn', { reason: '用户不存在' })
        throw new Error('用户名或密码错误')
      }

      // 验证密码
      const isPasswordValid = await this.validatePassword(
        password,
        user.password,
      )
      if (!isPasswordValid) {
        loginLogger.logSecurity('登录失败', 'warn', { reason: '密码错误' })
        // 记录失败次数
        await this.incrementLoginFailures(user.id)
        throw new Error('用户名或密码错误')
      }

      // 检查账户状态
      if (user.status === 'locked') {
        loginLogger.logSecurity('登录失败', 'error', { reason: '账户被锁定' })
        throw new Error('账户已被锁定')
      }

      // 登录成功
      loginLogger.logSecurity('登录成功', 'info', { userId: user.id })

      // 更新最后登录时间
      await this.updateLastLoginTime(user.id)

      return { userId: user.id, token: 'jwt_token_here' }
    } catch (error) {
      loginLogger.error('登录处理异常', error.stack)
      throw error
    }
  }

  /**
   * 批量操作示例
   */
  async batchUpdateUsers(userIds: string[], updateData: any): Promise<void> {
    const batchLogger = this.logger.child('BatchUpdate', {
      batchId: `batch_${Date.now()}`,
      userCount: userIds.length,
    })

    batchLogger.info('开始批量更新用户', { userIds, updateData })

    const results = {
      success: 0,
      failed: 0,
      errors: [] as any[],
    }

    for (const userId of userIds) {
      const userLogger = batchLogger.child('UserUpdate', { userId })

      try {
        const startTime = Date.now()
        await this.updateUser(userId, updateData)
        const duration = Date.now() - startTime

        userLogger.logDatabase('UPDATE', 'users', duration, { userId })
        results.success++
      } catch (error) {
        userLogger.error('用户更新失败', error.stack, { userId })
        results.failed++
        results.errors.push({ userId, error: error.message })
      }
    }

    batchLogger.info('批量更新完成', results)

    if (results.failed > 0) {
      batchLogger.logBusiness('批量更新', 'failure', {
        successCount: results.success,
        failedCount: results.failed,
      })
    } else {
      batchLogger.logBusiness('批量更新', 'success', {
        successCount: results.success,
      })
    }
  }

  // 辅助方法
  private sanitizeUserData(userData: any): any {
    const { password, ...safeData } = userData
    return safeData
  }

  private async validateUserData(userData: any): Promise<void> {
    // 模拟验证逻辑
    await new Promise((resolve) => setTimeout(resolve, 10))
  }

  private async checkEmailExists(email: string): Promise<boolean> {
    // 模拟数据库查询
    await new Promise((resolve) => setTimeout(resolve, 20))
    return false
  }

  private async createUserInDatabase(userData: any): Promise<any> {
    // 模拟数据库插入
    await new Promise((resolve) => setTimeout(resolve, 50))
    return { id: 'user_123', ...userData }
  }

  private async sendWelcomeEmail(email: string): Promise<void> {
    // 模拟发送邮件
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  private async findUserByEmail(email: string): Promise<any> {
    // 模拟查找用户
    await new Promise((resolve) => setTimeout(resolve, 30))
    return {
      id: 'user_123',
      email,
      password: 'hashed_password',
      status: 'active',
    }
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // 模拟密码验证
    await new Promise((resolve) => setTimeout(resolve, 50))
    return password !== 'wrong'
  }

  private async incrementLoginFailures(userId: string): Promise<void> {
    // 模拟更新失败次数
    await new Promise((resolve) => setTimeout(resolve, 10))
  }

  private async updateLastLoginTime(userId: string): Promise<void> {
    // 模拟更新登录时间
    await new Promise((resolve) => setTimeout(resolve, 15))
  }

  private async updateUser(userId: string, updateData: any): Promise<void> {
    // 模拟用户更新
    await new Promise((resolve) => setTimeout(resolve, 25))
    if (userId === 'error_user') {
      throw new Error('更新失败')
    }
  }
}

// ==================== 控制器使用示例 ====================

@Controller('admin/advanced')
@AdminLog('AdvancedController')
export class AdvancedController {
  constructor(
    @Inject('ADMIN_LOGGER') private readonly logger: CustomLoggerService,
    private readonly userService: UserService,
  ) {}

  /**
   * 复杂业务流程示例
   */
  @Post('complex-operation')
  @LogPerformance('复杂业务操作')
  @LogBusiness('复杂业务流程')
  async complexOperation(@Body() operationData: any) {
    const operationId = `op_${Date.now()}`

    // 设置操作上下文
    this.logger.setLogContext({
      operationId,
      operationType: operationData.type,
    })

    this.logger.info('开始复杂业务操作', { operationData })

    try {
      // 步骤1: 数据预处理
      this.logger.debug('步骤1: 数据预处理')
      const preprocessedData = await this.preprocessData(operationData)

      // 步骤2: 业务验证
      this.logger.debug('步骤2: 业务验证')
      await this.validateBusinessRules(preprocessedData)

      // 步骤3: 执行核心逻辑
      this.logger.debug('步骤3: 执行核心逻辑')
      const result = await this.executeCoreLogic(preprocessedData)

      // 步骤4: 后处理
      this.logger.debug('步骤4: 后处理')
      const finalResult = await this.postProcess(result)

      this.logger.info('复杂业务操作完成', {
        operationId,
        resultId: finalResult.id,
      })

      return finalResult
    } catch (error) {
      this.logger.error('复杂业务操作失败', error.stack, { operationId })
      throw error
    }
  }

  /**
   * 文件处理示例
   */
  @Post('file-processing')
  @LogPerformance('文件处理')
  async fileProcessing(@Body() fileData: any) {
    const fileLogger = this.logger.child('FileProcessing', {
      fileName: fileData.name,
      fileSize: fileData.size,
      fileType: fileData.type,
    })

    fileLogger.info('开始文件处理')

    try {
      // 文件验证
      fileLogger.debug('验证文件格式和大小')
      this.validateFile(fileData)

      // 文件上传
      const uploadStart = Date.now()
      const uploadResult = await this.uploadFile(fileData)
      const uploadDuration = Date.now() - uploadStart

      fileLogger.logPerformance('文件上传', uploadDuration)

      // 文件处理
      const processStart = Date.now()
      const processResult = await this.processFile(uploadResult.path)
      const processDuration = Date.now() - processStart

      fileLogger.logPerformance('文件处理', processDuration)

      // 保存处理结果
      const saveStart = Date.now()
      await this.saveProcessResult(processResult)
      const saveDuration = Date.now() - saveStart

      fileLogger.logDatabase('INSERT', 'file_process_results', saveDuration)

      fileLogger.logBusiness('文件处理', 'success', {
        fileId: uploadResult.id,
        processedSize: processResult.size,
      })

      return {
        message: '文件处理完成',
        fileId: uploadResult.id,
        processResult,
      }
    } catch (error) {
      fileLogger.error('文件处理失败', error.stack)
      fileLogger.logBusiness('文件处理', 'failure', {
        fileName: fileData.name,
        error: error.message,
      })
      throw error
    }
  }

  /**
   * 外部API调用示例
   */
  @Get('external-integration/:id')
  async externalIntegration(@Param('id') resourceId: string) {
    const integrationLogger = this.logger.child('ExternalIntegration', {
      resourceId,
      apiProvider: 'third-party-service',
    })

    integrationLogger.info('开始外部API集成')

    try {
      // 准备API调用
      const apiConfig = await this.getApiConfig()
      integrationLogger.debug('API配置获取完成', {
        endpoint: apiConfig.endpoint,
      })

      // 调用外部API
      const apiStart = Date.now()
      const apiResponse = await this.callExternalApi(resourceId, apiConfig)
      const apiDuration = Date.now() - apiStart

      integrationLogger.logPerformance('外部API调用', apiDuration)

      // 检查API响应
      if (apiDuration > 5000) {
        integrationLogger.warn('外部API响应缓慢', {
          duration: apiDuration,
          threshold: 5000,
        })
      }

      // 处理API响应
      const processedData = await this.processApiResponse(apiResponse)

      // 缓存结果
      await this.cacheApiResult(resourceId, processedData)

      integrationLogger.info('外部API集成完成', {
        resourceId,
        dataSize: JSON.stringify(processedData).length,
      })

      return processedData
    } catch (error) {
      integrationLogger.error('外部API集成失败', error.stack, {
        resourceId,
        errorType: error.constructor.name,
      })

      // 尝试从缓存获取
      try {
        const cachedData = await this.getCachedApiResult(resourceId)
        if (cachedData) {
          integrationLogger.warn('使用缓存数据', { resourceId })
          return cachedData
        }
      } catch (cacheError) {
        integrationLogger.error('缓存获取也失败', cacheError.stack)
      }

      throw error
    }
  }

  // 辅助方法
  private async preprocessData(data: any): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return { ...data, preprocessed: true }
  }

  private async validateBusinessRules(data: any): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 30))
    if (data.invalid) {
      throw new Error('业务规则验证失败')
    }
  }

  private async executeCoreLogic(data: any): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return { id: 'result_123', data }
  }

  private async postProcess(result: any): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 25))
    return { ...result, postProcessed: true }
  }

  private validateFile(fileData: any): void {
    if (fileData.size > 100 * 1024 * 1024) {
      throw new Error('文件过大')
    }
  }

  private async uploadFile(fileData: any): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return { id: 'file_123', path: '/uploads/file_123' }
  }

  private async processFile(filePath: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { size: 1024, processedPath: '/processed/file_123' }
  }

  private async saveProcessResult(result: any): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  private async getApiConfig(): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 10))
    return { endpoint: 'https://api.example.com', timeout: 5000 }
  }

  private async callExternalApi(resourceId: string, config: any): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { id: resourceId, data: 'external_data' }
  }

  private async processApiResponse(response: any): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return { processed: true, ...response }
  }

  private async cacheApiResult(resourceId: string, data: any): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 20))
  }

  private async getCachedApiResult(resourceId: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 10))
    return null // 模拟缓存未命中
  }
}

// ==================== 中间件使用示例 ====================

@Injectable()
export class LoggingMiddleware {
  constructor(private readonly loggerFactory: LoggerFactoryService) {}

  use(req: any, res: any, next: () => void) {
    const startTime = Date.now()
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // 根据路径选择日志器
    const logger = this.loggerFactory.createContextualLogger('HttpMiddleware')

    // 设置请求上下文
    logger.setLogContext({
      requestId,
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    })

    // 记录请求开始
    logger.debug('HTTP请求开始', {
      headers: this.sanitizeHeaders(req.headers),
      query: req.query,
    })

    // 监听响应结束
    res.on('finish', () => {
      const duration = Date.now() - startTime
      logger.logRequest(req.method, req.url, res.statusCode, duration)

      if (res.statusCode >= 400) {
        logger.warn('HTTP请求返回错误状态', {
          statusCode: res.statusCode,
          duration,
        })
      }
    })

    next()
  }

  private sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers }
    const sensitiveHeaders = ['authorization', 'cookie']

    sensitiveHeaders.forEach((header) => {
      if (sanitized[header]) {
        sanitized[header] = '[REDACTED]'
      }
    })

    return sanitized
  }
}

// ==================== 定时任务使用示例 ====================

@Injectable()
export class ScheduledTasksService {
  private readonly logger: CustomLoggerService

  constructor(private readonly loggerFactory: LoggerFactoryService) {
    this.logger = this.loggerFactory.createGlobalLogger('ScheduledTasks')
  }

  // 每天凌晨执行的数据清理任务
  async dailyCleanupTask(): Promise<void> {
    const taskLogger = this.logger.child('DailyCleanup', {
      taskId: `cleanup_${Date.now()}`,
      scheduledTime: new Date().toISOString(),
    })

    taskLogger.info('开始执行每日清理任务')

    try {
      // 清理过期日志
      const logCleanupStart = Date.now()
      const deletedLogs = await this.cleanupExpiredLogs()
      const logCleanupDuration = Date.now() - logCleanupStart

      taskLogger.logPerformance('日志清理', logCleanupDuration)
      taskLogger.info('过期日志清理完成', { deletedCount: deletedLogs })

      // 清理临时文件
      const fileCleanupStart = Date.now()
      const deletedFiles = await this.cleanupTempFiles()
      const fileCleanupDuration = Date.now() - fileCleanupStart

      taskLogger.logPerformance('临时文件清理', fileCleanupDuration)
      taskLogger.info('临时文件清理完成', { deletedCount: deletedFiles })

      // 数据库优化
      const dbOptimizeStart = Date.now()
      await this.optimizeDatabase()
      const dbOptimizeDuration = Date.now() - dbOptimizeStart

      taskLogger.logPerformance('数据库优化', dbOptimizeDuration)
      taskLogger.info('数据库优化完成')

      taskLogger.logBusiness('每日清理任务', 'success', {
        deletedLogs,
        deletedFiles,
        totalDuration: Date.now() - taskLogger.logContext.scheduledTime,
      })

      taskLogger.info('每日清理任务执行完成')
    } catch (error) {
      taskLogger.error('每日清理任务执行失败', error.stack)
      taskLogger.logBusiness('每日清理任务', 'failure', {
        error: error.message,
      })
      throw error
    }
  }

  private async cleanupExpiredLogs(): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return 150 // 模拟删除了150个过期日志
  }

  private async cleanupTempFiles(): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return 75 // 模拟删除了75个临时文件
  }

  private async optimizeDatabase(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
}
