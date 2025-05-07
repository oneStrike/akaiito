import type { Dictionary, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'

@Provide()
export class DictionaryService extends BasicService<Dictionary> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.dictionary
  }
}
