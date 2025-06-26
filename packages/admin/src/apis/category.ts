import { httpHandler } from '@/utils/request'
import type {
  CreateCategoryResponse,
  CreateCategoryRequest,
  CategoryPageResponse,
  CategoryPageRequest,
  CategoryDetailResponse,
  CategoryDetailRequest,
  UpdateCategoryResponse,
  UpdateCategoryRequest,
  BatchUpdateCategoryStatusResponse,
  BatchUpdateCategoryStatusRequest,
  DeleteBatchResponse,
  CategoryOrderResponse,
  CategoryOrderRequest,
} from './types/category.d'

/**
 *  接口 [创建分类](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391308)
 *  @标签 分类管理模块/创建分类
 *  @方式 POST
 *  @地址 /api/admin/work/category/create-category
 *  @更新时间 2025-06-26 22:27:01
 */

export const createCategoryApi = (data: CreateCategoryRequest): Promise<CreateCategoryResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/category/create-category',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询分类列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391309)
 *  @标签 分类管理模块/分页查询分类列表
 *  @方式 GET
 *  @地址 /api/admin/work/category/category-page
 *  @更新时间 2025-06-26 22:27:01
 */

export const categoryPageApi = (params: CategoryPageRequest): Promise<CategoryPageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/category/category-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取分类详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391310)
 *  @标签 分类管理模块/获取分类详情
 *  @方式 GET
 *  @地址 /api/admin/work/category/category-detail
 *  @更新时间 2025-06-26 22:27:01
 */

export const categoryDetailApi = (params: CategoryDetailRequest): Promise<CategoryDetailResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/work/category/category-detail',
    headers: {},
    params,
  })
}

/**
 *  接口 [更新分类信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391311)
 *  @标签 分类管理模块/更新分类信息
 *  @方式 PUT
 *  @地址 /api/admin/work/category/update-category
 *  @更新时间 2025-06-26 22:27:01
 */

export const updateCategoryApi = (): Promise<UpdateCategoryResponse> => {
  return httpHandler({
    method: 'PUT',
    url: '/api/admin/work/category/update-category',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

/**
 *  接口 [批量更新分类状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391312)
 *  @标签 分类管理模块/批量更新分类状态
 *  @方式 POST
 *  @地址 /api/admin/work/category/batch-update-category-status
 *  @更新时间 2025-06-26 22:27:01
 */

export const batchUpdateCategoryStatusApi = (
  data: BatchUpdateCategoryStatusRequest,
): Promise<BatchUpdateCategoryStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/category/batch-update-category-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量删除分类](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391313)
 *  @标签 分类管理模块/批量删除分类
 *  @方式 POST
 *  @地址 /api/admin/work/category/delete-batch
 *  @更新时间 2025-06-26 22:27:01
 */

export const deleteBatchApi = (): Promise<DeleteBatchResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/category/delete-batch',
    headers: {},
  })
}

/**
 *  接口 [分类拖拽排序](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391314)
 *  @标签 分类管理模块/分类拖拽排序
 *  @方式 POST
 *  @地址 /api/admin/work/category/category-order
 *  @更新时间 2025-06-26 22:27:01
 */

export const categoryOrderApi = (data: CategoryOrderRequest): Promise<CategoryOrderResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/work/category/category-order',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
