import { BasicService } from '@/basic/service/basic.service'
import { PrismaFindOptions } from '@/typings/service/base.service'
import { Inject, Provide } from '@midwayjs/core'
import { DataDictionaryItems, PrismaClient } from '@prisma/client'
import { DictionaryService } from './dictionary.service'
import { CreateDictionaryItemsDto } from './dto/dictionary.dto'

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
    return this.findPage({ ...items })
  }

  async createItems(items: CreateDictionaryItemsDto) {
    const dict = await this.dictionaryService.findUnique({
      id: items.dictionaryId,
    })
    if (!dict) {
      return this.throwError('暂未查询到对应的数据字典')
    }
    return this.create({
      ...items,
      dictionaryName: dict.name,
      order: await this.getCount(),
    })
  }
}
