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
  ChaptersByVersionResponse,
  BatchMoveChaptersToVersionResponse,
  CopyChapterToVersionResponse,
  SwapChapterNumbersResponse,
  SwapChapterNumbersRequest,
} from './types/comic-chapter.d'

/**
 *  接口 [创建漫画章节](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836381)
 *  @标签 漫画章节管理模块/创建漫画章节
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/create-comic-chapter
 *  @更新时间 2025-07-10 23:06:34
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
 *  接口 [分页查询漫画章节列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836382)
 *  @标签 漫画章节管理模块/分页查询漫画章节列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic-chapter/comic-chapter-page
 *  @更新时间 2025-07-10 23:06:34
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
 *  接口 [获取漫画章节详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836383)
 *  @标签 漫画章节管理模块/获取漫画章节详情
 *  @方式 GET
 *  @地址 /api/admin/work/comic-chapter/comic-chapter-detail
 *  @更新时间 2025-07-10 23:06:34
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
 *  接口 [更新漫画章节信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836384)
 *  @标签 漫画章节管理模块/更新漫画章节信息
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/update-comic-chapter
 *  @更新时间 2025-07-10 23:06:34
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
 *  接口 [批量更新章节发布状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836385)
 *  @标签 漫画章节管理模块/批量更新章节发布状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/batch-update-chapter-publish-status
 *  @更新时间 2025-07-10 23:06:34
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
 *  接口 [批量软删除章节](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836386)
 *  @标签 漫画章节管理模块/批量软删除章节
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/batch-delete-comic-chapter
 *  @更新时间 2025-07-10 23:06:34
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
 *  接口 [获取指定漫画的章节列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836387)
 *  @标签 漫画章节管理模块/获取指定漫画的章节列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic-chapter/chapters-by-comic
 *  @更新时间 2025-07-10 23:06:34
 */

export const chaptersByComicApi = (): Promise<ChaptersByComicResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic-chapter/chapters-by-comic',
    headers: {},
  })
}

/**
 *  接口 [获取指定版本的章节列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319962987)
 *  @标签 漫画章节管理模块/获取指定版本的章节列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic-chapter/chapters-by-version
 *  @更新时间 2025-07-10 23:06:34
 */

export const chaptersByVersionApi = (): Promise<ChaptersByVersionResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic-chapter/chapters-by-version',
    headers: {},
  })
}

/**
 *  接口 [批量移动章节到指定版本](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319962988)
 *  @标签 漫画章节管理模块/批量移动章节到指定版本
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/batch-move-chapters-to-version
 *  @更新时间 2025-07-10 23:06:34
 */

export const batchMoveChaptersToVersionApi = (): Promise<BatchMoveChaptersToVersionResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-chapter/batch-move-chapters-to-version',
    headers: {},
  })
}

/**
 *  接口 [复制章节到指定版本](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319962989)
 *  @标签 漫画章节管理模块/复制章节到指定版本
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/copy-chapter-to-version
 *  @更新时间 2025-07-10 23:06:34
 */

export const copyChapterToVersionApi = (): Promise<CopyChapterToVersionResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-chapter/copy-chapter-to-version',
    headers: {},
  })
}

/**
 *  接口 [交换两个章节的章节号](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-320567794)
 *  @标签 漫画章节管理模块/交换两个章节的章节号
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/swap-chapter-numbers
 *  @更新时间 2025-07-10 23:06:40
 */

export const swapChapterNumbersApi = (data: SwapChapterNumbersRequest): Promise<SwapChapterNumbersResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-chapter/swap-chapter-numbers',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
