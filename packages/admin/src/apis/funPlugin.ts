import { httpClient } from '@/utils/request'
import type {
  GetFunPluginTypesRes,
  GetFunPluginTypesReq,
  CreateFunPluginTypesRes,
  CreateFunPluginTypesReq,
  UpdateFunPluginTypesRes,
  UpdateFunPluginTypesReq,
  DeleteFunPluginTypesRes,
  DeleteFunPluginTypesReq,
  UpdateFunPluginStatusTypesRes,
  UpdateFunPluginStatusTypesReq,
} from './types/funPlugin.d'

/**
 *  接口 [获取功能插件列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177741603)
 *  @标签 运营管理/功能插件/获取功能插件列表
 *  @方式 GET
 *  @地址 /admin/funPlugin/getFunPlugin
 *  @更新时间 2024-09-18 00:28:31
 */

export const getFunPluginApi = (params: GetFunPluginTypesReq): Promise<GetFunPluginTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/funPlugin/getFunPlugin',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建功能插件](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177742047)
 *  @标签 运营管理/功能插件/创建功能插件
 *  @方式 POST
 *  @地址 /admin/funPlugin/createFunPlugin
 *  @更新时间 2024-09-18 00:29:16
 */

export const createFunPluginApi = (data: CreateFunPluginTypesReq): Promise<CreateFunPluginTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/createFunPlugin',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新功能插件](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177743399)
 *  @标签 运营管理/功能插件/更新功能插件
 *  @方式 POST
 *  @地址 /admin/funPlugin/updateFunPlugin
 *  @更新时间 2024-09-18 00:31:00
 */

export const updateFunPluginApi = (data: UpdateFunPluginTypesReq): Promise<UpdateFunPluginTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/updateFunPlugin',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除功能插件](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177743443)
 *  @标签 运营管理/功能插件/删除功能插件
 *  @方式 POST
 *  @地址 /admin/funPlugin/deleteFunPlugin
 *  @更新时间 2024-05-24 23:49:12
 */

export const deleteFunPluginApi = (data: DeleteFunPluginTypesReq): Promise<DeleteFunPluginTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/deleteFunPlugin',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新插件状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177743456)
 *  @标签 运营管理/功能插件/更新插件状态
 *  @方式 POST
 *  @地址 /admin/funPlugin/updateFunPluginStatus
 *  @更新时间 2024-09-18 00:31:48
 */

export const updateFunPluginStatusApi = (
  data: UpdateFunPluginStatusTypesReq,
): Promise<UpdateFunPluginStatusTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/updateFunPluginStatus',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
