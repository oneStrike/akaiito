import { httpHandler } from '@/utils/request'
import type {
  CreateNoticeResponse,
  CreateNoticeRequest,
  NoticePageResponse,
  NoticePageRequest,
  NoticeDetailResponse,
  NoticeDetailRequest,
  UpdateNoticeResponse,
  UpdateNoticeRequest,
  UpdateNoticeStatusResponse,
  UpdateNoticeStatusRequest,
  BatchDeleteNoticeResponse,
  BatchDeleteNoticeRequest,
} from './types/notice.d'

/**
 *  接口 [创建通知消息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391297)
 *  @标签 客户端通知模块/创建通知消息
 *  @方式 POST
 *  @地址 /api/admin/notice/create-notice
 *  @更新时间 2025-06-25 11:22:00
 */

export const createNoticeApi = (data: CreateNoticeRequest): Promise<CreateNoticeResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/create-notice',
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
 *  @更新时间 2025-06-25 11:22:00
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
 *  @更新时间 2025-06-25 11:22:00
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
 *  接口 [更新通知消息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391298)
 *  @标签 客户端通知模块/更新通知消息
 *  @方式 POST
 *  @地址 /api/admin/notice/update-notice
 *  @更新时间 2025-06-25 11:22:00
 */

export const updateNoticeApi = (data: UpdateNoticeRequest): Promise<UpdateNoticeResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/update-notice',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新通知状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391299)
 *  @标签 客户端通知模块/更新通知状态
 *  @方式 POST
 *  @地址 /api/admin/notice/update-notice-status
 *  @更新时间 2025-06-25 11:22:00
 */

export const updateNoticeStatusApi = (data: UpdateNoticeStatusRequest): Promise<UpdateNoticeStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/update-notice-status',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量删除通知](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-313391300)
 *  @标签 客户端通知模块/批量删除通知
 *  @方式 POST
 *  @地址 /api/admin/notice/batch-delete-notice
 *  @更新时间 2025-06-25 11:22:00
 */

export const batchDeleteNoticeApi = (data: BatchDeleteNoticeRequest): Promise<BatchDeleteNoticeResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/batch-delete-notice',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
