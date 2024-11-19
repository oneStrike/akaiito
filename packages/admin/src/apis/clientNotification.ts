import { httpClient } from '@/utils/request'
import type {
  GetClientNotificationListTypesRes,
  GetClientNotificationListTypesReq,
  GetClientNotificationDetailTypesRes,
  GetClientNotificationDetailTypesReq,
  CreateClientNotificationTypesRes,
  CreateClientNotificationTypesReq,
  DeleteClientNotificationTypesRes,
  DeleteClientNotificationTypesReq,
  UpdateClientNotificationTypesRes,
  UpdateClientNotificationTypesReq,
} from './types/clientNotification.d'

/**
 *  接口 [获取客户端通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234287265)
 *  @标签 通知公告/获取客户端通知公告
 *  @方式 GET
 *  @地址 /admin/clientNotification/getClientNotificationList
 *  @更新时间 2024-11-17 00:59:00
 */

export const getClientNotificationListApi = (
  params: GetClientNotificationListTypesReq,
): Promise<GetClientNotificationListTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/clientNotification/getClientNotificationList',
    headers: {},
    params,
  })
}

/**
 *  接口 [通知公告详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289150)
 *  @标签 通知公告/通知公告详情
 *  @方式 GET
 *  @地址 /admin/clientNotification/getClientNotificationDetail
 *  @更新时间 2024-11-15 23:33:05
 */

export const getClientNotificationDetailApi = (
  params: GetClientNotificationDetailTypesReq,
): Promise<GetClientNotificationDetailTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/clientNotification/getClientNotificationDetail',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234287295)
 *  @标签 通知公告/创建通知公告
 *  @方式 POST
 *  @地址 /admin/clientNotification/createClientNotification
 *  @更新时间 2024-11-16 00:56:47
 */

export const createClientNotificationApi = (
  data: CreateClientNotificationTypesReq,
): Promise<CreateClientNotificationTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/clientNotification/createClientNotification',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289337)
 *  @标签 通知公告/删除通知公告
 *  @方式 POST
 *  @地址 /admin/clientNotification/deleteClientNotification
 *  @更新时间 2024-11-15 23:35:25
 */

export const deleteClientNotificationApi = (
  data: DeleteClientNotificationTypesReq,
): Promise<DeleteClientNotificationTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/clientNotification/deleteClientNotification',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [编辑通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289369)
 *  @标签 通知公告/编辑通知公告
 *  @方式 POST
 *  @地址 /admin/clientNotification/updateClientNotification
 *  @更新时间 2024-11-16 00:56:15
 */

export const updateClientNotificationApi = (
  data: UpdateClientNotificationTypesReq,
): Promise<UpdateClientNotificationTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/clientNotification/updateClientNotification',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
