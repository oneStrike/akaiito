import { httpHandler } from '@/utils/request'
import type {
  CreateComicResponse,
  CreateComicRequest,
  ComicPageResponse,
  ComicPageRequest,
  ComicDetailResponse,
  ComicDetailRequest,
  UpdateComicResponse,
  UpdateComicRequest,
  BatchUpdateComicStatusResponse,
  BatchUpdateComicStatusRequest,
  BatchUpdateComicRecommendedResponse,
  BatchUpdateComicRecommendedRequest,
  BatchUpdateComicHotResponse,
  BatchUpdateComicHotRequest,
  BatchUpdateComicNewResponse,
  BatchUpdateComicNewRequest,
  DeleteComicResponse,
  DeleteComicRequest,
} from './types/comic.d'

/**
 *  接口 [创建漫画](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377091)
 *  @标签 漫画管理模块/创建漫画
 *  @方式 POST
 *  @地址 /api/admin/work/comic/create-comic
 *  @更新时间 2025-07-03 19:41:52
 */

export const createComicApi = (data: CreateComicRequest): Promise<CreateComicResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic/create-comic',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询漫画列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377092)
 *  @标签 漫画管理模块/分页查询漫画列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic/comic-page
 *  @更新时间 2025-07-03 19:41:52
 */

export const comicPageApi = (params: ComicPageRequest): Promise<ComicPageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic/comic-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取漫画详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377093)
 *  @标签 漫画管理模块/获取漫画详情
 *  @方式 GET
 *  @地址 /api/admin/work/comic/comic-detail
 *  @更新时间 2025-07-03 19:41:52
 */

export const comicDetailApi = (params: ComicDetailRequest): Promise<ComicDetailResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic/comic-detail',
    headers: {},
    params,
  })
}

/**
 *  接口 [更新漫画信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377094)
 *  @标签 漫画管理模块/更新漫画信息
 *  @方式 POST
 *  @地址 /api/admin/work/comic/update-comic
 *  @更新时间 2025-07-03 19:41:52
 */

export const updateComicApi = (data: UpdateComicRequest): Promise<UpdateComicResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic/update-comic',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新漫画发布状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377095)
 *  @标签 漫画管理模块/批量更新漫画发布状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-status
 *  @更新时间 2025-07-03 19:41:52
 */

export const batchUpdateComicStatusApi = (
  data: BatchUpdateComicStatusRequest,
): Promise<BatchUpdateComicStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic/batch-update-comic-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新漫画推荐状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377096)
 *  @标签 漫画管理模块/批量更新漫画推荐状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-recommended
 *  @更新时间 2025-07-03 19:41:52
 */

export const batchUpdateComicRecommendedApi = (
  data: BatchUpdateComicRecommendedRequest,
): Promise<BatchUpdateComicRecommendedResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic/batch-update-comic-recommended',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新漫画热门状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377097)
 *  @标签 漫画管理模块/批量更新漫画热门状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-hot
 *  @更新时间 2025-07-03 19:41:52
 */

export const batchUpdateComicHotApi = (data: BatchUpdateComicHotRequest): Promise<BatchUpdateComicHotResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic/batch-update-comic-hot',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新漫画新作状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377098)
 *  @标签 漫画管理模块/批量更新漫画新作状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-new
 *  @更新时间 2025-07-03 19:41:52
 */

export const batchUpdateComicNewApi = (data: BatchUpdateComicNewRequest): Promise<BatchUpdateComicNewResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic/batch-update-comic-new',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [软删除漫画](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377099)
 *  @标签 漫画管理模块/软删除漫画
 *  @方式 POST
 *  @地址 /api/admin/work/comic/delete-comic
 *  @更新时间 2025-07-03 19:41:52
 */

export const deleteComicApi = (data: DeleteComicRequest): Promise<DeleteComicResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic/delete-comic',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
