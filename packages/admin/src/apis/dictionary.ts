import { httpHandler } from '@/utils/request'
import type {
  PageTypesRes,
  PageTypesReq,
  DetailTypesRes,
  DetailTypesReq,
  CreateTypesRes,
  CreateTypesReq,
  UpdateTypesRes,
  UpdateTypesReq,
  DeleteTypesRes,
  DeleteTypesReq,
  UpdateEnableStatusTypesRes,
  UpdateEnableStatusTypesReq,
  ItemsTypesRes,
  ItemsTypesReq,
  CreateItemTypesRes,
  CreateItemTypesReq,
  UpdateItemTypesRes,
  UpdateItemTypesReq,
  DeleteItemTypesRes,
  DeleteItemTypesReq,
  UpdateItemStatusTypesRes,
  UpdateItemStatusTypesReq,
} from './types/dictionary.d'

/**
 *  接口 [分页查询字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-306432894)
 *  @标签 字典管理/分页查询字典
 *  @方式 GET
 *  @地址 /api/admin/dictionary/page
 *  @更新时间 2025-06-21 01:38:08
 */

export const pageApi = (params: PageTypesReq): Promise<PageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/dictionary/page',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取字典详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-306695290)
 *  @标签 字典管理/获取字典详情
 *  @方式 GET
 *  @地址 /api/admin/dictionary/detail
 *  @更新时间 2025-06-21 01:38:08
 */

export const detailApi = (params: DetailTypesReq): Promise<DetailTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/dictionary/detail',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-306432782)
 *  @标签 字典管理/创建字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/create
 *  @更新时间 2025-06-21 01:38:08
 */

export const createApi = (data: CreateTypesReq): Promise<CreateTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/create',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307008018)
 *  @标签 字典管理/更新字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/update
 *  @更新时间 2025-06-21 01:38:08
 */

export const updateApi = (data: UpdateTypesReq): Promise<UpdateTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/update',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307008324)
 *  @标签 字典管理/删除字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/delete
 *  @更新时间 2025-06-21 01:38:08
 */

export const deleteApi = (data: DeleteTypesReq): Promise<DeleteTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/delete',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [启用禁用字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307032726)
 *  @标签 字典管理/启用禁用字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/updateEnableStatus
 *  @更新时间 2025-06-21 01:38:08
 */

export const updateEnableStatusApi = (data: UpdateEnableStatusTypesReq): Promise<UpdateEnableStatusTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/updateEnableStatus',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307018281)
 *  @标签 字典管理/获取字典项
 *  @方式 GET
 *  @地址 /api/admin/dictionary/items
 *  @更新时间 2025-06-21 01:38:08
 */

export const itemsApi = (params: ItemsTypesReq): Promise<ItemsTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/dictionary/items',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307018937)
 *  @标签 字典管理/创建字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/createItem
 *  @更新时间 2025-06-21 01:38:08
 */

export const createItemApi = (data: CreateItemTypesReq): Promise<CreateItemTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/createItem',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307020817)
 *  @标签 字典管理/更新字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/updateItem
 *  @更新时间 2025-06-21 01:38:08
 */

export const updateItemApi = (data: UpdateItemTypesReq): Promise<UpdateItemTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/updateItem',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307020818)
 *  @标签 字典管理/删除字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/deleteItem
 *  @更新时间 2025-06-21 01:38:08
 */

export const deleteItemApi = (data: DeleteItemTypesReq): Promise<DeleteItemTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/deleteItem',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [启用禁用字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307032727)
 *  @标签 字典管理/启用禁用字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/updateItemStatus
 *  @更新时间 2025-06-21 01:38:08
 */

export const updateItemStatusApi = (data: UpdateItemStatusTypesReq): Promise<UpdateItemStatusTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/updateItemStatus',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
