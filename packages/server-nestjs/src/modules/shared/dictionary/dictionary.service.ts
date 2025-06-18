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
    return this.findManyWithCommonPagination({
      where: {
        AND: [
          {
            code: {
              contains: queryDto.code,
            },
          },
          {
            name: {
              contains: queryDto.name,
            },
          },
          {
            isEnabled: {
              equals: queryDto.isEnabled,
            },
          },
        ],
      },
      ...queryDto,
    })
  }

  /**
   * 分页查询字典项列表
   * @param queryDto 查询条件
   * @returns 分页数据
   */
  async findDictionaryItems(queryDto: QueryDictionaryItemDto) {
    const { dictionaryCode, name, code, isEnabled } = queryDto

    return this.prisma.dictionaryItem.findMany({
      where: {
        dictionaryCode: {
          in: dictionaryCode.split(','),
        },
        AND: [
          {
            code: {
              contains: code,
            },
          },
          {
            name: {
              contains: name,
            },
          },
          {
            isEnabled: {
              equals: isEnabled,
            },
          },
        ],
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })
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
