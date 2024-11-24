import { httpHandler } from '@/utils/request'
import type {
  GetFunPluginTypesRes,
  GetFunPluginTypesReq,
  GetFunPluginDetailTypesRes,
  GetFunPluginDetailTypesReq,
} from './types/funPlugin.d'

/**
 *  接口 [获取功能插件列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-180027519)
 *  @标签 客户端/功能插件/获取功能插件列表
 *  @方式 GET
 *  @地址 /app/funPlugin/getFunPlugin
 *  @更新时间 2024-11-24 12:52:11
 */

export const getFunPluginApi = (params: GetFunPluginTypesReq): Promise<GetFunPluginTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/app/funPlugin/getFunPlugin',
    header: {},
    params,
  })
}

/**
 *  接口 [获取功能插件详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-197036146)
 *  @标签 客户端/功能插件/获取功能插件详情
 *  @方式 GET
 *  @地址 /app/funPlugin/getFunPluginDetail
 *  @更新时间 2024-11-24 12:52:19
 */

export const getFunPluginDetailApi = (params: GetFunPluginDetailTypesReq): Promise<GetFunPluginDetailTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/app/funPlugin/getFunPluginDetail',
    header: {},
    params,
  })
}
