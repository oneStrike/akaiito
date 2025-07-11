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
  VersionsResponse,
  CreateVersionResponse,
  CreateVersionRequest,
  UpdateVersionResponse,
  UpdateVersionRequest,
  DeleteVersionResponse,
  DeleteVersionRequest,
} from './types/comic.d'

/**
 *  接口 [创建漫画](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836321)
 *  @标签 漫画管理模块/创建漫画
 *  @方式 POST
 *  @地址 /api/admin/work/comic/create-comic
 *  @更新时间 2025-07-11 09:58:40
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
 *  @更新时间 2025-07-11 09:58:40
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
 *  接口 [获取漫画详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836322)
 *  @标签 漫画管理模块/获取漫画详情
 *  @方式 GET
 *  @地址 /api/admin/work/comic/comic-detail
 *  @更新时间 2025-07-11 09:58:40
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
 *  接口 [更新漫画信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836323)
 *  @标签 漫画管理模块/更新漫画信息
 *  @方式 POST
 *  @地址 /api/admin/work/comic/update-comic
 *  @更新时间 2025-07-11 09:58:40
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
 *  接口 [批量更新漫画发布状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836324)
 *  @标签 漫画管理模块/批量更新漫画发布状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-status
 *  @更新时间 2025-07-11 09:58:40
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
 *  接口 [批量更新漫画推荐状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836325)
 *  @标签 漫画管理模块/批量更新漫画推荐状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-recommended
 *  @更新时间 2025-07-11 09:58:40
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
 *  接口 [批量更新漫画热门状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836326)
 *  @标签 漫画管理模块/批量更新漫画热门状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-hot
 *  @更新时间 2025-07-11 09:58:40
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
 *  接口 [批量更新漫画新作状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836327)
 *  @标签 漫画管理模块/批量更新漫画新作状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-new
 *  @更新时间 2025-07-11 09:58:40
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
 *  接口 [软删除漫画](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836328)
 *  @标签 漫画管理模块/软删除漫画
 *  @方式 POST
 *  @地址 /api/admin/work/comic/delete-comic
 *  @更新时间 2025-07-11 09:58:40
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

/**
 *  接口 [获取指定漫画的版本列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319962983)
 *  @标签 漫画管理模块/获取指定漫画的版本列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic/versions
 *  @更新时间 2025-07-11 09:58:40
 */

export const versionsApi = (): Promise<VersionsResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic/versions',
    headers: {},
  })
}

/**
 *  接口 [为漫画创建版本](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319962984)
 *  @标签 漫画管理模块/为漫画创建版本
 *  @方式 POST
 *  @地址 /api/admin/work/comic/create-version
 *  @更新时间 2025-07-11 09:58:40
 */

export const createVersionApi = (data: CreateVersionRequest): Promise<CreateVersionResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic/create-version',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新漫画版本信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319962985)
 *  @标签 漫画管理模块/更新漫画版本信息
 *  @方式 POST
 *  @地址 /api/admin/work/comic/update-version
 *  @更新时间 2025-07-11 09:58:40
 */

export const updateVersionApi = (data: UpdateVersionRequest): Promise<UpdateVersionResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic/update-version',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除漫画版本](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319962986)
 *  @标签 漫画管理模块/删除漫画版本
 *  @方式 POST
 *  @地址 /api/admin/work/comic/delete-version
 *  @更新时间 2025-07-11 09:58:40
 */

export const deleteVersionApi = (data: DeleteVersionRequest): Promise<DeleteVersionResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic/delete-version',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
