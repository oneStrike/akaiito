import { httpHandler } from '@/utils/request'
import type {
  GetAppNotificationListTypesRes,
  GetAppNotificationListTypesReq,
  GetAppNotificationDetailTypesRes,
  GetAppNotificationDetailTypesReq,
  CreateAppNotificationTypesRes,
  CreateAppNotificationTypesReq,
  DeleteAppNotificationTypesRes,
  DeleteAppNotificationTypesReq,
  UpdateAppNotificationTypesRes,
  UpdateAppNotificationTypesReq,
} from './types/appNotification.d'

/**
 *  接口 [获取客户端通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234287265)
 *  @标签 通知公告/获取客户端通知公告
 *  @方式 GET
 *  @地址 /admin/appNotification/getAppNotificationList
 *  @更新时间 2024-11-24 12:54:13
 */

export const getAppNotificationListApi = (
  params: GetAppNotificationListTypesReq,
): Promise<GetAppNotificationListTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/admin/appNotification/getAppNotificationList',
    header: {},
    params,
  })
}

/**
 *  接口 [通知公告详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289150)
 *  @标签 通知公告/通知公告详情
 *  @方式 GET
 *  @地址 /admin/appNotification/getAppNotificationDetail
 *  @更新时间 2024-11-24 12:54:26
 */

export const getAppNotificationDetailApi = (
  params: GetAppNotificationDetailTypesReq,
): Promise<GetAppNotificationDetailTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/admin/appNotification/getAppNotificationDetail',
    header: {},
    params,
  })
}

/**
 *  接口 [创建通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234287295)
 *  @标签 通知公告/创建通知公告
 *  @方式 POST
 *  @地址 /admin/appNotification/createAppNotification
 *  @更新时间 2024-11-24 12:54:36
 */

export const createAppNotificationApi = (
  data: CreateAppNotificationTypesReq,
): Promise<CreateAppNotificationTypesRes> => {
  return undefined({
    method: 'POST',
    url: '/admin/appNotification/createAppNotification',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289337)
 *  @标签 通知公告/删除通知公告
 *  @方式 POST
 *  @地址 /admin/appNotification/deleteAppNotification
 *  @更新时间 2024-11-24 12:54:47
 */

export const deleteAppNotificationApi = (
  data: DeleteAppNotificationTypesReq,
): Promise<DeleteAppNotificationTypesRes> => {
  return undefined({
    method: 'POST',
    url: '/admin/appNotification/deleteAppNotification',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [编辑通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289369)
 *  @标签 通知公告/编辑通知公告
 *  @方式 POST
 *  @地址 /admin/appNotification/updateAppNotification
 *  @更新时间 2024-11-24 12:54:59
 */

export const updateAppNotificationApi = (
  data: UpdateAppNotificationTypesReq,
): Promise<UpdateAppNotificationTypesRes> => {
  return undefined({
    method: 'POST',
    url: '/admin/appNotification/updateAppNotification',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
