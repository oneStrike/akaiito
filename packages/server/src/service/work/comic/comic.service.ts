import { WorkComic, PrismaClient, AuthorRoleEnum } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import {
  ComicDTO,
  ComicSearchDTO,
  ComicUpdateDTO,
} from '@/modules/admin/contentMgmt/comic/dto/comic.dto'
import { WorkAuthorService } from '@/service/work/author/author.service'
import { WorkCategoryService } from '@/service/work/category/category.service'

@Provide()
export class WorkComicService extends BasicService<WorkComic> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  categoryService: WorkCategoryService

  @Inject()
  authorService: WorkAuthorService

  @Inject()
  comicCategoryService: WorkCategoryService

  protected get model() {
    return this.prismaClient.workComic
  }

  //  创建漫画数据
  async createComic(body: ComicDTO) {
    const { categoryIds, authorId, ...comicData } = body
    return this.create({
      data: {
        ...comicData,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        author: {
          connect: {
            id: authorId,
            roles: {
              hasSome: [AuthorRoleEnum.COMIC_ARTIST],
            },
          },
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
          roles: {
            hasSome: [AuthorRoleEnum.COMIC_ARTIST],
          },
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
    return this.update({
      where: { id: body.id },
      data: comicData,
    })
  }

  // 获取漫画分页数据
  async getPage(query: ComicSearchDTO) {
    const authorName = query.authorName
    delete query.authorName
    return await this.findPage({
      where: {
        ...query,
        author: {
          name: {
            contains: authorName || undefined,
          },
        },
      },
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
        viewRule: true,
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
    const comic = await this.findUnique({
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
            id: true,
            name: true,
          },
        },
      },
    })

    comic.chapterCount = await this.prismaClient.workComicChapter.count({
      where: {
        comicId: id,
      },
    })
    return comic
  }

  // 删除
  async deleteComic(id: number) {
    await this.comicCategoryService.deleteBatch({ where: { comicId: id } })
    return this.delete({ where: { id } })
  }
}
