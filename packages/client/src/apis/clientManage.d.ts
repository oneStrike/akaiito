/**
 * 接口 [系统管理↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199830259)
 * @标签 `客户端/系统管理`
 * @请求头 `GET /client/clientManage/getClientSystemConfig`
 * @更新时间 `2024-07-31T13:39:15.000Z`
 */

export interface GetClientSystemConfigTypings {
  Request: null

  Response: {
    /*
     * 主键id
     */
    id: number
    /*
     * 客户端名称
     */
    clientName: string
    /*
     * 客户端logo
     */
    logo: string
  }
}
