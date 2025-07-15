import { httpHandler } from '@/utils/request'
import type {
  CreateComicVersionResponse,
  CreateComicVersionRequest,
  ComicVersionPageResponse,
  ComicVersionPageRequest,
  ComicVersionDetailResponse,
  ComicVersionDetailRequest,
  UpdateComicVersionResponse,
  UpdateComicVersionRequest,
  BatchUpdateVersionPublishStatusResponse,
  BatchUpdateVersionPublishStatusRequest,
  BatchUpdateVersionRecommendedStatusResponse,
  BatchUpdateVersionRecommendedStatusRequest,
  BatchUpdateVersionEnabledStatusResponse,
  BatchUpdateVersionEnabledStatusRequest,
  DeleteComicVersionResponse,
  DeleteComicVersionRequest,
} from './types/comic-version.d'

/**
 *  接口 [创建漫画版本](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288534)
 *  @标签 漫画版本管理模块/创建漫画版本
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/create-comic-version
 *  @更新时间 2025-07-12 00:43:28
 */

export const createComicVersionApi = (data: CreateComicVersionRequest): Promise<CreateComicVersionResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/create-comic-version',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询漫画版本列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288535)
 *  @标签 漫画版本管理模块/分页查询漫画版本列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic-version/comic-version-page
 *  @更新时间 2025-07-12 00:43:28
 */

export const comicVersionPageApi = (params: ComicVersionPageRequest): Promise<ComicVersionPageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic-version/comic-version-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取漫画版本详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288536)
 *  @标签 漫画版本管理模块/获取漫画版本详情
 *  @方式 GET
 *  @地址 /api/admin/work/comic-version/comic-version-detail
 *  @更新时间 2025-07-12 00:43:28
 */

export const comicVersionDetailApi = (params: ComicVersionDetailRequest): Promise<ComicVersionDetailResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic-version/comic-version-detail',
    headers: {},
    params,
  })
}

/**
 *  接口 [更新漫画版本信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288537)
 *  @标签 漫画版本管理模块/更新漫画版本信息
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/update-comic-version
 *  @更新时间 2025-07-12 00:43:28
 */

export const updateComicVersionApi = (data: UpdateComicVersionRequest): Promise<UpdateComicVersionResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/update-comic-version',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新版本发布状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288538)
 *  @标签 漫画版本管理模块/批量更新版本发布状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/batch-update-version-publish-status
 *  @更新时间 2025-07-12 00:43:28
 */

export const batchUpdateVersionPublishStatusApi = (
  data: BatchUpdateVersionPublishStatusRequest,
): Promise<BatchUpdateVersionPublishStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/batch-update-version-publish-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新版本推荐状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288539)
 *  @标签 漫画版本管理模块/批量更新版本推荐状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/batch-update-version-recommended-status
 *  @更新时间 2025-07-12 00:43:28
 */

export const batchUpdateVersionRecommendedStatusApi = (
  data: BatchUpdateVersionRecommendedStatusRequest,
): Promise<BatchUpdateVersionRecommendedStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/batch-update-version-recommended-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新版本启用状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288540)
 *  @标签 漫画版本管理模块/批量更新版本启用状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/batch-update-version-enabled-status
 *  @更新时间 2025-07-12 00:43:28
 */

export const batchUpdateVersionEnabledStatusApi = (
  data: BatchUpdateVersionEnabledStatusRequest,
): Promise<BatchUpdateVersionEnabledStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/batch-update-version-enabled-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [软删除版本](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288543)
 *  @标签 漫画版本管理模块/软删除版本
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/delete-comic-version
 *  @更新时间 2025-07-12 00:43:28
 */

export const deleteComicVersionApi = (data: DeleteComicVersionRequest): Promise<DeleteComicVersionResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/delete-comic-version',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
