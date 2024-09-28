import type { Category, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'

@Provide()
export class CategoryService extends BasicService<Category> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.category
  }
}
