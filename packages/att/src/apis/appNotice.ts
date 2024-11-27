import { httpHandler } from '@/utils/request'
import type {
  GetAppNoticeListTypesRes,
  GetAppNoticeListTypesReq,
  GetAppNoticeTypesRes,
  GetAppNoticeTypesReq,
  CreateAppNoticeTypesRes,
  CreateAppNoticeTypesReq,
  DeleteAppNoticeTypesRes,
  DeleteAppNoticeTypesReq,
  UpdateAppNoticeTypesRes,
  UpdateAppNoticeTypesReq,
} from './types/appNotice.d'

/**
 *  接口 [获取客户端通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234287265)
 *  @标签 通知公告/获取客户端通知公告
 *  @方式 GET
 *  @地址 /admin/appNotice/getAppNoticeList
 *  @更新时间 2024-11-27 22:55:28
 */

export const getAppNoticeListApi = (params: GetAppNoticeListTypesReq): Promise<GetAppNoticeListTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/appNotice/getAppNoticeList',
    headers: {},
    params,
  })
}

/**
 *  接口 [通知公告详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289150)
 *  @标签 通知公告/通知公告详情
 *  @方式 GET
 *  @地址 /admin/appNotice/getAppNotice
 *  @更新时间 2024-11-27 22:45:55
 */

export const getAppNoticeApi = (params: GetAppNoticeTypesReq): Promise<GetAppNoticeTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/appNotice/getAppNotice',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234287295)
 *  @标签 通知公告/创建通知公告
 *  @方式 POST
 *  @地址 /admin/appNotice/createAppNotice
 *  @更新时间 2024-11-27 22:46:03
 */

export const createAppNoticeApi = (data: CreateAppNoticeTypesReq): Promise<CreateAppNoticeTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/appNotice/createAppNotice',
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
 *  @地址 /admin/appNotice/deleteAppNotice
 *  @更新时间 2024-11-27 22:46:11
 */

export const deleteAppNoticeApi = (data: DeleteAppNoticeTypesReq): Promise<DeleteAppNoticeTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/appNotice/deleteAppNotice',
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
 *  @地址 /admin/appNotice/updateAppNotice
 *  @更新时间 2024-11-27 22:46:18
 */

export const updateAppNoticeApi = (data: UpdateAppNoticeTypesReq): Promise<UpdateAppNoticeTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/appNotice/updateAppNotice',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
