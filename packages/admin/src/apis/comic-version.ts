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
  BatchUpdateVersionReadRuleResponse,
  BatchUpdateVersionReadRuleRequest,
  VersionsByComicResponse,
  DeleteComicVersionResponse,
  DeleteComicVersionRequest,
  IncrementViewCountResponse,
  IncrementFavoriteCountResponse,
  IncrementLikeCountResponse,
  UpdateVersionRatingResponse,
} from './types/comic-version.d'

/**
 *  接口 [创建漫画版本](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288534)
 *  @标签 漫画版本管理模块/创建漫画版本
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/create-comic-version
 *  @更新时间 2025-07-09 23:33:51
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
 *  @更新时间 2025-07-09 23:33:51
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
 *  @更新时间 2025-07-09 23:33:51
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
 *  @更新时间 2025-07-09 23:33:51
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
 *  @更新时间 2025-07-09 23:33:51
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
 *  @更新时间 2025-07-09 23:33:51
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
 *  @更新时间 2025-07-09 23:33:51
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
 *  接口 [批量更新版本查看规则](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288541)
 *  @标签 漫画版本管理模块/批量更新版本查看规则
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/batch-update-version-read-rule
 *  @更新时间 2025-07-09 23:33:51
 */

export const batchUpdateVersionReadRuleApi = (
  data: BatchUpdateVersionReadRuleRequest,
): Promise<BatchUpdateVersionReadRuleResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/batch-update-version-read-rule',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取指定漫画的版本列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288542)
 *  @标签 漫画版本管理模块/获取指定漫画的版本列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic-version/versions-by-comic
 *  @更新时间 2025-07-09 23:33:51
 */

export const versionsByComicApi = (): Promise<VersionsByComicResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/comic-version/versions-by-comic',
    headers: {},
  })
}

/**
 *  接口 [软删除版本](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288543)
 *  @标签 漫画版本管理模块/软删除版本
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/delete-comic-version
 *  @更新时间 2025-07-09 23:33:51
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

/**
 *  接口 [增加版本阅读次数](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288544)
 *  @标签 漫画版本管理模块/增加版本阅读次数
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/increment-view-count
 *  @更新时间 2025-07-09 23:33:51
 */

export const incrementViewCountApi = (): Promise<IncrementViewCountResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/increment-view-count',
    headers: {},
  })
}

/**
 *  接口 [增加版本收藏数](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288545)
 *  @标签 漫画版本管理模块/增加版本收藏数
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/increment-favorite-count
 *  @更新时间 2025-07-09 23:33:51
 */

export const incrementFavoriteCountApi = (): Promise<IncrementFavoriteCountResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/increment-favorite-count',
    headers: {},
  })
}

/**
 *  接口 [增加版本点赞数](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288546)
 *  @标签 漫画版本管理模块/增加版本点赞数
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/increment-like-count
 *  @更新时间 2025-07-09 23:33:51
 */

export const incrementLikeCountApi = (): Promise<IncrementLikeCountResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/increment-like-count',
    headers: {},
  })
}

/**
 *  接口 [更新版本评分](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288547)
 *  @标签 漫画版本管理模块/更新版本评分
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/update-version-rating
 *  @更新时间 2025-07-09 23:33:51
 */

export const updateVersionRatingApi = (): Promise<UpdateVersionRatingResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/comic-version/update-version-rating',
    headers: {},
  })
}
