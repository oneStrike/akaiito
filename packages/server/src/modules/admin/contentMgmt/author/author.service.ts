import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import { PrismaClient, Author } from '@prisma/client'

@Provide()
export class AuthorService extends BasicService<Author> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.adminUser
  }
}
