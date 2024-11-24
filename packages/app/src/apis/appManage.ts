import { httpHandler } from '@/utils/request'
import type { GetAppSystemConfigTypesRes, GetPageConfigTypesRes, GetNotificationTypesRes } from './types/appManage.d'

/**
 *  接口 [系统配置](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199830259)
 *  @标签 系统/系统配置
 *  @方式 GET
 *  @地址 /app/appManage/getAppSystemConfig
 *  @更新时间 2024-11-24 12:53:14
 */

export const getAppSystemConfigApi = (): Promise<GetAppSystemConfigTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/app/appManage/getAppSystemConfig',
    header: {},
  })
}

/**
 *  接口 [获取页面配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234300560)
 *  @标签 系统/获取页面配置信息
 *  @方式 GET
 *  @地址 /app/appManage/getPageConfig
 *  @更新时间 2024-11-24 12:53:24
 */

export const getPageConfigApi = (): Promise<GetPageConfigTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/app/appManage/getPageConfig',
    header: {},
  })
}

/**
 *  接口 [通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234300567)
 *  @标签 系统/通知公告
 *  @方式 GET
 *  @地址 /app/appManage/getNotification
 *  @更新时间 2024-11-24 12:53:32
 */

export const getNotificationApi = (): Promise<GetNotificationTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/app/appManage/getNotification',
    header: {},
  })
}
