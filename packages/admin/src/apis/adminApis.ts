import { httpClient } from '@/utils/request'

/* <adminApis.ts> 管理端 */
/* @util <api-refs@1.1.5> */
/* @datasouce apifox */
/* @total 3 */
/* @projects 
   - [Aakiito2.0](https://www.apifox.cn/web/project/3418649)  
 */

/**
 * request body | 登录
 *
 * @function adminUserLogin
 * @ContentType application/json
 */
export interface IAdminUserLoginData {
  /**
   * 账号、手机号、邮箱
   */
  account: string
  /**
   * 密码
   */
  password: string
  /**
   * 验证码
   */
  captcha: string
  /**
   * 验证码id
   */
  captchaId: string
}

/**
 * response | 登录
 *
 * @function adminUserLogin
 * @status (200) 成功
 * @responseType json
 */
export interface IAdminUserLoginResponse {}

/**
 * 登录
 *
 * @link https://app.apifox.com/link/project/3418649/apis/api-130086370
 * @updateAt 2023-12-03T12:37:55.000Z
 * @author Akaiito
 */
export const adminUserLogin = (
  data: IAdminUserLoginData
): Promise<IAdminUserLoginResponse['data']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/login',
    data
  })
}

/**
 * response | 获取接口调用日志
 *
 * @function logGetLogs
 * @status (200) 成功
 * @responseType json
 */
export interface ILogGetLogsResponse {}

/**
 * 获取接口调用日志
 *
 * @link https://app.apifox.com/link/project/3418649/apis/api-117524114
 * @updateAt 2023-10-18T13:09:02.000Z
 * @author Akaiito
 */
export const logGetLogs = (): Promise<ILogGetLogsResponse['data']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/log/getLogs'
  })
}

/**
 * request body | 删除接口调用日志
 *
 * @function logDeleteLog
 * @ContentType application/json
 */
export interface ILogDeleteLogData {
  id: number
}

/**
 * response | 删除接口调用日志
 *
 * @function logDeleteLog
 * @status (200) 成功
 * @responseType json
 */
export interface ILogDeleteLogResponse {}

/**
 * 删除接口调用日志
 *
 * @link https://app.apifox.com/link/project/3418649/apis/api-120350001
 * @updateAt 2023-10-27T15:40:37.000Z
 * @author Akaiito
 */
export const logDeleteLog = (
  data: ILogDeleteLogData
): Promise<ILogDeleteLogResponse['data']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/log/deleteLog',
    data
  })
}
