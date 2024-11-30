import type { Comic, ComicCategory, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import { CategoryService } from '@/service/contentMgmt/category.service'
import { AuthorService } from '@/service/contentMgmt/author.service'
import { ComicDto, ComicSearchDto } from '@/modules/admin/contentMgmt/comic/dto/comic.dto'

@Provide()
export class ComicCategoryService extends BasicService<ComicCategory> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.comicCategory
  }
}

@Provide()
export class ComicService extends BasicService<Comic> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  categoryService: CategoryService

  @Inject()
  authorService: AuthorService

  @Inject()
  comicCategoryService: ComicCategoryService

  protected get model() {
    return this.prismaClient.comic
  }

  //  创建漫画数据
  async createComic(body: ComicDto) {
    const { categoryId } = body

    // 验证分类是否存在
    const categories = await this.categoryService.findMany({
      where: { id: { in: categoryId } },
      select: { id: true },
    })

    if (!categories.length) {
      this.throwError('分类不存在')
    }

    return await this.prismaClient.$transaction(async (tx) => {
      // 创建漫画
      const { categoryId, authorId, ...comicData } = body

      const comic = await tx.comic.create({
        data: {
          ...comicData,
          author: {
            connect: {
              id: authorId,
              isCartoonist: 1,
            },
          },
        },
      })

      // 创建漫画分类关系
      await tx.comicCategory.createMany({
        data: categories.map((category) => ({
          comicId: comic.id,
          categoryId: category.id,
        })),
      })

      return comic
    })
  }

  // 获取漫画分页数据
  async getPage(query: ComicSearchDto) {
    return await this.findPage({
      where: query,
      like: {
        name: 'contains',
      },
      select: {
        id: true,
        name: true,
        cover: true,
        popularity: true,
        isFinished: true,
        lastUpdated: true,
        readPermissions: true,
        virtualPopularity: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }
}
