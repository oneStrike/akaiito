/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [登录↗](https://yapi.pro/project/11787/interface/api/465158) 的 **请求类型**
 *
 * @分类 [客户端/用户↗](https://yapi.pro/project/11787/interface/api/cat_117060)
 * @标签 `客户端/用户`
 * @请求头 `POST /client/user/login`
 * @更新时间 `2023-04-13 23:03:13`
 */
export interface ClientLoginReq {}

/**
 * 接口 [登录↗](https://yapi.pro/project/11787/interface/api/465158) 的 **返回类型**
 *
 * @分类 [客户端/用户↗](https://yapi.pro/project/11787/interface/api/cat_117060)
 * @标签 `客户端/用户`
 * @请求头 `POST /client/user/login`
 * @更新时间 `2023-04-13 23:03:13`
 */
export interface ClientLoginRes {
  /**
   * 用户id
   */
  id: number
  /**
   * 用户昵称
   */
  username: string
  /**
   * 用户头像
   */
  avatar: string
  /**
   * vip状态，1是，0否
   */
  vipStatus: number
  /**
   * vip等级
   */
  vipLevel: number
}

/* prettier-ignore-end */
