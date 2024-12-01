import type { Comic, ComicCategories, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import { CategoryService } from '@/service/contentMgmt/category.service'
import { AuthorService } from '@/service/contentMgmt/author.service'
import { ComicDto, ComicSearchDto } from '@/modules/admin/contentMgmt/comic/dto/comic.dto'

@Provide()
export class ComicCategoryService extends BasicService<ComicCategories> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.comicCategories
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
  getDetail({ id }) {
    return this.findUnique({
      relationLoadStrategy: 'join',
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    }).then((comic) => {
      if (comic) {
        comic.categories = comic.categories.map((category) => category.category)
      }
      return comic
    })
  }
}
