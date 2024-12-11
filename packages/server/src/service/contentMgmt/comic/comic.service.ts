import { Comic, ComicCategories, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import { CategoryService } from '@/service/contentMgmt/category.service'
import { AuthorService } from '@/service/contentMgmt/author.service'
import { ComicDTO, ComicSearchDTO, ComicUpdateDTO } from '@/modules/admin/contentMgmt/comic/dto/comic.dto'

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
  async createComic(body: ComicDTO) {
    const { categoryIds, authorId, ...comicData } = body
    return this.create({
      data: {
        ...comicData,
        categories: {
          create: categoryIds.map((item) => ({
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
            isCartoonist: true,
          },
        },
        workPermissions: {
          create: {},
        },
      },
    })
  }

  //  更新漫画数据
  async updateComic(body: ComicUpdateDTO) {
    const { categoryIds, authorId, id, ...comicData } = body

    if (authorId) {
      comicData['author'] = {
        connect: {
          id: authorId,
          isCartoonist: true,
        },
      }
    }
    if (categoryIds.length) {
      comicData['categories'] = {
        deleteMany: {},
        create: categoryIds.map((item) => ({
          category: {
            connect: {
              id: item,
            },
          },
        })),
      }
    }
    console.log(comicData)
    return this.update({
      where: { id: body.id },
      data: comicData,
    })
  }

  // 获取漫画分页数据
  async getPage(query: ComicSearchDTO) {
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
        workPermissions: {},
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

  // 删除
  async deleteComic(id: number) {
    await this.comicCategoryService.deleteBatch({ where: { comicId: id } })
    return this.delete({ where: { id } })
  }
}
