import type { DictionaryItem, PrismaClient } from '@prisma/client'
import { DictionaryService } from './dictionary.service'
import { CreateDictionaryItemsDTO, FindDictionItemsDTO } from '@/modules/admin/dataDictionary/dto/dictionary.dto'
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
    return this.findList({
      where: items,
      include: {
        dictionary: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      like: {
        name: 'contains',
        code: 'contains',
      },
    })
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
        order: await this.getCount(),
      },
    })
  }
}
