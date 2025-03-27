import { httpHandler } from '@/utils/request'
import type { GetAppConfigTypesRes, UpdateSystemConfigTypesRes, UpdateSystemConfigTypesReq } from './types/appManage.d'

/**
 *  接口 [获取客户端系统配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199384357)
 *  @标签 客户端管理/系统配置/获取客户端系统配置信息
 *  @方式 GET
 *  @地址 /admin/appManage/getAppConfig
 *  @更新时间 2024-11-24 12:53:51
 */

export const getAppConfigApi = (): Promise<GetAppConfigTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/appManage/getAppConfig',
    headers: {},
  })
}

/**
 *  接口 [更新客户端系统配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199390132)
 *  @标签 客户端管理/系统配置/更新客户端系统配置信息
 *  @方式 POST
 *  @地址 /admin/appManage/updateSystemConfig
 *  @更新时间 2024-11-24 12:54:02
 */

export const updateSystemConfigApi = (data: UpdateSystemConfigTypesReq): Promise<UpdateSystemConfigTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/appManage/updateSystemConfig',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
