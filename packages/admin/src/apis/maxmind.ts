import { httpHandler } from '@/utils/request'
import type { StatusTypesRes, UpdateTypesRes } from './types/maxmind.d'

/**
 *  接口 [获取MaxMind数据库状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-308932300)
 *  @标签 MaxMind GeoIP管理/获取MaxMind数据库状态
 *  @方式 GET
 *  @地址 /api/admin/maxmind/status
 *  @更新时间 2025-06-15 23:19:15
 */

export const statusApi = (): Promise<StatusTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/maxmind/status',
    headers: {},
  })
}

/**
 *  接口 [手动更新MaxMind数据库](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-308932301)
 *  @标签 MaxMind GeoIP管理/手动更新MaxMind数据库
 *  @方式 POST
 *  @地址 /api/admin/maxmind/update
 *  @更新时间 2025-06-15 23:19:15
 */

export const updateApi = (): Promise<UpdateTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/maxmind/update',
    headers: {},
  })
}
