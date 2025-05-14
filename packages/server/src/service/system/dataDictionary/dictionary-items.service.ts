import type { DictionaryItem, PrismaClient } from '@prisma/client'
import { DictionaryService } from './dictionary.service'
import {
  CreateDictionaryItemsDTO,
  FindDictionItemsDTO,
} from '@/modules/admin/dataDictionary/dto/dictionary.dto'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'

@Provide()
export class DictionaryServiceItems extends BasicService<DictionaryItem> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  dictionaryService: DictionaryService

  protected get model() {
    return this.prismaClient.dictionaryItem
  }

  async getItems(items: FindDictionItemsDTO) {
    // 安全地分割字符串，避免原型污染
    const codes = items.dictionaryCode.includes(',')
      ? items.dictionaryCode.split(',')
      : [items.dictionaryCode]

    // 使用IN操作符进行批量查询，减少数据库往返
    const results = await this.findList({
      where: {
        ...items,
        dictionaryCode: {
          in: codes,
        },
      },
      include: {
        dictionary: {
          select: {
            name: true,
          },
        },
      },
      like: {
        name: 'contains',
        code: 'contains',
      },
    })

    // 将结果按dictionaryCode分组
    const result: Record<string, any[]> = {}
    codes.forEach((code) => {
      result[code] = []
    })

    // 这里假设results是一个包含dictionaryCode属性的数组
    results.forEach((item: { dictionaryCode: string }) => {
      if (result[item.dictionaryCode]) {
        result[item.dictionaryCode].push(item)
      }
    })

    return result
  }

  async createItems(items: CreateDictionaryItemsDTO) {
    const { dictionaryCode, ...itemData } = items
    return this.create({
      data: {
        ...itemData,
        dictionary: {
          connect: {
            code: dictionaryCode,
          },
        },
      },
    })
  }
}
