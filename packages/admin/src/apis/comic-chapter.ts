import { httpHandler } from '@/utils/request'
import type {
  CreateComicChapterResponse,
  CreateComicChapterRequest,
  ComicChapterPageResponse,
  ComicChapterPageRequest,
  ComicChapterDetailResponse,
  ComicChapterDetailRequest,
  UpdateComicChapterResponse,
  UpdateComicChapterRequest,
  BatchUpdateChapterPublishStatusResponse,
  BatchUpdateChapterPublishStatusRequest,
  BatchDeleteComicChapterResponse,
  BatchDeleteComicChapterRequest,
  ChaptersByComicResponse,
} from './types/comic-chapter.d'

/**
 *  接口 [创建漫画章节](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377105)
 *  @标签 漫画章节管理模块/创建漫画章节
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/create-comic-chapter
 *  @更新时间 2025-07-03 19:41:52
 */

export const createComicChapterApi = (data: CreateComicChapterRequest): Promise<CreateComicChapterResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-chapter/create-comic-chapter',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询漫画章节列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377106)
 *  @标签 漫画章节管理模块/分页查询漫画章节列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic-chapter/comic-chapter-page
 *  @更新时间 2025-07-03 19:41:52
 */

export const comicChapterPageApi = (params: ComicChapterPageRequest): Promise<ComicChapterPageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic-chapter/comic-chapter-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取漫画章节详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377107)
 *  @标签 漫画章节管理模块/获取漫画章节详情
 *  @方式 GET
 *  @地址 /api/admin/work/comic-chapter/comic-chapter-detail
 *  @更新时间 2025-07-03 19:41:52
 */

export const comicChapterDetailApi = (params: ComicChapterDetailRequest): Promise<ComicChapterDetailResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic-chapter/comic-chapter-detail',
    headers: {},
    params,
  })
}

/**
 *  接口 [更新漫画章节信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377108)
 *  @标签 漫画章节管理模块/更新漫画章节信息
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/update-comic-chapter
 *  @更新时间 2025-07-03 19:41:52
 */

export const updateComicChapterApi = (data: UpdateComicChapterRequest): Promise<UpdateComicChapterResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-chapter/update-comic-chapter',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新章节发布状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377109)
 *  @标签 漫画章节管理模块/批量更新章节发布状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/batch-update-chapter-publish-status
 *  @更新时间 2025-07-03 19:41:52
 */

export const batchUpdateChapterPublishStatusApi = (
  data: BatchUpdateChapterPublishStatusRequest,
): Promise<BatchUpdateChapterPublishStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-chapter/batch-update-chapter-publish-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量软删除章节](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377112)
 *  @标签 漫画章节管理模块/批量软删除章节
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/batch-delete-comic-chapter
 *  @更新时间 2025-07-03 19:41:52
 */

export const batchDeleteComicChapterApi = (
  data: BatchDeleteComicChapterRequest,
): Promise<BatchDeleteComicChapterResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-chapter/batch-delete-comic-chapter',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取指定漫画的章节列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377114)
 *  @标签 漫画章节管理模块/获取指定漫画的章节列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic-chapter/chapters-by-comic
 *  @更新时间 2025-07-03 19:41:52
 */

export const chaptersByComicApi = (): Promise<ChaptersByComicResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic-chapter/chapters-by-comic',
    headers: {},
  })
}
