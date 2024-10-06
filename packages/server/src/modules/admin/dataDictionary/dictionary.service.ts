import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import { DataDictionary, PrismaClient } from '@prisma/client'

@Provide()
export class DictionaryService extends BasicService<DataDictionary> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.dataDictionary
  }
}
