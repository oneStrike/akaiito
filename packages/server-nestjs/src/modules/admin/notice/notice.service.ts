import { BadRequestException, Injectable } from '@nestjs/common'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { PrismaService } from '@/global/services/prisma.service'
import { ClientNoticeWhereInput } from '@/prisma/client/models/ClientNotice'
import {
  BatchDeleteNoticeDto,
  CreateNoticeDto,
  QueryNoticeDto,
  UpdateNoticeDto,
} from './dto/notice.dto'

/**
 * 通知服务类
 * 提供通知的增删改查等核心业务逻辑
 */
@Injectable()
export class NoticeService extends BaseRepositoryService<'ClientNotice'> {
  protected readonly modelName = 'ClientNotice' as const
  constructor(protected readonly prisma: PrismaService) {
    super(prisma)
  }

  /**
   * 创建通知
   * @param createNoticeDto 创建通知的数据
   * @returns 创建的通知信息
   */
  async createNotice(createNoticeDto: CreateNoticeDto) {
    // 验证时间范围
    if (createNoticeDto.startTime && createNoticeDto.endTime) {
      if (createNoticeDto.startTime >= createNoticeDto.endTime) {
        throw new BadRequestException('发布开始时间不能大于或等于结束时间')
      }
    }

    return this.create({ data: createNoticeDto })
  }

  /**
   * 分页查询通知列表
   * @param queryNoticeDto 查询条件
   * @returns 分页的通知列表
   */
  async findNoticePage(queryNoticeDto: QueryNoticeDto) {
    const { title, type, priority, status, isTop, isPopup } = queryNoticeDto

    const where: ClientNoticeWhereInput = {}

    if (title) {
      where.title = { contains: title, mode: 'insensitive' }
    }
    if (type !== undefined) where.type = type
    if (priority !== undefined) where.priority = priority
    if (status !== undefined) where.status = status
    if (isTop !== undefined) where.isTop = isTop
    if (isPopup !== undefined) where.isPopup = isPopup

    return this.findPagination({
      ...queryNoticeDto,
      where,
    })
  }

  /**
   * 获取有效的通知列表（客户端使用）
   * @param platform 平台类型：applet | web | app
   * @returns 有效的通知列表
   */
  async findActiveNotices(platform: 'applet' | 'web' | 'app' = 'web') {
    const now = new Date()

    // 构建平台筛选条件
    const platformCondition = {
      applet: { enableApplet: true },
      web: { enableWeb: true },
      app: { enableApp: true },
    }[platform]

    return await this.findMany({
      where: {
        status: 1, // 已发布
        ...platformCondition,
        OR: [
          {
            AND: [{ startTime: { lte: now } }, { endTime: { gte: now } }],
          },
          {
            AND: [{ startTime: null }, { endTime: null }],
          },
          {
            AND: [{ startTime: { lte: now } }, { endTime: null }],
          },
          {
            AND: [{ startTime: null }, { endTime: { gte: now } }],
          },
        ],
      },
      orderBy: [
        { isTop: 'desc' },
        { priority: 'desc' },
        { sortOrder: 'desc' },
        { createdAt: 'desc' },
      ],
      omit: {
        content: true,
        backgroundImage: true,
      },
    })
  }

  /**
   * 根据ID查询通知详情
   * @param id 通知ID
   * @returns 通知详情
   */
  async findDetail(id: number) {
    return await this.findById({
      id,
      include: {
        appPage: {
          select: {
            pageCode: true,
            pageName: true,
            pagePath: true,
          },
        },
      },
    })
  }

  /**
   * 更新通知
   * @param updateNoticeDto 更新数据
   * @returns 更新后的通知信息
   */
  async updateNotice(updateNoticeDto: UpdateNoticeDto) {
    const { id, ...updateData } = updateNoticeDto

    // 验证时间范围
    if (updateData.startTime && updateData.endTime) {
      if (updateData.startTime >= updateData.endTime) {
        throw new BadRequestException('发布开始时间不能大于或等于结束时间')
      }
    }

    return await this.update({
      where: { id },
      data: updateData,
    })
  }

  /**
   * 增加通知阅读次数
   * @param id 通知ID
   * @returns 更新后的阅读次数
   */
  async incrementViewCount(id: number) {
    // 验证通知是否存在且已发布
    const notice = await this.findFirst({
      where: {
        id,
        status: 1,
      },
    })

    if (!notice) {
      throw new BadRequestException('通知不存在或未发布')
    }

    // 原子性更新阅读次数
    return await this.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      select: {
        id: true,
        viewCount: true,
      },
    })
  }
}
