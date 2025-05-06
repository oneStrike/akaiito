import { httpHandler } from '@/utils/request'
import type {
  GetDataDictionaryTypesRes,
  GetDataDictionaryTypesReq,
  GetDataDictionaryItemsTypesRes,
  GetDataDictionaryItemsTypesReq,
  CreateDataDictionaryTypesRes,
  CreateDataDictionaryTypesReq,
  CreateDataDictionaryItemsTypesRes,
  CreateDataDictionaryItemsTypesReq,
  DeleteDataDictionaryTypesRes,
  DeleteDataDictionaryTypesReq,
  DeleteDataDictionaryItemsTypesRes,
  DeleteDataDictionaryItemsTypesReq,
  UpdateDataDictionaryTypesRes,
  UpdateDataDictionaryTypesReq,
  UpdateDataDictionaryItemsTypesRes,
  UpdateDataDictionaryItemsTypesReq,
  UpdateDataDictionaryStatusTypesRes,
  UpdateDataDictionaryStatusTypesReq,
  UpdateDataDictionaryItemsStatusTypesRes,
  UpdateDataDictionaryItemsStatusTypesReq,
  UpdateDataDictionaryItemsOrderTypesRes,
  UpdateDataDictionaryItemsOrderTypesReq,
} from './types/dictionary.d'

/**
 *  接口 [获取数据字典分页列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340416)
 *  @标签 数据字典/获取数据字典分页列表
 *  @方式 GET
 *  @地址 /admin/dictionary/getDataDictionary
 *  @更新时间 2024-09-18 00:01:32
 */

export const getDataDictionaryApi = (params: GetDataDictionaryTypesReq): Promise<GetDataDictionaryTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/dictionary/getDataDictionary',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340593)
 *  @标签 数据字典/获取数据字典子项
 *  @方式 GET
 *  @地址 /admin/dictionary/getDataDictionaryItems
 *  @更新时间 2025-04-28 20:27:17
 */

export const getDataDictionaryItemsApi = (
  params: GetDataDictionaryItemsTypesReq,
): Promise<GetDataDictionaryItemsTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/dictionary/getDataDictionaryItems',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建数据字典](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340982)
 *  @标签 数据字典/创建数据字典
 *  @方式 POST
 *  @地址 /admin/dictionary/createDataDictionary
 *  @更新时间 2024-09-18 00:09:20
 */

export const createDataDictionaryApi = (data: CreateDataDictionaryTypesReq): Promise<CreateDataDictionaryTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/dictionary/createDataDictionary',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [创建数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135341394)
 *  @标签 数据字典/创建数据字典子项
 *  @方式 POST
 *  @地址 /admin/dictionary/createDataDictionaryItems
 *  @更新时间 2024-12-03 00:22:35
 */

export const createDataDictionaryItemsApi = (
  data: CreateDataDictionaryItemsTypesReq,
): Promise<CreateDataDictionaryItemsTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/dictionary/createDataDictionaryItems',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除数据字典](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691283)
 *  @标签 数据字典/删除数据字典
 *  @方式 POST
 *  @地址 /admin/dictionary/deleteDataDictionary
 *  @更新时间 2024-11-24 14:12:57
 */

export const deleteDataDictionaryApi = (data: DeleteDataDictionaryTypesReq): Promise<DeleteDataDictionaryTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/dictionary/deleteDataDictionary',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691296)
 *  @标签 数据字典/删除数据字典子项
 *  @方式 POST
 *  @地址 /admin/dictionary/deleteDataDictionaryItems
 *  @更新时间 2024-11-24 14:13:07
 */

export const deleteDataDictionaryItemsApi = (
  data: DeleteDataDictionaryItemsTypesReq,
): Promise<DeleteDataDictionaryItemsTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/dictionary/deleteDataDictionaryItems',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新数据字典](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691324)
 *  @标签 数据字典/更新数据字典
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionary
 *  @更新时间 2024-09-18 00:12:47
 */

export const updateDataDictionaryApi = (data: UpdateDataDictionaryTypesReq): Promise<UpdateDataDictionaryTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionary',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691385)
 *  @标签 数据字典/更新数据字典子项
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryItems
 *  @更新时间 2024-12-03 00:23:29
 */

export const updateDataDictionaryItemsApi = (
  data: UpdateDataDictionaryItemsTypesReq,
): Promise<UpdateDataDictionaryItemsTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItems',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新数据字典状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691434)
 *  @标签 数据字典/更新数据字典状态
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryStatus
 *  @更新时间 2024-11-24 14:23:39
 */

export const updateDataDictionaryStatusApi = (
  data: UpdateDataDictionaryStatusTypesReq,
): Promise<UpdateDataDictionaryStatusTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryStatus',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新数据字典子项状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691450)
 *  @标签 数据字典/更新数据字典子项状态
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryItemsStatus
 *  @更新时间 2024-11-24 14:24:53
 */

export const updateDataDictionaryItemsStatusApi = (
  data: UpdateDataDictionaryItemsStatusTypesReq,
): Promise<UpdateDataDictionaryItemsStatusTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItemsStatus',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [调整数据字典子项排序](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691501)
 *  @标签 数据字典/调整数据字典子项排序
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryItemsOrder
 *  @更新时间 2023-12-21 23:17:44
 */

export const updateDataDictionaryItemsOrderApi = (
  data: UpdateDataDictionaryItemsOrderTypesReq,
): Promise<UpdateDataDictionaryItemsOrderTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItemsOrder',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
