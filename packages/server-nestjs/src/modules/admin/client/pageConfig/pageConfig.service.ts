import { BadRequestException, Injectable } from '@nestjs/common'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { ClientPageConfigWhereInput } from '@/prisma/client/models/ClientPageConfig'
import {
  CreateClientPageConfigDto,
  QueryClientPageConfigDto,
  UpdateClientPageConfigDto,
} from './dto/pageConfig.dto'

/**
 * 页面配置服务类
 * 提供页面配置的增删改查等核心业务逻辑
 */
@Injectable()
export class ClientPageConfigService extends BaseRepositoryService<'ClientPageConfig'> {
  protected readonly modelName = 'ClientPageConfig' as const
  protected readonly supportsSoftDelete = true

  /**
   * 创建页面配置
   * @param createPageConfigDto 创建页面配置的数据
   * @returns 创建的页面配置信息
   */
  async createPageConfig(createPageConfigDto: CreateClientPageConfigDto) {
    // 验证页面编码是否已存在
    const existingByCode = await this.findFirst({
      where: { pageCode: createPageConfigDto.pageCode },
    })
    if (existingByCode) {
      throw new BadRequestException(
        `页面编码 "${createPageConfigDto.pageCode}" 已存在`,
      )
    }

    // 验证页面路径是否已存在
    const existingByPath = await this.findFirst({
      where: { pagePath: createPageConfigDto.pagePath },
    })
    if (existingByPath) {
      throw new BadRequestException(
        `页面路径 "${createPageConfigDto.pagePath}" 已存在`,
      )
    }

    return this.create({ data: createPageConfigDto })
  }

  /**
   * 分页查询页面配置列表
   * @param queryPageConfigDto 查询条件
   * @returns 分页的页面配置列表
   */
  async findPageConfigPage(queryPageConfigDto: QueryClientPageConfigDto) {
    const { pageName, pageCode, pageRule, status } = queryPageConfigDto

    const where: ClientPageConfigWhereInput = {}

    if (pageName) {
      where.pageName = { contains: pageName, mode: 'insensitive' }
    }
    if (pageCode) {
      where.pageCode = pageCode
    }
    if (pageRule !== undefined) where.pageRule = pageRule
    if (status !== undefined) where.status = status

    return this.findPagination({
      ...queryPageConfigDto,
      where,
      orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }],
    })
  }

  /**
   * 获取启用的页面配置列表（客户端使用）
   * @param pageRule 页面权限级别过滤
   * @returns 启用的页面配置列表
   */
  async findActivePageConfigs(pageRule?: string) {
    const where: ClientPageConfigWhereInput = {
      status: 'ENABLED', // 只返回启用的页面
    }

    if (pageRule) {
      where.pageRule = pageRule as any
    }

    return await this.findMany({
      where,
      orderBy: [{ sortOrder: 'desc' }, { pageName: 'asc' }],
      select: {
        id: true,
        pageCode: true,
        pagePath: true,
        pageName: true,
        pageTitle: true,
        pageRule: true,
        description: true,
        sortOrder: true,
        viewCount: true,
      },
    })
  }

  /**
   * 根据页面编码查询页面配置详情
   * @param pageCode 页面编码
   * @returns 页面配置详情
   */
  async findByPageCode(pageCode: string) {
    const pageConfig = await this.findFirst({
      where: { pageCode },
      include: {
        notices: {
          where: {
            status: 'PUBLISHED',
            OR: [
              {
                AND: [
                  { startTime: { lte: new Date() } },
                  { endTime: { gte: new Date() } },
                ],
              },
              {
                AND: [{ startTime: null }, { endTime: null }],
              },
            ],
          },
          orderBy: [
            { isTop: 'desc' },
            { priority: 'desc' },
            { createdAt: 'desc' },
          ],
          take: 10, // 最多返回10条通知
        },
      },
    })

    if (!pageConfig) {
      throw new BadRequestException(`页面编码 "${pageCode}" 不存在`)
    }

    return pageConfig
  }

  /**
   * 根据ID查询页面配置详情
   * @param id 页面配置ID
   * @returns 页面配置详情
   */
  async findDetail(id: number) {
    return await this.findById({
      id,
      include: {
        notices: {
          select: {
            id: true,
            title: true,
            type: true,
            priority: true,
            status: true,
            isTop: true,
            createdAt: true,
          },
          orderBy: [
            { isTop: 'desc' },
            { priority: 'desc' },
            { createdAt: 'desc' },
          ],
        },
      },
    })
  }

  /**
   * 更新页面配置
   * @param updatePageConfigDto 更新数据
   * @returns 更新后的页面配置信息
   */
  async updatePageConfig(updatePageConfigDto: UpdateClientPageConfigDto) {
    const { id, ...updateData } = updatePageConfigDto

    // 如果更新页面编码，验证是否已存在
    if (updateData.pageCode) {
      const existingByCode = await this.findFirst({
        where: {
          pageCode: updateData.pageCode,
          id: { not: id },
        },
      })
      if (existingByCode) {
        throw new BadRequestException(
          `页面编码 "${updateData.pageCode}" 已存在`,
        )
      }
    }

    // 如果更新页面路径，验证是否已存在
    if (updateData.pagePath) {
      const existingByPath = await this.findFirst({
        where: {
          pagePath: updateData.pagePath,
          id: { not: id },
        },
      })
      if (existingByPath) {
        throw new BadRequestException(
          `页面路径 "${updateData.pagePath}" 已存在`,
        )
      }
    }

    return await this.update({
      where: { id },
      data: updateData,
    })
  }

  /**
   * 增加页面访问次数
   * @param pageCode 页面编码
   * @returns 更新后的访问次数
   */
  async incrementViewCount(pageCode: string) {
    // 验证页面是否存在且启用
    const pageConfig = await this.findFirst({
      where: {
        pageCode,
        status: 'ENABLED',
      },
      select: {
        id: true,
      },
    })

    if (!pageConfig) {
      throw new BadRequestException('页面不存在或未启用')
    }

    // 原子性更新访问次数
    return await this.update({
      where: { id: pageConfig.id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      select: {
        id: true,
        pageCode: true,
        viewCount: true,
      },
    })
  }

  /**
   * 批量更新页面状态
   * @param ids 页面配置ID数组
   * @param status 新状态
   * @returns 更新结果
   */
  async batchUpdateStatus(ids: number[], status: string) {
    return await this.updateMany({
      where: {
        id: { in: ids },
      },
      data: { status: status as any },
    })
  }
}
