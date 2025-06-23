import { httpHandler } from '@/utils/request'
import type {
  DictionaryPageResponse,
  DictionaryPageRequest,
  DictionaryDetailResponse,
  DictionaryDetailRequest,
  DictionaryCreateResponse,
  DictionaryCreateRequest,
  DictionaryUpdateResponse,
  DictionaryUpdateRequest,
  DictionaryDeleteResponse,
  DictionaryDeleteRequest,
  DictionaryUpdateEnableStatusResponse,
  DictionaryUpdateEnableStatusRequest,
  DictionaryItemsResponse,
  DictionaryItemsRequest,
  DictionaryCreateItemResponse,
  DictionaryCreateItemRequest,
  DictionaryUpdateItemResponse,
  DictionaryUpdateItemRequest,
  DictionaryDeleteItemResponse,
  DictionaryDeleteItemRequest,
  DictionaryUpdateItemStatusResponse,
  DictionaryUpdateItemStatusRequest,
} from './types/dictionary.d'

/**
 *  接口 [分页查询字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080008)
 *  @标签 字典管理/分页查询字典
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-page
 *  @更新时间 2025-06-24 00:15:10
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
 *  接口 [获取字典详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080009)
 *  @标签 字典管理/获取字典详情
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-detail
 *  @更新时间 2025-06-24 00:15:10
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
 *  接口 [创建字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080010)
 *  @标签 字典管理/创建字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-create
 *  @更新时间 2025-06-24 00:15:10
 */

export const dictionaryCreateApi = (data: DictionaryCreateRequest): Promise<DictionaryCreateResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/dictionary-create',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080011)
 *  @标签 字典管理/更新字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-update
 *  @更新时间 2025-06-24 00:15:10
 */

export const dictionaryUpdateApi = (data: DictionaryUpdateRequest): Promise<DictionaryUpdateResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/dictionary-update',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080012)
 *  @标签 字典管理/删除字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-delete
 *  @更新时间 2025-06-24 00:15:10
 */

export const dictionaryDeleteApi = (data: DictionaryDeleteRequest): Promise<DictionaryDeleteResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/dictionary-delete',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [启用禁用字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080013)
 *  @标签 字典管理/启用禁用字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-update-enable-status
 *  @更新时间 2025-06-24 00:15:10
 */

export const dictionaryUpdateEnableStatusApi = (
  data: DictionaryUpdateEnableStatusRequest,
): Promise<DictionaryUpdateEnableStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/dictionary-update-enable-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080014)
 *  @标签 字典管理/获取字典项
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-items
 *  @更新时间 2025-06-24 00:15:10
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
 *  接口 [创建字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080015)
 *  @标签 字典管理/创建字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-create-item
 *  @更新时间 2025-06-24 00:15:10
 */

export const dictionaryCreateItemApi = (data: DictionaryCreateItemRequest): Promise<DictionaryCreateItemResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/dictionary-create-item',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080016)
 *  @标签 字典管理/更新字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-update-item
 *  @更新时间 2025-06-24 00:15:10
 */

export const dictionaryUpdateItemApi = (data: DictionaryUpdateItemRequest): Promise<DictionaryUpdateItemResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/dictionary-update-item',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080017)
 *  @标签 字典管理/删除字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-delete-item
 *  @更新时间 2025-06-24 00:15:10
 */

export const dictionaryDeleteItemApi = (data: DictionaryDeleteItemRequest): Promise<DictionaryDeleteItemResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/dictionary-delete-item',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [启用禁用字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080018)
 *  @标签 字典管理/启用禁用字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-update-item-status
 *  @更新时间 2025-06-24 00:15:10
 */

export const dictionaryUpdateItemStatusApi = (
  data: DictionaryUpdateItemStatusRequest,
): Promise<DictionaryUpdateItemStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/dictionary-update-item-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
