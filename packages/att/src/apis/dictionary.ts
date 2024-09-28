import { httpClient } from '@/utils/request'
import type {
  GetDataDictionaryTypesRes,
  GetDataDictionaryTypesReq,
  GetDataDictionaryItemsTypesRes,
  GetDataDictionaryItemsTypesReq,
  CreateDataDictionaryTypesRes,
  CreateDataDictionaryItemsTypesRes,
  DeleteDataDictionaryTypesRes,
  DeleteDataDictionaryItemsTypesRes,
  UpdateDataDictionaryTypesRes,
  UpdateDataDictionaryItemsTypesRes,
  UpdateDataDictionaryStatusTypesRes,
  UpdateDataDictionaryItemsStatusTypesRes,
  UpdateDataDictionaryItemsOrderTypesRes,
} from './types/dictionary.d'

/**
 *  接口 [获取数据字典分页列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340416)
 *  @标签 数据字典/获取数据字典分页列表
 *  @方式 GET
 *  @地址 /admin/dictionary/getDataDictionary
 *  @更新时间 2024-09-18 00:01:32
 */

export const getDataDictionaryApi = (params: GetDataDictionaryTypesReq): Promise<GetDataDictionaryTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/dictionary/getDataDictionary',
    params,
  })
}

/**
 *  接口 [获取数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340593)
 *  @标签 数据字典/获取数据字典子项
 *  @方式 GET
 *  @地址 /admin/dictionary/getDataDictionaryItems
 *  @更新时间 2024-09-18 00:08:55
 */

export const getDataDictionaryItemsApi = (
  params: GetDataDictionaryItemsTypesReq,
): Promise<GetDataDictionaryItemsTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/dictionary/getDataDictionaryItems',
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
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/createDataDictionary',
    data,
  })
}

/**
 *  接口 [创建数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135341394)
 *  @标签 数据字典/创建数据字典子项
 *  @方式 POST
 *  @地址 /admin/dictionary/createDataDictionaryItems
 *  @更新时间 2024-09-18 00:11:11
 */

export const createDataDictionaryItemsApi = (
  data: CreateDataDictionaryItemsTypesReq,
): Promise<CreateDataDictionaryItemsTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/createDataDictionaryItems',
    data,
  })
}

/**
 *  接口 [删除数据字典](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691283)
 *  @标签 数据字典/删除数据字典
 *  @方式 POST
 *  @地址 /admin/dictionary/deleteDataDictionary
 *  @更新时间 2024-09-18 00:12:15
 */

export const deleteDataDictionaryApi = (data: DeleteDataDictionaryTypesReq): Promise<DeleteDataDictionaryTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/deleteDataDictionary',
    data,
  })
}

/**
 *  接口 [删除数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691296)
 *  @标签 数据字典/删除数据字典子项
 *  @方式 POST
 *  @地址 /admin/dictionary/deleteDataDictionaryItems
 *  @更新时间 2024-09-18 00:12:25
 */

export const deleteDataDictionaryItemsApi = (
  data: DeleteDataDictionaryItemsTypesReq,
): Promise<DeleteDataDictionaryItemsTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/deleteDataDictionaryItems',
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
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionary',
    data,
  })
}

/**
 *  接口 [更新数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691385)
 *  @标签 数据字典/更新数据字典子项
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryItems
 *  @更新时间 2024-09-18 00:16:19
 */

export const updateDataDictionaryItemsApi = (
  data: UpdateDataDictionaryItemsTypesReq,
): Promise<UpdateDataDictionaryItemsTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItems',
    data,
  })
}

/**
 *  接口 [更新数据字典状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691434)
 *  @标签 数据字典/更新数据字典状态
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryStatus
 *  @更新时间 2024-09-18 00:17:04
 */

export const updateDataDictionaryStatusApi = (
  data: UpdateDataDictionaryStatusTypesReq,
): Promise<UpdateDataDictionaryStatusTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryStatus',
    data,
  })
}

/**
 *  接口 [更新数据字典子项状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691450)
 *  @标签 数据字典/更新数据字典子项状态
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryItemsStatus
 *  @更新时间 2024-09-18 00:17:29
 */

export const updateDataDictionaryItemsStatusApi = (
  data: UpdateDataDictionaryItemsStatusTypesReq,
): Promise<UpdateDataDictionaryItemsStatusTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItemsStatus',
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
  return httpClient({
    method: 'POST',
    url: '/admin/dictionary/updateDataDictionaryItemsOrder',
    data,
  })
}
