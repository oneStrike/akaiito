import { httpClient } from '@/utils/request'
import type {
  GetClientSystemConfigTypesRes,
  UpdateClientSystemConfigTypesRes,
  UpdateClientSystemConfigTypesReq,
} from './types/clientManage.d'

/**
 *  接口 [获取客户端系统配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199384357)
 *  @标签 客户端管理/获取客户端系统配置信息
 *  @方式 GET
 *  @地址 /admin/clientManage/getClientSystemConfig
 *  @更新时间 2024-09-16 01:18:07
 */

export const getClientSystemConfigApi = (): Promise<GetClientSystemConfigTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/clientManage/getClientSystemConfig',
  })
}

/**
 *  接口 [更新客户端系统配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199390132)
 *  @标签 客户端管理/更新客户端系统配置信息
 *  @方式 POST
 *  @地址 /admin/clientManage/updateClientSystemConfig
 *  @更新时间 2024-09-17 22:55:13
 */

export const updateClientSystemConfigApi = (
  data: UpdateClientSystemConfigTypesReq,
): Promise<UpdateClientSystemConfigTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/clientManage/updateClientSystemConfig',
    data,
  })
}
