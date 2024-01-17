import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '../../../basic/service/basic.service'
import { PrismaClient, DataDictionary } from '@prisma/client'

@Provide()
export class DictionaryService extends BasicService<DataDictionary> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.dataDictionary
  }
}
