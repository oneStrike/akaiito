import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import {
  DictionaryItemWhereInput,
  DictionaryWhereInput,
} from '@/prisma/client/models'
import { UpdateDictionaryItemDto } from './dto/dictionary-item.dto'
import {
  QueryDictionaryDto,
  QueryDictionaryItemDto,
} from './dto/query-dictionary.dto'

/**
 * 数据字典服务类
 * 提供字典和字典项的增删改查功能
 */
@Injectable()
export class DictionaryService extends BaseRepositoryService<'Dictionary'> {
  protected readonly modelName = 'Dictionary' as const

  /**
   * 分页查询数据字典列表
   * @param queryDto 查询条件
   * @returns 分页数据
   */
  async findDictionaries(queryDto: QueryDictionaryDto) {
    const { pageIndex = 0, pageSize = 15, name, code, isEnabled } = queryDto
    // 构建查询条件
    const where: DictionaryWhereInput = {}
    if (name) {
      where.name = { contains: name }
    }
    if (code) {
      where.code = { contains: code }
    }
    if (isEnabled !== undefined) {
      where.isEnabled = isEnabled
    }

    const [data, total] = await Promise.all([
      this.findMany({
        where,
        skip: pageIndex * pageSize,
        take: pageSize,
        omit: { remark: true },
      }),
      this.count(where),
    ])

    return {
      list: data,
      total,
      pageIndex,
      pageSize,
    }
  }

  /**
   * 分页查询字典项列表
   * @param queryDto 查询条件
   * @returns 分页数据
   */
  async findDictionaryItems(queryDto: QueryDictionaryItemDto) {
    const {
      pageIndex = 0,
      pageSize = 15,
      dictionaryCode,
      name,
      code,
      isEnabled,
    } = queryDto

    // 检查字典是否存在
    const dictionary = await this.prisma.dictionary.findUnique({
      where: { code: dictionaryCode },
    })
    if (!dictionary) {
      throw new HttpException(
        `字典编码 "${dictionaryCode}" 不存在`,
        HttpStatus.NOT_FOUND,
      )
    }

    // 构建查询条件
    const where: DictionaryItemWhereInput = {
      dictionaryCode,
    }
    if (name) {
      where.name = { contains: name }
    }
    if (code) {
      where.code = { contains: code }
    }
    if (isEnabled !== undefined) {
      where.isEnabled = isEnabled
    }

    try {
      const [data, total] = await Promise.all([
        this.prisma.dictionaryItem.findMany({
          where,
          skip: pageIndex * pageSize,
          take: pageSize,
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        }),
        this.prisma.dictionaryItem.count({ where }),
      ])

      return {
        data,
        total,
        pageIndex,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      }
    } catch (error) {
      throw new HttpException(
        '查询字典项列表失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 根据ID获取字典项详情
   * @param id 字典项ID
   * @returns 字典项详情
   */
  async findDictionaryItemById(id: number) {
    try {
      const dictionaryItem = await this.prisma.dictionaryItem.findUnique({
        where: { id },
        include: {
          dictionary: true,
        },
      })

      if (!dictionaryItem) {
        throw new HttpException(
          `ID为 ${id} 的字典项不存在`,
          HttpStatus.NOT_FOUND,
        )
      }

      return dictionaryItem
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        '获取字典项详情失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 批量更新字典项
   * @param updateDictionaryItemDto 更新数据
   * @returns 更新后的字典项信息
   */
  async updateDictionaryItem(updateDictionaryItemDto: UpdateDictionaryItemDto) {
    try {
      return await this.prisma.dictionaryItem.updateMany({
        where: { id: updateDictionaryItemDto.id },
        data: updateDictionaryItemDto,
      })
    } catch (error) {
      throw new HttpException(
        '更新字典项失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 删除字典项
   * @param ids 字典项ID
   */
  async deleteDictionaryItem(ids: number[]) {
    try {
      await this.prisma.dictionaryItem.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      })

      return { message: '字典项删除成功' }
    } catch (error) {
      throw new HttpException(
        '删除字典项失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 获取所有启用的字典列表（不分页）
   * @returns 字典列表
   */
  async findAllEnabledDictionaries() {
    try {
      return await this.prisma.dictionary.findMany({
        where: { isEnabled: true },
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            where: { isEnabled: true },
            orderBy: { order: 'asc' },
          },
        },
      })
    } catch (error) {
      throw new HttpException(
        '获取字典列表失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
