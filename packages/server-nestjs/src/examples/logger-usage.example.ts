import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import {
  AdminActionLog,
  LogAction,
  UserActionLog,
} from '@/common/decorators/log.decorator'
import { LoggerService } from '@/common/services/logger.service'

/**
 * 管理端控制器使用示例
 */
@Controller('admin/users')
export class AdminUserController {
  constructor(
    @Inject('AdminLoggerService') private readonly logger: LoggerService,
  ) {}

  @Get()
  @AdminActionLog(LogAction.READ, '获取用户列表')
  async getUsers() {
    this.logger.info('开始获取用户列表', 'AdminUserController')

    try {
      // 模拟业务逻辑
      const users = await this.getUsersFromDatabase()

      this.logger.logUserAction(
        'admin-001',
        '查看用户列表',
        { count: users.length },
        'AdminUserController',
      )

      return users
    } catch (error) {
      this.logger.logSystemError(error, 'AdminUserController', {
        action: '获取用户列表',
      })
      throw error
    }
  }

  @Post()
  @AdminActionLog(LogAction.CREATE, '创建用户')
  async createUser(@Body() userData: any) {
    this.logger.info(`开始创建用户: ${userData.email}`, 'AdminUserController')

    try {
      // 模拟创建用户
      const user = await this.createUserInDatabase(userData)

      this.logger.logUserAction(
        'admin-001',
        '创建用户',
        { userId: user.id, email: user.email },
        'AdminUserController',
      )

      return user
    } catch (error) {
      this.logger.logBusinessError(
        'USER_CREATE_FAILED',
        `创建用户失败: ${error.message}`,
        'admin-001',
        'AdminUserController',
      )
      throw error
    }
  }

  private async getUsersFromDatabase() {
    // 模拟数据库查询
    const startTime = Date.now()

    // 模拟查询耗时
    await new Promise((resolve) => setTimeout(resolve, 100))

    const duration = Date.now() - startTime
    this.logger.logDatabaseOperation(
      'SELECT',
      'users',
      duration,
      'AdminUserController',
    )

    return [
      { id: 1, email: 'admin@example.com', name: 'Admin User' },
      { id: 2, email: 'user@example.com', name: 'Regular User' },
    ]
  }

  private async createUserInDatabase(userData: any) {
    const startTime = Date.now()

    // 模拟创建用户
    await new Promise((resolve) => setTimeout(resolve, 200))

    const duration = Date.now() - startTime
    this.logger.logDatabaseOperation(
      'INSERT',
      'users',
      duration,
      'AdminUserController',
    )

    return {
      id: Date.now(),
      ...userData,
      createdAt: new Date(),
    }
  }
}

/**
 * 客户端控制器使用示例
 */
@Controller('client/profile')
export class ClientProfileController {
  constructor(
    @Inject('ClientLoggerService') private readonly logger: LoggerService,
  ) {}

  @Get(':id')
  @UserActionLog(LogAction.READ, '获取用户资料')
  async getProfile(@Param('id') id: string) {
    this.logger.info(`用户 ${id} 获取个人资料`, 'ClientProfileController')

    try {
      const profile = await this.getProfileFromDatabase(id)

      this.logger.logUserAction(
        id,
        '查看个人资料',
        { profileId: profile.id },
        'ClientProfileController',
      )

      return profile
    } catch (error) {
      this.logger.logSystemError(error, 'ClientProfileController', {
        userId: id,
        action: '获取个人资料',
      })
      throw error
    }
  }

  @Post(':id')
  @UserActionLog(LogAction.UPDATE, '更新用户资料')
  async updateProfile(@Param('id') id: string, @Body() profileData: any) {
    this.logger.info(`用户 ${id} 更新个人资料`, 'ClientProfileController')

    try {
      const updatedProfile = await this.updateProfileInDatabase(id, profileData)

      this.logger.logUserAction(
        id,
        '更新个人资料',
        {
          profileId: updatedProfile.id,
          updatedFields: Object.keys(profileData),
        },
        'ClientProfileController',
      )

      return updatedProfile
    } catch (error) {
      this.logger.logBusinessError(
        'PROFILE_UPDATE_FAILED',
        `更新用户资料失败: ${error.message}`,
        id,
        'ClientProfileController',
      )
      throw error
    }
  }

  private async getProfileFromDatabase(userId: string) {
    const startTime = Date.now()

    // 模拟数据库查询
    await new Promise((resolve) => setTimeout(resolve, 50))

    const duration = Date.now() - startTime
    this.logger.logDatabaseOperation(
      'SELECT',
      'user_profiles',
      duration,
      'ClientProfileController',
    )

    return {
      id: userId,
      name: 'User Name',
      email: 'user@example.com',
      avatar: 'avatar.jpg',
    }
  }

  private async updateProfileInDatabase(userId: string, profileData: any) {
    const startTime = Date.now()

    // 模拟数据库更新
    await new Promise((resolve) => setTimeout(resolve, 150))

    const duration = Date.now() - startTime
    this.logger.logDatabaseOperation(
      'UPDATE',
      'user_profiles',
      duration,
      'ClientProfileController',
    )

    return {
      id: userId,
      ...profileData,
      updatedAt: new Date(),
    }
  }
}

/**
 * 服务层使用示例
 */
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  async processUserData(userId: string, data: any) {
    this.logger.info(`开始处理用户 ${userId} 的数据`, 'UserService')

    try {
      // 数据验证
      this.validateUserData(data)

      // 数据处理
      const processedData = await this.transformUserData(data)

      // 保存数据
      await this.saveUserData(userId, processedData)

      this.logger.info(`用户 ${userId} 数据处理完成`, 'UserService')

      return processedData
    } catch (error) {
      this.logger.logSystemError(error, 'UserService', { userId, data })
      throw error
    }
  }

  private validateUserData(data: any) {
    this.logger.debug('开始验证用户数据', 'UserService')

    if (!data.email) {
      const error = new Error('邮箱不能为空')
      this.logger.logBusinessError(
        'VALIDATION_ERROR',
        '用户数据验证失败: 邮箱不能为空',
        undefined,
        'UserService',
      )
      throw error
    }

    this.logger.debug('用户数据验证通过', 'UserService')
  }

  private async transformUserData(data: any) {
    this.logger.debug('开始转换用户数据', 'UserService')

    // 模拟数据转换
    const transformed = {
      ...data,
      email: data.email.toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.logger.debug('用户数据转换完成', 'UserService')
    return transformed
  }

  private async saveUserData(userId: string, data: any) {
    const startTime = Date.now()

    this.logger.debug(`开始保存用户 ${userId} 的数据`, 'UserService')

    // 模拟保存操作
    await new Promise((resolve) => setTimeout(resolve, 100))

    const duration = Date.now() - startTime
    this.logger.logDatabaseOperation(
      'INSERT',
      'user_data',
      duration,
      'UserService',
    )

    this.logger.info(`用户 ${userId} 数据保存成功`, 'UserService')
  }
}
