/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [获取diy列表数据↗](https://yapi.pro/project/4729/interface/api/434468) 的 **请求类型**
 *
 * @分类 [diy页面↗](https://yapi.pro/project/4729/interface/api/cat_106721)
 * @标签 `diy页面`
 * @请求头 `GET /admin/diy/getDiy`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface DiyGetDiyRequest {}

/**
 * 接口 [获取diy列表数据↗](https://yapi.pro/project/4729/interface/api/434468) 的 **返回类型**
 *
 * @分类 [diy页面↗](https://yapi.pro/project/4729/interface/api/cat_106721)
 * @标签 `diy页面`
 * @请求头 `GET /admin/diy/getDiy`
 * @更新时间 `2022-12-21 08:21:30`
 */
export type DiyGetDiyResponse = {
  /**
   * 主键id
   */
  id: number
  /**
   * diy名称
   */
  diyName: string
  /**
   * diy数据
   */
  diyData: string
  /**
   * 是否使用1使用0未使用
   */
  use: number
  /**
   * 创建时间
   */
  createdAt: string
  /**
   * 更新时间
   */
  updatedAt: string
}[]

/* prettier-ignore-end */
