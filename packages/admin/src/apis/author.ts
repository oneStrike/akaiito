import { httpHandler } from '@/utils/request'
import type {
  CreateAuthorResponse,
  CreateAuthorRequest,
  AuthorPageResponse,
  AuthorPageRequest,
  AuthorDetailResponse,
  AuthorDetailRequest,
  UpdateAuthorResponse,
  UpdateAuthorRequest,
  BatchUpdateAuthorStatusResponse,
  BatchUpdateAuthorStatusRequest,
  BatchUpdateAuthorFeaturedResponse,
  BatchUpdateAuthorFeaturedRequest,
  DeleteAuthorResponse,
  DeleteAuthorRequest,
} from './types/author.d'

/**
 *  接口 [创建作者](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090610)
 *  @标签 作者管理模块/创建作者
 *  @方式 POST
 *  @地址 /api/admin/work/author/create-author
 *  @更新时间 2025-07-02 23:25:13
 */

export const createAuthorApi = (data: CreateAuthorRequest): Promise<CreateAuthorResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/author/create-author',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询作者列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090611)
 *  @标签 作者管理模块/分页查询作者列表
 *  @方式 GET
 *  @地址 /api/admin/work/author/author-page
 *  @更新时间 2025-07-02 23:25:13
 */

export const authorPageApi = (params: AuthorPageRequest): Promise<AuthorPageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/author/author-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取作者详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090612)
 *  @标签 作者管理模块/获取作者详情
 *  @方式 GET
 *  @地址 /api/admin/work/author/author-detail
 *  @更新时间 2025-07-02 23:25:13
 */

export const authorDetailApi = (params: AuthorDetailRequest): Promise<AuthorDetailResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/author/author-detail',
    headers: {},
    params,
  })
}

/**
 *  接口 [更新作者信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090613)
 *  @标签 作者管理模块/更新作者信息
 *  @方式 POST
 *  @地址 /api/admin/work/author/update-author
 *  @更新时间 2025-07-02 23:25:13
 */

export const updateAuthorApi = (data: UpdateAuthorRequest): Promise<UpdateAuthorResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/author/update-author',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新作者状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090614)
 *  @标签 作者管理模块/批量更新作者状态
 *  @方式 POST
 *  @地址 /api/admin/work/author/batch-update-author-status
 *  @更新时间 2025-07-02 23:25:13
 */

export const batchUpdateAuthorStatusApi = (
  data: BatchUpdateAuthorStatusRequest,
): Promise<BatchUpdateAuthorStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/author/batch-update-author-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新作者推荐状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090615)
 *  @标签 作者管理模块/批量更新作者推荐状态
 *  @方式 POST
 *  @地址 /api/admin/work/author/batch-update-author-featured
 *  @更新时间 2025-07-02 23:25:13
 */

export const batchUpdateAuthorFeaturedApi = (
  data: BatchUpdateAuthorFeaturedRequest,
): Promise<BatchUpdateAuthorFeaturedResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/author/batch-update-author-featured',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [软删除作者](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-314969246)
 *  @标签 作者管理模块/软删除作者
 *  @方式 POST
 *  @地址 /api/admin/work/author/delete-author
 *  @更新时间 2025-07-02 23:25:13
 */

export const deleteAuthorApi = (data: DeleteAuthorRequest): Promise<DeleteAuthorResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/author/delete-author',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
