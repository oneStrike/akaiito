import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../../base/service/base.service'
import { PrismaClient, DataDictionary } from '@prisma/client'

@Provide()
export class DictionaryService extends BaseService<DataDictionary> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.dataDictionary
  }
}
