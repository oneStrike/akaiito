import type { DictionaryItem, PrismaClient } from '@prisma/client'
import { DictionaryService } from './dictionary.service'
import { CreateDictionaryItemsDTO } from '../../modules/admin/dataDictionary/dto/dictionary.dto'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import { PrismaFindPageOptions } from '@/typings/prisma'

@Provide()
export class DictionaryServiceItems extends BasicService<DictionaryItem> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  dictionaryService: DictionaryService

  protected get model() {
    return this.prismaClient.dictionaryItem
  }

  async getItems(items: PrismaFindPageOptions<DictionaryItem>) {
    return this.findPage(items)
  }

  async createItems(items: CreateDictionaryItemsDTO) {
    const dict = await this.dictionaryService.findUnique({
      where: { id: items.dictionaryId },
    })
    if (!dict) {
      return this.throwError('暂未查询到对应的数据字典')
    }
    return this.create({
      data: {
        ...items,
        order: await this.getCount(),
      },
    })
  }
}
