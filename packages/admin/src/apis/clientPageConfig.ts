import { httpClient } from '@/utils/request'
import type {
  GetClientPagesTypesRes,
  GetClientPagesTypesReq,
  CreateClientPageTypesRes,
  CreateClientPageTypesReq,
  UpdateClientPageTypesRes,
  UpdateClientPageTypesReq,
  DeleteClientPageTypesRes,
  DeleteClientPageTypesReq,
  GetClientPageDetailTypesRes,
  GetClientPageDetailTypesReq,
} from './types/clientPageConfig.d'

/**
 *  接口 [获取页面分页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293697)
 *  @标签 客户端页面/获取页面分页
 *  @方式 GET
 *  @地址 /admin/clientPageConfig/getClientPages
 *  @更新时间 2024-11-17 00:23:40
 */

export const getClientPagesApi = (params: GetClientPagesTypesReq): Promise<GetClientPagesTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/clientPageConfig/getClientPages',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建客户端页面](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293718)
 *  @标签 客户端页面/创建客户端页面
 *  @方式 POST
 *  @地址 /admin/clientPageConfig/createClientPage
 *  @更新时间 2024-11-16 00:55:52
 */

export const createClientPageApi = (data: CreateClientPageTypesReq): Promise<CreateClientPageTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/clientPageConfig/createClientPage',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [编辑客户端页面](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293782)
 *  @标签 客户端页面/编辑客户端页面
 *  @方式 POST
 *  @地址 /admin/clientPageConfig/updateClientPage
 *  @更新时间 2024-11-16 00:58:15
 */

export const updateClientPageApi = (data: UpdateClientPageTypesReq): Promise<UpdateClientPageTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/clientPageConfig/updateClientPage',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除客户端页面](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293840)
 *  @标签 客户端页面/删除客户端页面
 *  @方式 POST
 *  @地址 /admin/clientPageConfig/deleteClientPage
 *  @更新时间 2024-11-16 01:00:51
 */

export const deleteClientPageApi = (data: DeleteClientPageTypesReq): Promise<DeleteClientPageTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/clientPageConfig/deleteClientPage',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取页面详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234424463)
 *  @标签 客户端页面/获取页面详情
 *  @方式 GET
 *  @地址 /admin/clientPageConfig/getClientPageDetail
 *  @更新时间 2024-11-17 01:46:26
 */

export const getClientPageDetailApi = (params: GetClientPageDetailTypesReq): Promise<GetClientPageDetailTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/clientPageConfig/getClientPageDetail',
    headers: {},
    params,
  })
}
