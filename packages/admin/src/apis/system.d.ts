/**
 * 接口 [获取请求日志↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-141609528)
 * @标签 `管理端/用户/数据字典/系统/获取请求日志`
 * @请求头 `GET /admin/system/getRequestLog`
 * @更新时间 `2024-01-17T13:22:00.000Z`
 */

export interface GetRequestLogTypings {
  Request: {
    /*
     * 请求方法，GET、POST
     */
    method?: string
    /*
     * 请求状态，1成功，0失败
     */
    status?: string
    /*
     * 开始时间
     */
    startTime?: string
    /*
     * 结束时间
     */
    endTime?: string
    /*
     * 页码
     */
    pageIndex?: string
    /*
     * 单页大小
     */
    pageSize?: string
    /*
     * 排序
     */
    orderBy?: string
    /*
     * 请求路径
     */
    path?: string
  }

  Response: {
    /*
     * 单页数量
     */
    pageSize: number
    /*
     * 页码
     */
    pageIndex: number
    /*
     * 总记录条数
     */
    total: number
    /*
     *
     */
    list: {
      /*
       * 创建时间
       */
      createdAt: string
      /*
       * 更新时间
       */
      updatedAt: string
      /*
       * 发起请求的用户名
       */
      username: string | null
      /*
       * 发起请求的用户id
       */
      userId: number | null
      /*
       * 路由描述信息
       */
      summary: string | null
      /*
       * 操作说明
       */
      record: string | null
      /*
       * 请求方法
       */
      method: string
      /*
       * 发起请求的IP
       */
      ip: string
      /*
       * 发起请求的地址
       */
      ipAddress: string
      /*
       * 状态码
       */
      statusCode: number
      /*
       * 状态码描述
       */
      statusDesc: string
      /*
       * 请求路径
       */
      path: string
      /*
       * 浏览器标识
       */
      userAgent: string
      /*
       * 请求参数
       */
      params: string | null
      /*
       * 主键id
       */
      id: number
    }[]
  }
}
