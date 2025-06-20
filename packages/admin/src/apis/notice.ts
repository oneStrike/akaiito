import { httpHandler } from '@/utils/request'
import type {
  CreateTypesRes,
  CreateTypesReq,
  PageTypesRes,
  PageTypesReq,
  DetailTypesRes,
  DetailTypesReq,
  UpdateTypesRes,
  UpdateTypesReq,
  UpdateStatusTypesRes,
  UpdateStatusTypesReq,
  BatchDeleteTypesRes,
  BatchDeleteTypesReq,
} from './types/notice.d'

/**
 *  接口 [创建通知消息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928720)
 *  @标签 客户端通知模块/创建通知消息
 *  @方式 POST
 *  @地址 /api/admin/notice/create
 *  @更新时间 2025-06-21 01:38:08
 */

export const createApi = (data: CreateTypesReq): Promise<CreateTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/create',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询通知列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928721)
 *  @标签 客户端通知模块/分页查询通知列表
 *  @方式 GET
 *  @地址 /api/admin/notice/page
 *  @更新时间 2025-06-21 01:38:08
 */

export const pageApi = (params: PageTypesReq): Promise<PageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/notice/page',
    headers: {},
    params,
  })
}

/**
 *  接口 [根据ID查询通知详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928722)
 *  @标签 客户端通知模块/根据ID查询通知详情
 *  @方式 GET
 *  @地址 /api/admin/notice/detail
 *  @更新时间 2025-06-21 01:38:08
 */

export const detailApi = (params: DetailTypesReq): Promise<DetailTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/notice/detail',
    headers: {},
    params,
  })
}

/**
 *  接口 [更新通知消息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928723)
 *  @标签 客户端通知模块/更新通知消息
 *  @方式 POST
 *  @地址 /api/admin/notice/update
 *  @更新时间 2025-06-21 01:38:08
 */

export const updateApi = (data: UpdateTypesReq): Promise<UpdateTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/update',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新通知状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928724)
 *  @标签 客户端通知模块/更新通知状态
 *  @方式 POST
 *  @地址 /api/admin/notice/updateStatus
 *  @更新时间 2025-06-21 01:38:08
 */

export const updateStatusApi = (data: UpdateStatusTypesReq): Promise<UpdateStatusTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/updateStatus',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量删除通知](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928725)
 *  @标签 客户端通知模块/批量删除通知
 *  @方式 POST
 *  @地址 /api/admin/notice/batchDelete
 *  @更新时间 2025-06-21 01:38:08
 */

export const batchDeleteApi = (data: BatchDeleteTypesReq): Promise<BatchDeleteTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/notice/batchDelete',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
