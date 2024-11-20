import { httpClient } from '@/utils/request'
import type {
  GetClientConfigTypesRes,
  UpdateSystemConfigTypesRes,
  UpdateSystemConfigTypesReq,
} from './types/clientManage.d'

/**
 *  接口 [获取客户端系统配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199384357)
 *  @标签 客户端管理/系统配置/获取客户端系统配置信息
 *  @方式 GET
 *  @地址 /admin/clientManage/getClientConfig
 *  @更新时间 2024-11-15 22:33:17
 */

export const getClientConfigApi = (): Promise<GetClientConfigTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/clientManage/getClientConfig',
    header: {},
  })
}

/**
 *  接口 [更新客户端系统配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199390132)
 *  @标签 客户端管理/系统配置/更新客户端系统配置信息
 *  @方式 POST
 *  @地址 /admin/clientManage/updateSystemConfig
 *  @更新时间 2024-11-15 22:33:18
 */

export const updateSystemConfigApi = (data: UpdateSystemConfigTypesReq): Promise<UpdateSystemConfigTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/clientManage/updateSystemConfig',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
