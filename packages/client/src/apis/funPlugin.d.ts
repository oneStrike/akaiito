/**
 * 接口 [获取功能插件列表↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-180027519)
 * @标签 `客户端/功能插件/获取功能插件列表`
 * @请求头 `GET /client/funPlugin/getFunPlugin`
 * @更新时间 `2024-06-04T13:50:18.000Z`
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
