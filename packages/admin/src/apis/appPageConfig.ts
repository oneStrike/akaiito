import { httpHandler } from '@/utils/request'
import type {
  GetAppPagesTypesRes,
  GetAppPagesTypesReq,
  CreateAppPageTypesRes,
  CreateAppPageTypesReq,
  UpdateAppPageTypesRes,
  UpdateAppPageTypesReq,
  DeleteAppPageTypesRes,
  DeleteAppPageTypesReq,
  GetAppPageDetailTypesRes,
  GetAppPageDetailTypesReq,
} from './types/appPageConfig.d'

/**
 *  接口 [获取页面分页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293697)
 *  @标签 客户端页面/获取页面分页
 *  @方式 GET
 *  @地址 /admin/appPageConfig/getAppPages
 *  @更新时间 2024-11-24 12:55:12
 */

export const getAppPagesApi = (params: GetAppPagesTypesReq): Promise<GetAppPagesTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/admin/appPageConfig/getAppPages',
    header: {},
    params,
  })
}

/**
 *  接口 [创建客户端页面](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293718)
 *  @标签 客户端页面/创建客户端页面
 *  @方式 POST
 *  @地址 /admin/appPageConfig/createAppPage
 *  @更新时间 2024-11-24 12:55:22
 */

export const createAppPageApi = (data: CreateAppPageTypesReq): Promise<CreateAppPageTypesRes> => {
  return undefined({
    method: 'POST',
    url: '/admin/appPageConfig/createAppPage',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [编辑客户端页面](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293782)
 *  @标签 客户端页面/编辑客户端页面
 *  @方式 POST
 *  @地址 /admin/appPageConfig/updateAppPage
 *  @更新时间 2024-11-24 12:55:34
 */

export const updateAppPageApi = (data: UpdateAppPageTypesReq): Promise<UpdateAppPageTypesRes> => {
  return undefined({
    method: 'POST',
    url: '/admin/appPageConfig/updateAppPage',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除客户端页面](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293840)
 *  @标签 客户端页面/删除客户端页面
 *  @方式 POST
 *  @地址 /admin/appPageConfig/deleteAppPage
 *  @更新时间 2024-11-24 12:55:45
 */

export const deleteAppPageApi = (data: DeleteAppPageTypesReq): Promise<DeleteAppPageTypesRes> => {
  return undefined({
    method: 'POST',
    url: '/admin/appPageConfig/deleteAppPage',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取页面详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234424463)
 *  @标签 客户端页面/获取页面详情
 *  @方式 GET
 *  @地址 /admin/appPageConfig/getAppPageDetail
 *  @更新时间 2024-11-24 12:55:56
 */

export const getAppPageDetailApi = (params: GetAppPageDetailTypesReq): Promise<GetAppPageDetailTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/admin/appPageConfig/getAppPageDetail',
    header: {},
    params,
  })
}
