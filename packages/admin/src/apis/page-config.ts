import { httpHandler } from '@/utils/request'
import type {
  CreateTypesRes,
  CreateTypesReq,
  PageTypesRes,
  PageTypesReq,
  DetailByIdTypesRes,
  DetailByIdTypesReq,
  DetailByCodeTypesRes,
  DetailByCodeTypesReq,
  UpdateTypesRes,
  UpdateTypesReq,
  BatchUpdateStatusTypesRes,
  IncrementViewTypesRes,
  IncrementViewTypesReq,
  BatchDeleteTypesRes,
  BatchDeleteTypesReq,
} from './types/page-config.d'

/**
 *  接口 [创建页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311249079)
 *  @标签 客户端页面配置模块/创建页面配置
 *  @方式 POST
 *  @地址 /api/admin/page-config/create
 *  @更新时间 2025-06-21 01:38:08
 */

export const createApi = (data: CreateTypesReq): Promise<CreateTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/page-config/create',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询页面配置列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311249080)
 *  @标签 客户端页面配置模块/分页查询页面配置列表
 *  @方式 GET
 *  @地址 /api/admin/page-config/page
 *  @更新时间 2025-06-21 01:38:08
 */

export const pageApi = (params: PageTypesReq): Promise<PageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/page-config/page',
    headers: {},
    params,
  })
}

/**
 *  接口 [根据ID查询页面配置详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311784125)
 *  @标签 客户端页面配置模块/根据ID查询页面配置详情
 *  @方式 GET
 *  @地址 /api/admin/page-config/detailById
 *  @更新时间 2025-06-21 01:38:08
 */

export const detailByIdApi = (params: DetailByIdTypesReq): Promise<DetailByIdTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/page-config/detailById',
    headers: {},
    params,
  })
}

/**
 *  接口 [根据页面编码查询页面配置详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311784126)
 *  @标签 客户端页面配置模块/根据页面编码查询页面配置详情
 *  @方式 GET
 *  @地址 /api/admin/page-config/detailByCode
 *  @更新时间 2025-06-21 01:38:08
 */

export const detailByCodeApi = (params: DetailByCodeTypesReq): Promise<DetailByCodeTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/page-config/detailByCode',
    headers: {},
    params,
  })
}

/**
 *  接口 [批量更新页面配置状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311249084)
 *  @标签 客户端页面配置模块/批量更新页面配置状态
 *  @方式 POST
 *  @地址 /api/admin/page-config/update
 *  @更新时间 2025-06-21 01:38:08
 */

export const updateApi = (data: UpdateTypesReq): Promise<UpdateTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/page-config/update',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量更新页面配置状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311784127)
 *  @标签 客户端页面配置模块/批量更新页面配置状态
 *  @方式 POST
 *  @地址 /api/admin/page-config/batchUpdateStatus
 *  @更新时间 2025-06-21 01:38:08
 */

export const batchUpdateStatusApi = (): Promise<BatchUpdateStatusTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/page-config/batchUpdateStatus',
    headers: {},
  })
}

/**
 *  接口 [增加页面访问次数](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311784128)
 *  @标签 客户端页面配置模块/增加页面访问次数
 *  @方式 POST
 *  @地址 /api/admin/page-config/incrementView
 *  @更新时间 2025-06-21 01:38:08
 */

export const incrementViewApi = (data: IncrementViewTypesReq): Promise<IncrementViewTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/page-config/incrementView',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [批量软删除页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311784129)
 *  @标签 客户端页面配置模块/批量软删除页面配置
 *  @方式 POST
 *  @地址 /api/admin/page-config/batchDelete
 *  @更新时间 2025-06-21 01:38:08
 */

export const batchDeleteApi = (data: BatchDeleteTypesReq): Promise<BatchDeleteTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/page-config/batchDelete',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
