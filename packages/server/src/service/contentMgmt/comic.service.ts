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
    const { categoryId, authorId, ...comicData } = body
    return this.create({
      data: {
        ...comicData,
        categories: {
          create: categoryId.map((item) => ({
            category: {
              connect: {
                id: item,
              },
            },
          })),
        },
        author: {
          connect: {
            id: authorId,
            isCartoonist: 1,
          },
        },
      },
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
        updatedAt: true,
        createdAt: true,
        isPublish: true,
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

  //获取漫画详情数据
  async getDetail({ id }) {
    const categoryIds = await this.comicCategoryService.findMany({
      where: { comicId: id },
      select: { categoryId: true },
    })

    const categoryIdsArray = categoryIds.map((item) => item.categoryId)

    const categorys = await this.categoryService.findMany({
      where: { id: { in: categoryIdsArray } },
      select: { id: true, name: true },
    })

    const comicData = await this.findUnique({
      where: { id },
      omit: { authorId: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return {
      ...comicData,
      categorys,
    }
  }
}
