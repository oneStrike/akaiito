/**
 * 接口 [获取客户端系统配置信息↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199384357)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/获取客户端系统配置信息`
 * @请求头 `GET /admin/clientManage/getClientSystemConfig`
 * @更新时间 `2024-09-15T17:18:07.000Z`
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
      * 客户端logo图片

      */
    logo: string
    /*
     * 客户端启用的内容模型 1==>小说 2==>漫画 3==>图片
     */
    contentModel: string
  }
}
/**
 * 接口 [更新客户端系统配置信息↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199390132)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/更新客户端系统配置信息`
 * @请求头 `POST /admin/clientManage/updateClientSystemConfig`
 * @更新时间 `2024-09-17T14:55:13.000Z`
 */

export interface UpdateClientSystemConfigTypings {
  Request: null
  /*
   * 主键id
   */
  Response: number
}
