import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/global/services/prisma.service'
import { AdminUser, Prisma } from '@/prisma/client'

import { BaseRepositoryService } from './base-repository.service'

/**
 * 用户仓储服务示例
 * 继承抽象数据库服务层，提供用户相关的数据库操作
 * 支持软删除功能
 *
 * 这是一个使用示例，展示如何继承 BaseRepositoryService
 */
@Injectable()
export class UserRepositoryService extends BaseRepositoryService<AdminUser> {
  protected readonly modelName = 'AdminUser'
  protected readonly supportsSoftDelete = true // 启用软删除功能

  constructor(prisma: PrismaService) {
    super(prisma)
  }

  /**
   * 获取 Prisma 模型代理
   * 返回对应的 Prisma 模型
   */
  protected get model() {
    return this.prisma.adminUser
  }

  // ==================== 业务特定方法 ====================

  /**
   * 根据用户名查找用户
   * @param username 用户名
   * @returns 用户信息或null
   */
  async findByUsername(username: string): Promise<AdminUser | null> {
    return this.findFirst({ username, id: 1, status: 1 })
  }

  /**
   * 根据手机号查找用户
   * @param mobile 手机号
   * @returns 用户信息或null
   */
  async findByMobile(mobile: string): Promise<AdminUser | null> {
    return this.findFirst({ mobile })
  }

  /**
   * 根据用户名或手机号查找用户
   * @param usernameOrMobile 用户名或手机号
   * @returns 用户信息或null
   */
  async findByUsernameOrMobile(
    usernameOrMobile: string,
  ): Promise<AdminUser | null> {
    return this.findFirst({
      OR: [{ username: usernameOrMobile }, { mobile: usernameOrMobile }],
    })
  }

  /**
   * 检查用户名是否已存在
   * @param username 用户名
   * @param excludeId 排除的用户ID（用于更新时检查）
   * @returns 是否存在
   */
  async isUsernameExists(
    username: string,
    excludeId?: number,
  ): Promise<boolean> {
    const where: Prisma.AdminUserWhereInput = { username }
    if (excludeId) {
      where.id = { not: excludeId }
    }
    return this.exists(where)
  }

  /**
   * 检查手机号是否已存在
   * @param mobile 手机号
   * @param excludeId 排除的用户ID（用于更新时检查）
   * @returns 是否存在
   */
  async isMobileExists(mobile: string, excludeId?: number): Promise<boolean> {
    const where: Prisma.AdminUserWhereInput = { mobile }
    if (excludeId) {
      where.id = { not: excludeId }
    }
    return this.exists(where)
  }

  /**
   * 获取活跃用户列表
   * @param page 页码
   * @param pageSize 每页大小
   * @returns 分页结果
   */
  async findActiveUsers(page: number = 1, pageSize: number = 10) {
    return this.findManyWithPagination(
      page,
      pageSize,
      { status: 1 }, // 假设 1 表示活跃状态
      { createdAt: 'desc' },
      undefined,
      {
        id: true,
        username: true,
        mobile: true,
        email: true,
        nickname: true,
        avatar: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        // 排除敏感字段
        password: false,
      },
    )
  }

  /**
   * 批量更新用户状态
   * @param userIds 用户ID数组
   * @param status 新状态
   * @returns 更新结果
   */
  async updateUsersStatus(userIds: number[], status: number) {
    return this.updateMany({ id: { in: userIds } }, { status })
  }

  // 软删除和恢复功能已由基础服务提供
  // 可以直接使用 this.softDelete(id) 和 this.restore(id)

  /**
   * 获取用户统计信息
   * @returns 统计结果
   */
  async getUserStats(): Promise<{
    total: number
    active: number
    inactive: number
    deleted: number
  }> {
    const [total, active, inactive, deleted] = await Promise.all([
      this.countWithDeleted(), // 包含软删除记录的总数
      this.count({ status: 1 }), // 活跃用户（自动排除软删除）
      this.count({ status: 0 }), // 非活跃用户（自动排除软删除）
      this.countOnlyDeleted(), // 只统计软删除记录
    ])

    return { total, active, inactive, deleted }
  }

  /**
   * 搜索用户
   * @param keyword 搜索关键词
   * @param page 页码
   * @param pageSize 每页大小
   * @returns 搜索结果
   */
  async searchUsers(keyword: string, page: number = 1, pageSize: number = 10) {
    const where: Prisma.AdminUserWhereInput = {
      OR: [
        { username: { contains: keyword } },
        { nickname: { contains: keyword } },
        { email: { contains: keyword } },
        { mobile: { contains: keyword } },
      ],
      // 不需要手动排除软删除记录，基础服务会自动处理
    }

    return this.findManyWithPagination(
      page,
      pageSize,
      where,
      { createdAt: 'desc' },
      undefined,
      {
        id: true,
        username: true,
        mobile: true,
        email: true,
        nickname: true,
        avatar: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        password: false, // 排除密码字段
      },
    )
  }
}
