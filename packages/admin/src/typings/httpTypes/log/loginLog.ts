/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [登录日志↗](https://yapi.pro/project/4729/interface/api/378445) 的 **请求类型**
 *
 * @分类 [日志↗](https://yapi.pro/project/4729/interface/api/cat_95683)
 * @标签 `日志`
 * @请求头 `GET /admin/log/loginLog`
 * @更新时间 `2022-12-21 08:21:29`
 */
export interface LogLoginLogRequest {}

/**
 * 接口 [登录日志↗](https://yapi.pro/project/4729/interface/api/378445) 的 **返回类型**
 *
 * @分类 [日志↗](https://yapi.pro/project/4729/interface/api/cat_95683)
 * @标签 `日志`
 * @请求头 `GET /admin/log/loginLog`
 * @更新时间 `2022-12-21 08:21:29`
 */
export interface LogLoginLogResponse {
  /**
   * 单页数量
   */
  pageSize: number
  /**
   * 页码
   */
  pageIndex: number
  /**
   * 排序方式
   */
  sort: string
  /**
   * 排序的字段
   */
  sortField: string
  /**
   * 符合条件的总数量
   */
  total: number
  /**
   * 当前返回的数量
   */
  count: number
  /**
   * 列表数据
   */
  list: {
    /**
     * 主键id
     */
    id: number
    /**
     * 操作时间
     */
    createdAt: string
    /**
     * 更新时间
     */
    upatedAt: string
    /**
     * 操作者账号
     */
    userAccount: string
    /**
     * 操作昵称
     */
    username: string
    /**
     * 操作的用户id
     */
    userId: number
    /**
     * 操作类型
     */
    action: string
    /**
     * 操作者ip
     */
    ip: string
    /**
     * 操作者id映射地址
     */
    ipAddress: string
    /**
     * 操作状态
     */
    receipt: string
    /**
     * 操作状态描述
     */
    receiptDesc: string
    /**
     * 请求参数
     */
    params: string
  }[]
}

/* prettier-ignore-end */
