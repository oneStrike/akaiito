import { PrismaFindOptions } from '@/typings/service/base.service'

import type { DataDictionaryItems, PrismaClient } from '@prisma/client'
import { DictionaryService } from './dictionary.service'
import { CreateDictionaryItemsDto } from './dto/dictionary.dto'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'

@Provide()
export class DictionaryServiceItems extends BasicService<DataDictionaryItems> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  dictionaryService: DictionaryService

  protected get model() {
    return this.prismaClient.dataDictionaryItems
  }

  async getItems(items: PrismaFindOptions<DataDictionaryItems>) {
    return this.findPage({ where: items })
  }

  async createItems(items: CreateDictionaryItemsDto) {
    const dict = await this.dictionaryService.findUnique({
      where: { id: items.dictionaryId },
    })
    if (!dict) {
      return this.throwError('暂未查询到对应的数据字典')
    }
    return this.create({
      data: {
        ...items,
        dictionaryName: dict.name,
        order: await this.getCount(),
      },
    })
  }
}
