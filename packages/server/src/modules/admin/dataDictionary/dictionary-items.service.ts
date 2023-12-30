import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../../base/service/base.service'
import { PrismaClient, DataDictionaryItems } from '@prisma/client'
import {
  CreateDictionaryItemsDto,
  FindDictionItemsDto
} from './dto/dictionary.dto'

@Provide()
export class DictionaryServiceItems extends BaseService<DataDictionaryItems> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.dataDictionaryItems
  }

  async getItems(items: FindDictionItemsDto) {
    return this.findPage({ ...items })
  }

  async createItems(items: CreateDictionaryItemsDto) {
    return this.create({ ...items, order: await this.getCount() })
  }
}
