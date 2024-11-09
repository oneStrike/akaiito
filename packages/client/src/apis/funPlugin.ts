import { httpClient } from '@/utils/request'
import type {
  FunPluginGetFunPluginTypesRes,
  FunPluginGetFunPluginTypesReq,
  FunPluginGetFunPluginDetailTypesRes,
  FunPluginGetFunPluginDetailTypesReq,
} from './types/funPlugin.d'

/**
 *  接口 [获取功能插件列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-180027519)
 *  @标签 客户端/功能插件/获取功能插件列表
 *  @方式 GET
 *  @地址 /client/funPlugin/getFunPlugin
 *  @更新时间 2024-06-04 21:50:18
 */

export const funPluginGetFunPluginApi = (
  params: FunPluginGetFunPluginTypesReq,
): Promise<FunPluginGetFunPluginTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/client/funPlugin/getFunPlugin',
    header: {},
    params,
  })
}

/**
 *  接口 [获取功能插件详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-197036146)
 *  @标签 客户端/功能插件/获取功能插件详情
 *  @方式 GET
 *  @地址 /client/funPlugin/getFunPluginDetail
 *  @更新时间 2024-07-23 21:14:05
 */

export const funPluginGetFunPluginDetailApi = (
  params: FunPluginGetFunPluginDetailTypesReq,
): Promise<FunPluginGetFunPluginDetailTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/client/funPlugin/getFunPluginDetail',
    header: {},
    params,
  })
}
