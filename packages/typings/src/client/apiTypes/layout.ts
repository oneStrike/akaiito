/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [获取首页布局↗](https://yapi.pro/project/11787/interface/api/459394) 的 **请求类型**
 *
 * @分类 [客户端/首页diy↗](https://yapi.pro/project/11787/interface/api/cat_112988)
 * @标签 `客户端/首页diy`
 * @请求头 `GET /client/layout/homeLayout`
 * @更新时间 `2023-04-13 23:03:13`
 */
export interface ClientHomeLayoutReq {}

/**
 * 接口 [获取首页布局↗](https://yapi.pro/project/11787/interface/api/459394) 的 **返回类型**
 *
 * @分类 [客户端/首页diy↗](https://yapi.pro/project/11787/interface/api/cat_112988)
 * @标签 `客户端/首页diy`
 * @请求头 `GET /client/layout/homeLayout`
 * @更新时间 `2023-04-13 23:03:13`
 */
export interface ClientHomeLayoutRes {
  /**
   * 主键id
   */
  id: number
  /**
   * 布局名称
   */
  diyName: string
  /**
   * 布局数据
   */
  diyData: string
  /**
   * 是否使用，1使用，0未使用
   */
  use: string
  /**
   * 创建日期
   */
  createdAt?: string
  /**
   * 更新日期
   */
  updatedAt?: string
}

/* prettier-ignore-end */
