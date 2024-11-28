import type { Author, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'

@Provide()
export class AuthorService extends BasicService<Author> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.author
  }
}
