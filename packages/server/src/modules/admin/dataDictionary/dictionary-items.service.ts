import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../../base/service/base.service'
import { PrismaClient, DataDictionaryItems } from '@prisma/client'
import { CreateDictionaryItemsDto } from './dto/dictionary.dto'
import { PrismaFindOptions } from '../../../typings/service/base.service'
import { DictionaryService } from './dictionary.service'

@Provide()
export class DictionaryServiceItems extends BaseService<DataDictionaryItems> {
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
      id: items.dictionaryId
    })
    if (!dict) {
      return this.throwError('暂未查询到对应的数据字典')
    }
    return this.create({
      ...items,
      dictionaryName: dict.name,
      order: await this.getCount()
    })
  }
}
