/**
 * 接口 [获取功能插件列表↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177741603)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/获取功能插件列表`
 * @请求头 `GET /admin/funPlugin/getFunPlugin`
 * @更新时间 `2024-09-17T16:28:31.000Z`
 */

export interface GetFunPluginTypings {
  Request: {
    /*
     * 插件名称
     */
    name?: string
    /*
     * 插件类型，1==>小说 2==>漫画 3==>图片 4==>视频
     */
    type?: number
    /*
     * 状态1==>启用  0==>禁用
     */
    status?: number
    /*
     * 是否免费使用，1==>收费  0==>免费
     */
    isFree?: number
  }

  Response: {
    /*
     * 主键id
     */
    id: number
    /*
     * 插件名称
     */
    name: string
    /*
     * 插件图标
     */
    icon: string
    /*
     * 插件类型，1==>小说 2==>漫画 3==>图片
     */
    type: number
    /*
     * 状态1==>启用  0==>禁用
     */
    status: number
    /*
     * 描述信息
     */
    desc: string
    /*
     * 下载次数
     */
    downloadCount: number
    /*
     * 辅助购买人数
     */
    assistPurchaseCount: number
    /*
     * 购买人数
     */
    purchaseCount: number
    /*
     * 价格
     */
    price: string
    /*
     * 数据源名称
     */
    sourceName: string
    /*
     * 数据源地址
     */
    sourceUrl: string
    /*
     * 是否免费使用，1==>免费  0==>收费
     */
    isFree: number
    /*
     * 是否推荐，1==>推荐  0==>不推荐
     */
    isRecommend: number
    /*
     * 插件文件地址
     */
    pluginFile: string
    /*
     * 插件版本
     */
    version: string
    /*
     * 创建时间
     */
    createdAt: string
    /*
     * 更新时间
     */
    updatedAt: string
  }[]
}
/**
 * 接口 [创建功能插件↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177742047)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/创建功能插件`
 * @请求头 `POST /admin/funPlugin/createFunPlugin`
 * @更新时间 `2024-09-17T16:29:16.000Z`
 */

export interface CreateFunPluginTypings {
  Request: null
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [更新功能插件↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177743399)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/更新功能插件`
 * @请求头 `POST /admin/funPlugin/updateFunPlugin`
 * @更新时间 `2024-09-17T16:31:00.000Z`
 */

export interface UpdateFunPluginTypings {
  Request: null
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [删除功能插件↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177743443)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/删除功能插件`
 * @请求头 `POST /admin/funPlugin/deleteFunPlugin`
 * @更新时间 `2024-05-24T15:49:12.000Z`
 */

export interface DeleteFunPluginTypings {
  Request: null
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [更新插件状态↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177743456)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/更新插件状态`
 * @请求头 `POST /admin/funPlugin/updateFunPluginStatus`
 * @更新时间 `2024-09-17T16:31:48.000Z`
 */

export interface UpdateFunPluginStatusTypings {
  Request: null
  /*
   * 主键id
   */
  Response: number
}
