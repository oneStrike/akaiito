/**
 *  接口 [分页查询请求日志](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-308932298)
 *  @标签 管理端请求日志模块/分页查询请求日志
 *  @方式 GET
 *  @地址 /api/admin/request-log/page
 *  @更新时间 2025-06-19 00:25:41
 */

export interface PageTypesReq {
  /* 单页大小，最大500，默认15 */
  pageSize?: number

  /* 当前页码 */
  pageIndex?: number

  /* 排序字段，json格式 */
  orderBy?: string

  /* 开始时间 */
  startDate?: string

  /* 结束时间 */
  endDate?: string

  /* 用户名模糊查询 */
  username?: string

  /* 用户ID精确查询 */
  userId?: number

  /* 响应状态码 */
  responseCode?: number

  /* 请求方法 */
  httpMethod?: string

  /* 请求路径模糊查询 */
  requestPath?: string
}

export interface PageTypesRes {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 主键ID */
    id: number

    /* 用户名 */
    username?: string

    /* 用户主键ID */
    userId?: number

    /* 调用IP地址 */
    ipAddress: string

    /* IP映射地址 */
    ipLocation: string

    /* 响应状态码 */
    responseCode: number

    /* 响应描述 */
    responseMessage: string

    /* 请求方法 */
    httpMethod: string

    /* 请求路径 */
    requestPath: string

    /* 接口描述信息 */
    operationDescription: string

    /* 浏览器信息标识 */
    userAgent: string

    /* 请求参数 */
    requestParams?: string

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }[]
}

/**
 *  接口 [查询请求日志详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-308932299)
 *  @标签 管理端请求日志模块/查询请求日志详情
 *  @方式 GET
 *  @地址 /api/admin/request-log/detail
 *  @更新时间 2025-06-19 00:25:41
 */

export interface DetailTypesReq {
  /*  */
  id: number
}

/*  */
export type DetailTypesRes = {
  /* 主键ID */
  id: number

  /* 用户名 */
  username?: string

  /* 用户主键ID */
  userId?: number

  /* 调用IP地址 */
  ipAddress: string

  /* IP映射地址 */
  ipLocation: string

  /* 响应状态码 */
  responseCode: number

  /* 响应描述 */
  responseMessage: string

  /* 请求方法 */
  httpMethod: string

  /* 请求路径 */
  requestPath: string

  /* 接口描述信息 */
  operationDescription: string

  /* 浏览器信息标识 */
  userAgent: string

  /* 请求参数 */
  requestParams?: string

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}
