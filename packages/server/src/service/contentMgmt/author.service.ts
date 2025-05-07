import type { WorkAuthor, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'

@Provide()
export class AuthorService extends BasicService<WorkAuthor> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.workAuthor
  }
}
