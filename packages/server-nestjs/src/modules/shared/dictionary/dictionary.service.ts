import type {
  DictionaryItemWhereInput,
  DictionaryWhereInput,
} from '@/prisma/client/models'
import { Injectable } from '@nestjs/common'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { CreateDictionaryItemDto } from './dto/dictionary-item.dto'
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
    const where: DictionaryWhereInput = {}
    if (queryDto.code) {
      where.code = { contains: queryDto.code }
    }
    if (queryDto.name) {
      where.name = { contains: queryDto.name }
    }
    if (queryDto.isEnabled !== undefined) {
      where.isEnabled = queryDto.isEnabled
    }
    return this.findManyWithCommonPagination({ where, ...queryDto })
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
      list: data,
      total,
      pageIndex,
      pageSize,
    }
  }

  /**
   * 创建字典项
   * @param createDictionaryItemDto 创建字典项数据
   * @returns 创建的字典项信息
   */
  createDictionaryItem(createDictionaryItemDto: CreateDictionaryItemDto) {
    return this.prisma.dictionaryItem.create({
      data: {
        ...createDictionaryItemDto,
        isEnabled: createDictionaryItemDto.isEnabled ?? true,
      },
    })
  }

  /**
   * 批量更新字典项
   * @param updateDictionaryItemDto 更新数据
   * @returns 更新后的字典项信息
   */
  updateDictionaryItem(updateDictionaryItemDto: Record<string, any>) {
    const { ids, isEnabled } = updateDictionaryItemDto
    return this.prisma.dictionaryItem.updateMany({
      where: { id: { in: ids } },
      data: { isEnabled },
    })
  }

  /**
   * 删除字典项
   * @param ids 字典项ID
   */
  async deleteDictionaryItem(ids: number[]) {
    return this.prisma.dictionaryItem.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  }
}
