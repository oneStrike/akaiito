import { httpHandler } from '@/utils/request'
import type {
  NoticeCreateResponse,
  NoticeCreateRequest,
  NoticePageResponse,
  NoticePageRequest,
  NoticeDetailResponse,
  NoticeDetailRequest,
  NoticeUpdateResponse,
  NoticeUpdateRequest,
  NoticeUpdateStatusResponse,
  NoticeUpdateStatusRequest,
  NoticeBatchDeleteResponse,
  NoticeBatchDeleteRequest,
} from './types/notice.d'

/**
 *  接口 [创建通知消息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080033)
 *  @标签 客户端通知模块/创建通知消息
 *  @方式 POST
 *  @地址 /api/admin/notice/notice-create
 *  @更新时间 2025-06-23 08:49:54
 */

export const noticeCreateApi = (data: NoticeCreateRequest): Promise<NoticeCreateResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/notice-create',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询通知列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080034)
 *  @标签 客户端通知模块/分页查询通知列表
 *  @方式 GET
 *  @地址 /api/admin/notice/notice-page
 *  @更新时间 2025-06-23 08:49:54
 */

export const noticePageApi = (params: NoticePageRequest): Promise<NoticePageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/notice/notice-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [根据ID查询通知详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080035)
 *  @标签 客户端通知模块/根据ID查询通知详情
 *  @方式 GET
 *  @地址 /api/admin/notice/notice-detail
 *  @更新时间 2025-06-23 08:49:54
 */

export const noticeDetailApi = (params: NoticeDetailRequest): Promise<NoticeDetailResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/notice/notice-detail',
    headers: {},
    params,
  })
}

/**
 *  接口 [更新通知消息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080036)
 *  @标签 客户端通知模块/更新通知消息
 *  @方式 POST
 *  @地址 /api/admin/notice/notice-update
 *  @更新时间 2025-06-23 08:49:54
 */

export const noticeUpdateApi = (data: NoticeUpdateRequest): Promise<NoticeUpdateResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/notice-update',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新通知状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080037)
 *  @标签 客户端通知模块/更新通知状态
 *  @方式 POST
 *  @地址 /api/admin/notice/notice-update-status
 *  @更新时间 2025-06-23 08:49:54
 */

export const noticeUpdateStatusApi = (data: NoticeUpdateStatusRequest): Promise<NoticeUpdateStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/notice-update-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量删除通知](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080038)
 *  @标签 客户端通知模块/批量删除通知
 *  @方式 POST
 *  @地址 /api/admin/notice/notice-batch-delete
 *  @更新时间 2025-06-23 08:49:54
 */

export const noticeBatchDeleteApi = (data: NoticeBatchDeleteRequest): Promise<NoticeBatchDeleteResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/notice-batch-delete',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
