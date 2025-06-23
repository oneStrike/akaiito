import { httpHandler } from '@/utils/request'
import type {
  PageConfigCreateResponse,
  PageConfigCreateRequest,
  PageConfigPageResponse,
  PageConfigPageRequest,
  PageConfigDetailByIdResponse,
  PageConfigDetailByIdRequest,
  PageConfigDetailByCodeResponse,
  PageConfigDetailByCodeRequest,
  PageConfigUpdateResponse,
  PageConfigUpdateRequest,
  PageConfigBatchUpdateStatusResponse,
  PageConfigIncrementViewResponse,
  PageConfigIncrementViewRequest,
  PageConfigBatchDeleteResponse,
  PageConfigBatchDeleteRequest,
} from './types/page-config.d'

/**
 *  接口 [创建页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080039)
 *  @标签 客户端页面配置模块/创建页面配置
 *  @方式 POST
 *  @地址 /api/admin/page-config/page-config-create
 *  @更新时间 2025-06-23 21:14:46
 */

export const pageConfigCreateApi = (data: PageConfigCreateRequest): Promise<PageConfigCreateResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/page-config/page-config-create',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询页面配置列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080040)
 *  @标签 客户端页面配置模块/分页查询页面配置列表
 *  @方式 GET
 *  @地址 /api/admin/page-config/page-config-page
 *  @更新时间 2025-06-23 21:14:46
 */

export const pageConfigPageApi = (params: PageConfigPageRequest): Promise<PageConfigPageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/page-config/page-config-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [根据ID查询页面配置详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080041)
 *  @标签 客户端页面配置模块/根据ID查询页面配置详情
 *  @方式 GET
 *  @地址 /api/admin/page-config/page-config-detail-by-id
 *  @更新时间 2025-06-23 21:14:46
 */

export const pageConfigDetailByIdApi = (params: PageConfigDetailByIdRequest): Promise<PageConfigDetailByIdResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/page-config/page-config-detail-by-id',
    headers: {},
    params,
  })
}

/**
 *  接口 [根据页面编码查询页面配置详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080042)
 *  @标签 客户端页面配置模块/根据页面编码查询页面配置详情
 *  @方式 GET
 *  @地址 /api/admin/page-config/page-config-detail-by-code
 *  @更新时间 2025-06-23 21:14:46
 */

export const pageConfigDetailByCodeApi = (
  params: PageConfigDetailByCodeRequest,
): Promise<PageConfigDetailByCodeResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/page-config/page-config-detail-by-code',
    headers: {},
    params,
  })
}

/**
 *  接口 [更新页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080043)
 *  @标签 客户端页面配置模块/更新页面配置
 *  @方式 POST
 *  @地址 /api/admin/page-config/page-config-update
 *  @更新时间 2025-06-23 21:14:46
 */

export const pageConfigUpdateApi = (data: PageConfigUpdateRequest): Promise<PageConfigUpdateResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/page-config/page-config-update',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新页面配置状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080044)
 *  @标签 客户端页面配置模块/批量更新页面配置状态
 *  @方式 POST
 *  @地址 /api/admin/page-config/page-config-batch-update-status
 *  @更新时间 2025-06-23 21:14:46
 */

export const pageConfigBatchUpdateStatusApi = (): Promise<PageConfigBatchUpdateStatusResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/page-config/page-config-batch-update-status',
    headers: {},
  })
}

/**
 *  接口 [增加页面访问次数](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080045)
 *  @标签 客户端页面配置模块/增加页面访问次数
 *  @方式 POST
 *  @地址 /api/admin/page-config/page-config-increment-view
 *  @更新时间 2025-06-23 21:14:46
 */

export const pageConfigIncrementViewApi = (
  data: PageConfigIncrementViewRequest,
): Promise<PageConfigIncrementViewResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/page-config/page-config-increment-view',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量软删除页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080046)
 *  @标签 客户端页面配置模块/批量软删除页面配置
 *  @方式 POST
 *  @地址 /api/admin/page-config/page-config-batch-delete
 *  @更新时间 2025-06-23 21:14:46
 */

export const pageConfigBatchDeleteApi = (
  data: PageConfigBatchDeleteRequest,
): Promise<PageConfigBatchDeleteResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/page-config/page-config-batch-delete',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
