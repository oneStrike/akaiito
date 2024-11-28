import { httpHandler } from '@/utils/request'
import type {
  GetAppNoticeListTypesRes,
  GetAppNoticeListTypesReq,
  GetAppNoticeDetailTypesRes,
  GetAppNoticeDetailTypesReq,
  CreateAppNoticeTypesRes,
  CreateAppNoticeTypesReq,
  DeleteAppNoticeTypesRes,
  DeleteAppNoticeTypesReq,
  UpdateAppNoticeTypesRes,
  UpdateAppNoticeTypesReq,
  PublishAppNoticeTypesRes,
  PublishAppNoticeTypesReq,
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
 *  @地址 /admin/appNotice/getAppNoticeDetail
 *  @更新时间 2024-11-27 23:47:55
 */

export const getAppNoticeDetailApi = (params: GetAppNoticeDetailTypesReq): Promise<GetAppNoticeDetailTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/appNotice/getAppNoticeDetail',
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

/**
 *  接口 [调整客户端通知消息发布状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-238543615)
 *  @标签 通知公告/调整客户端通知消息发布状态
 *  @方式 POST
 *  @地址 /admin/appNotice/publishAppNotice
 *  @更新时间 2024-11-28 08:55:41
 */

export const publishAppNoticeApi = (data: PublishAppNoticeTypesReq): Promise<PublishAppNoticeTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/appNotice/publishAppNotice',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
