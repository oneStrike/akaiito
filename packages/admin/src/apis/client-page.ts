import { httpHandler } from '@/utils/request'
import type {
  CreateClientPageResponse,
  CreateClientPageRequest,
  ClientPagePageResponse,
  ClientPagePageRequest,
  ClientPageDetailByIdResponse,
  ClientPageDetailByIdRequest,
  ClientPageDetailByCodeResponse,
  ClientPageDetailByCodeRequest,
  UpdateClientPageResponse,
  UpdateClientPageRequest,
  BatchDeleteClientPageResponse,
  BatchDeleteClientPageRequest,
} from './types/client-page.d'

/**
 *  接口 [创建页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090648)
 *  @标签 客户端页面配置模块/创建页面配置
 *  @方式 POST
 *  @地址 /api/admin/client-page/create-client-page
 *  @更新时间 2025-07-02 23:25:13
 */

export const createClientPageApi = (data: CreateClientPageRequest): Promise<CreateClientPageResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/client-page/create-client-page',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询页面配置列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090649)
 *  @标签 客户端页面配置模块/分页查询页面配置列表
 *  @方式 GET
 *  @地址 /api/admin/client-page/client-page-page
 *  @更新时间 2025-07-02 23:25:13
 */

export const clientPagePageApi = (params: ClientPagePageRequest): Promise<ClientPagePageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/client-page/client-page-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [根据ID查询页面配置详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090650)
 *  @标签 客户端页面配置模块/根据ID查询页面配置详情
 *  @方式 GET
 *  @地址 /api/admin/client-page/client-page-detail-by-id
 *  @更新时间 2025-07-02 23:25:13
 */

export const clientPageDetailByIdApi = (params: ClientPageDetailByIdRequest): Promise<ClientPageDetailByIdResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/client-page/client-page-detail-by-id',
    headers: {},
    params,
  })
}

/**
 *  接口 [根据页面编码查询页面配置详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090651)
 *  @标签 客户端页面配置模块/根据页面编码查询页面配置详情
 *  @方式 GET
 *  @地址 /api/admin/client-page/client-page-detail-by-code
 *  @更新时间 2025-07-02 23:25:13
 */

export const clientPageDetailByCodeApi = (
  params: ClientPageDetailByCodeRequest,
): Promise<ClientPageDetailByCodeResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/client-page/client-page-detail-by-code',
    headers: {},
    params,
  })
}

/**
 *  接口 [更新页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090652)
 *  @标签 客户端页面配置模块/更新页面配置
 *  @方式 POST
 *  @地址 /api/admin/client-page/update-client-page
 *  @更新时间 2025-07-02 23:25:13
 */

export const updateClientPageApi = (data: UpdateClientPageRequest): Promise<UpdateClientPageResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/client-page/update-client-page',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量软删除页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090653)
 *  @标签 客户端页面配置模块/批量软删除页面配置
 *  @方式 POST
 *  @地址 /api/admin/client-page/batch-delete-client-page
 *  @更新时间 2025-07-02 23:25:13
 */

export const batchDeleteClientPageApi = (
  data: BatchDeleteClientPageRequest,
): Promise<BatchDeleteClientPageResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/client-page/batch-delete-client-page',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
