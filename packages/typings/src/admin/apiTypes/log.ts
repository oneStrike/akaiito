/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [获取登录日志↗](https://yapi.pro/project/11787/interface/api/459220) 的 **请求类型**
 *
 * @分类 [管理端/日志记录↗](https://yapi.pro/project/11787/interface/api/cat_112844)
 * @标签 `管理端/日志记录`
 * @请求头 `GET /admin/log/loginLog`
 * @更新时间 `2023-04-13 23:03:13`
 */
export interface AdminLoginLogReq {
  /**
   * 页码
   */
  pageIndex?: string
  /**
   * 单页大小
   */
  pageSize?: string
  /**
   * 排序方式 asc正序 desc倒序
   */
  sort?: string
  /**
   * 排序字段
   */
  sortField?: string
  /**
   * 用户id
   */
  userId?: string
  /**
   * 登录状态 1成功 0失败
   */
  receipt?: string
  /**
   * 开始时间
   */
  startDate?: string
  /**
   * 结束时间
   */
  endStart?: string
}

/**
 * 接口 [获取登录日志↗](https://yapi.pro/project/11787/interface/api/459220) 的 **返回类型**
 *
 * @分类 [管理端/日志记录↗](https://yapi.pro/project/11787/interface/api/cat_112844)
 * @标签 `管理端/日志记录`
 * @请求头 `GET /admin/log/loginLog`
 * @更新时间 `2023-04-13 23:03:13`
 */
export interface AdminLoginLogRes {
  list: {
    /**
     * 主键id
     */
    id: number
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
    receipt: number
    /**
     * 操作状态描述
     */
    receiptDesc: string
    /**
     * 请求参数
     */
    params: string
    /**
     * 浏览器用户UA
     */
    userAgent: string
    /**
     * 创建日期
     */
    createdAt?: string
    /**
     * 更新日期
     */
    updatedAt?: string
  }[]
  /**
   * 总数据数量
   */
  total: number
  /**
   * 返回的数据数量
   */
  count: number
  /**
   * 单页大小
   */
  pageSize: number
  /**
   * 页码
   */
  pageIndex: number
  /**
   * 排序方式，asc正序，desc倒序
   */
  sort?: string
  /**
   * 排序字段
   */
  sortField?: string
}

/* prettier-ignore-end */
