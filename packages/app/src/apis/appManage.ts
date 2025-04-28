import { httpHandler } from '@/utils/request'
import type { GetSystemConfigTypesRes, GetPageConfigTypesRes, GetNoticeTypesRes } from './types/appManage.d'

/**
 *  接口 [系统配置](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199830259)
 *  @标签 系统/系统配置
 *  @方式 GET
 *  @地址 /app/appManage/getSystemConfig
 *  @更新时间 2024-11-28 15:00:08
 */

export const getSystemConfigApi = (): Promise<GetSystemConfigTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/app/appManage/getSystemConfig',
    header: {},
  })
}

/**
 *  接口 [获取页面配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234300560)
 *  @标签 系统/获取页面配置信息
 *  @方式 GET
 *  @地址 /app/appManage/getPageConfig
 *  @更新时间 2025-04-28 20:21:44
 */

export const getPageConfigApi = (): Promise<GetPageConfigTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/app/appManage/getPageConfig',
    header: {},
  })
}

/**
 *  接口 [通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234300567)
 *  @标签 系统/通知公告
 *  @方式 GET
 *  @地址 /app/appManage/getNotice
 *  @更新时间 2024-11-27 22:46:26
 */

export const getNoticeApi = (): Promise<GetNoticeTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/app/appManage/getNotice',
    header: {},
  })
}
