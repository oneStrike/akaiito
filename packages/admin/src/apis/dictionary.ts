import { httpHandler } from '@/utils/request'
import type {
  DictionaryPageResponse,
  DictionaryPageRequest,
  DictionaryDetailResponse,
  DictionaryDetailRequest,
  CreateDictionaryResponse,
  CreateDictionaryRequest,
  UpdateDictionaryResponse,
  UpdateDictionaryRequest,
  DeleteDictionaryResponse,
  DeleteDictionaryRequest,
  BatchUpdateDictionaryStatusResponse,
  BatchUpdateDictionaryStatusRequest,
  DictionaryItemsResponse,
  DictionaryItemsRequest,
  CreateDictionaryItemResponse,
  CreateDictionaryItemRequest,
  UpdateDictionaryItemResponse,
  UpdateDictionaryItemRequest,
  DeleteDictionaryItemResponse,
  DeleteDictionaryItemRequest,
  UpdateDictionaryItemStatusResponse,
  UpdateDictionaryItemStatusRequest,
} from './types/dictionary.d'

/**
 *  接口 [分页查询字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836329)
 *  @标签 字典管理/分页查询字典
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-page
 *  @更新时间 2025-07-04 16:24:21
 */

export const dictionaryPageApi = (params: DictionaryPageRequest): Promise<DictionaryPageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/dictionary/dictionary-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取字典详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836330)
 *  @标签 字典管理/获取字典详情
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-detail
 *  @更新时间 2025-07-04 16:24:21
 */

export const dictionaryDetailApi = (params: DictionaryDetailRequest): Promise<DictionaryDetailResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/dictionary/dictionary-detail',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836331)
 *  @标签 字典管理/创建字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/create-dictionary
 *  @更新时间 2025-07-04 16:24:21
 */

export const createDictionaryApi = (data: CreateDictionaryRequest): Promise<CreateDictionaryResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/create-dictionary',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836332)
 *  @标签 字典管理/更新字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/update-dictionary
 *  @更新时间 2025-07-04 16:24:21
 */

export const updateDictionaryApi = (data: UpdateDictionaryRequest): Promise<UpdateDictionaryResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/update-dictionary',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836333)
 *  @标签 字典管理/删除字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/delete-dictionary
 *  @更新时间 2025-07-04 16:24:21
 */

export const deleteDictionaryApi = (data: DeleteDictionaryRequest): Promise<DeleteDictionaryResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/delete-dictionary',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量启用禁用字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836334)
 *  @标签 字典管理/批量启用禁用字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/batch-update-dictionary-status
 *  @更新时间 2025-07-04 16:24:21
 */

export const batchUpdateDictionaryStatusApi = (
  data: BatchUpdateDictionaryStatusRequest,
): Promise<BatchUpdateDictionaryStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/batch-update-dictionary-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836335)
 *  @标签 字典管理/获取字典项
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-items
 *  @更新时间 2025-07-04 16:24:21
 */

export const dictionaryItemsApi = (params: DictionaryItemsRequest): Promise<DictionaryItemsResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/dictionary/dictionary-items',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836336)
 *  @标签 字典管理/创建字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/create-dictionary-item
 *  @更新时间 2025-07-04 16:24:21
 */

export const createDictionaryItemApi = (data: CreateDictionaryItemRequest): Promise<CreateDictionaryItemResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/create-dictionary-item',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836337)
 *  @标签 字典管理/更新字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/update-dictionary-item
 *  @更新时间 2025-07-04 16:24:21
 */

export const updateDictionaryItemApi = (data: UpdateDictionaryItemRequest): Promise<UpdateDictionaryItemResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/update-dictionary-item',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836338)
 *  @标签 字典管理/删除字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/delete-dictionary-item
 *  @更新时间 2025-07-04 16:24:21
 */

export const deleteDictionaryItemApi = (data: DeleteDictionaryItemRequest): Promise<DeleteDictionaryItemResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/delete-dictionary-item',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [启用禁用字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836339)
 *  @标签 字典管理/启用禁用字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/update-dictionary-item-status
 *  @更新时间 2025-07-04 16:24:21
 */

export const updateDictionaryItemStatusApi = (
  data: UpdateDictionaryItemStatusRequest,
): Promise<UpdateDictionaryItemStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/update-dictionary-item-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
