import { httpClient } from '@/utils/request'

/* <adminApis.ts> 管理端 */
/* @util <api-refs@1.1.5> */
/* @datasouce apifox */
/* @total 2 */
/* @projects
   - [Aakiito2.0](https://www.apifox.cn/web/project/3418649)
 */

/**
 * response | 获取接口调用日志
 *
 * @function getLogs
 * @status (200) 成功
 * @responseType json
 */
export interface IGetLogsResponse {}

/**
 * 获取接口调用日志
 *
 * @link https://app.apifox.com/link/project/3418649/apis/api-117524114
 * @updateAt 2023-10-18T13:09:02.000Z
 * @author Akaiito
 */
export const getLogs = (): Promise<IGetLogsResponse['data']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/log/getLogs'
  })
}

/**
 * request body | 删除接口调用日志
 *
 * @function deleteLog
 * @ContentType application/json
 */
export interface IDeleteLogData {
  id: number
}

/**
 * response | 删除接口调用日志
 *
 * @function deleteLog
 * @status (200) 成功
 * @responseType json
 */
export interface IDeleteLogResponse {}

/**
 * 删除接口调用日志
 *
 * @link https://app.apifox.com/link/project/3418649/apis/api-120350001
 * @updateAt 2023-10-27T15:40:37.000Z
 * @author Akaiito
 */
export const deleteLog = (
  data: IDeleteLogData
): Promise<IDeleteLogResponse['data']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/log/deleteLog',
    data
  })
}
