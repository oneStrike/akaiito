/**
 *  接口 [获取请求日志](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-141609528)
 *  @标签 系统/获取请求日志
 *  @方式 GET
 *  @地址 /admin/logs/getRequestLogs
 *  @更新时间 2024-11-13 00:22:17
 */

export interface GetRequestLogsTypesReq {
  /* 请求方法，GET、POST */
  requestMethod?: string

  /* 请求状态，1成功，0失败 */
  responseCode?: string

  /* 开始时间 */
  startTime?: string

  /* 结束时间 */
  endTime?: string

  /* 页码 */
  pageIndex?: string

  /* 单页大小 */
  pageSize?: string

  /* 排序 */
  orderBy?: string

  /* 请求路径 */
  apiPath?: string
}

export interface GetRequestLogsTypesRes {
  list: {
    /* 发起请求的用户名 */
    username: string | null

    /* 发起请求的用户id */
    userId: number | null

    /* 浏览器标识 */
    userAgent: string

    /* 操作说明 */
    record: string | null

    /* 主键id */
    id: number

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string

    /* 状态码描述 */
    responseDesc: string

    /* 请求路径 */
    apiPath: string

    /* 请求参数 */
    requestParams: string | null

    /* 路由描述信息 */
    apiSummary: string | null

    /* 状态码 */
    responseCode: number

    /* 请求方法 */
    requestMethod: string

    /* 发起请求的地址 */
    ipMappingAddress: string

    /* 发起请求的IP */
    targetIp: string
  }[]
  /* 页码 */
  pageIndex: number

  /* 单页大小 */
  pageSize: number

  /* 总条数 */
  total: number
}
