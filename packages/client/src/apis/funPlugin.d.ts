/**
 * 接口 [获取功能插件列表↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177741603)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/获取功能插件列表`
 * @请求头 `GET /admin/funPlugin/getFunPlugin`
 * @更新时间 `2024-05-24T15:36:55.000Z`
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
     *
     */
    data: {
      /*
       * 主键id
       */
      id: number
      /*
       * 应用状态，1启用、0禁用
       */
      status: number
      /*
       * 创建时间
       */
      createdAt: string
      /*
       * 更新时间
       */
      updatedAt: string
      /*
       * 插件名称
       */
      name: string
      /*
       * 插件封面
       */
      avatar: string
      /*
       * 插件类型，1==>小说 2==>漫画 3==>图片 4==>视频
       */
      type: number
      /*
       * 是否免费使用，1==>收费 0==>免费
       */
      isFree: number
      /*
       * 插件购买价格
       */
      price: string
      /*
       * 购买人次
       */
      purchaseCount: number
      /*
       * 辅助购买人次
       */
      assistPurchaseCount: number
      /*
       * 插件数据源名称
       */
      sourceName: string
      /*
       * 插件数据源地址
       */
      sourceUrl: string
      /*
       * 插件描述信息
       */
      desc: string
    }[]

    /*
     * 记录条数
     */
    total: number
  }
}
/**
 * 接口 [创建功能插件↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177742047)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/创建功能插件`
 * @请求头 `POST /admin/funPlugin/createFunPlugin`
 * @更新时间 `2024-05-24T15:44:47.000Z`
 */

export interface CreateFunPluginTypings {
  Request: {
    /*
     * 插件名称
     */
    name: string
    /*
     * 插件封面
     */
    avatar: string
    /*
     * 插件类型，1==>小说 2==>漫画 3==>图片 4==>视频
     */
    type: number
    /*
     * 是否收费，1==>收费 0==>免费
     */
    isFree: number
    /*
     * 收费价格
     */
    price?: number
    /*
     * 辅助购买人次
     */
    assistPurchaseCount?: number
    /*
     * 插件数据源名称
     */
    sourceName: string
    /*
     * 插件数据源地址
     */
    sourceUrl: string
    /*
     * 插件描述信息
     */
    desc: string
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [更新功能插件↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177743399)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/更新功能插件`
 * @请求头 `POST /admin/funPlugin/updateFunPlugin`
 * @更新时间 `2024-05-24T15:48:03.000Z`
 */

export interface UpdateFunPluginTypings {
  Request: {
    /*
     * 主键id
     */
    id: number
    /*
     * 插件名称
     */
    name: string
    /*
     * 插件封面
     */
    avatar: string
    /*
     * 插件类型，1==>小说 2==>漫画 3==>图片 4==>视频
     */
    type: string
    /*
     * 是否免费使用，1==>收费 0==>免费
     */
    isFree: string
    /*
     * 插件购买价格
     */
    price: string
    /*
     * 辅助购买人次
     */
    assistPurchaseCount: string
    /*
     * 插件数据源名称
     */
    sourceName: string
    /*
     * 插件数据源地址
     */
    sourceUrl: string
    /*
     * 插件描述信息
     */
    desc: string
  }
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
  Request: {
    /*
     * 主键id
     */
    id: number
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [更新插件状态↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-177743456)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/更新插件状态`
 * @请求头 `POST /admin/funPlugin/updateFunPluginStatus`
 * @更新时间 `2024-05-24T15:50:04.000Z`
 */

export interface UpdateFunPluginStatusTypings {
  Request: {
    /*
     * 主键id
     */
    id: number
    /*
     * 应用状态，1启用、0禁用
     */
    status: number
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [获取功能插件列表↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-180027519)
 * @标签 `客户端/功能插件/获取功能插件列表`
 * @请求头 `GET /client/funPlugin/getFunPlugin`
 * @更新时间 `2024-05-31T14:18:36.000Z`
 */

export interface GetFunPluginTypings {
  Request: null

  Response: null
}
