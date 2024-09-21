import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import { Category, PrismaClient } from '@prisma/client'

@Provide()
export class CategoryService extends BasicService<Category> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.category
  }
}
