import type { Comic, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import { CategoryService } from '@/service/contentMgmt/category.service'
import { AuthorService } from '@/service/contentMgmt/author.service'

@Provide()
export class ComicService extends BasicService<Comic> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  categoryService: CategoryService

  @Inject()
  authorService: AuthorService

  protected get model() {
    return this.prismaClient.comic
  }

  async createComic(body: Partial<Comic>) {
    const { categoryId, authorId } = body
    const [category, author] = await Promise.all([
      this.categoryService.findMany({ where: { id: { in: categoryId } } }),
      this.authorService.findUnique({ where: { id: authorId } }),
    ])
    console.log(category)
    if (!category) {
      this.throwError('分类不存在')
    }
    if (!author) {
      this.throwError('作者不存在')
    }
    body.authorName = author.name
    body.categoryName = category.name
    return this.create({ data: body })
  }
}
