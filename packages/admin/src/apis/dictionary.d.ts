/**
 * 接口 [获取数据字典分页列表↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340416)
 * @标签 `管理端/用户/数据字典/获取数据字典分页列表`
 * @请求头 `GET /admin/dictionary/getDataDictionary`
 * @更新时间 `2023-12-21T15:06:46.000Z`
 */

export interface GetDataDictionaryTypings {
  Request: {
    /*
     * 单页数量
     */
    pageSize?: string
    /*
     * 页码
     */
    pageIndex?: string
    /*
     * 排序
     */
    orderBy?: string
    /*
     * 数据字典名称
     */
    name?: string
    /*
     * 数据字典code
     */
    code?: string
    /*
     * 状态，1启用、0禁用
     */
    status?: string
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
       * 主键id
       */
      id: number
      /*
       * 名称
       */
      name: string
      /*
       * 编码
       */
      code: string
      /*
       * 描述信息
       */
      desc: string
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
    }[]
  }
}
/**
 * 接口 [获取数据字典子项↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340593)
 * @标签 `管理端/用户/数据字典/获取数据字典子项`
 * @请求头 `GET /admin/dictionary/getDataDictionaryItems`
 * @更新时间 `2023-12-21T15:12:24.000Z`
 */

export interface GetDataDictionaryItemsTypings {
  Request: {
    /*
     * 页码
     */
    pageIndex?: string
    /*
     * 单页数量
     */
    pageSize?: string
    /*
     * 排序json
     */
    orderBy?: string
    /*
     * 名称
     */
    name?: string
    /*
     * 编码
     */
    code?: string
    /*
     * 状态，1启用、0禁用
     */
    status?: string
    /*
     * 字典code
     */
    dictionaryCode?: string
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
    list?: {
      /*
       * 名称
       */
      name: string
      /*
       * 编码
       */
      code: string
      /*
       * 描述信息
       */
      desc: string
      /*
       * 排序
       */
      order: number
      /*
       * 数据字典id
       */
      dictionaryId: number
      /*
       * 应用状态，1启用、0禁用
       */
      status: number
    }[]
  }
}
/**
 * 接口 [创建数据字典↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340982)
 * @标签 `管理端/用户/数据字典/创建数据字典`
 * @请求头 `POST /admin/dictionary/createDataDictionary`
 * @更新时间 `2023-12-20T16:25:25.000Z`
 */

export interface CreateDataDictionaryTypings {
  Request: {
    /*
     * 名称
     */
    name: string
    /*
     * 编码
     */
    code: string
    /*
     * 描述信息
     */
    desc: string
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [创建数据字典子项↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135341394)
 * @标签 `管理端/用户/数据字典/创建数据字典子项`
 * @请求头 `POST /admin/dictionary/createDataDictionaryItems`
 * @更新时间 `2023-12-21T15:01:53.000Z`
 */

export interface CreateDataDictionaryItemsTypings {
  Request: {
    /*
     * 名称
     */
    name: string
    /*
     * 编码
     */
    code: string
    /*
     * 描述信息
     */
    desc: string
    /*
     * 数据字典id
     */
    dictionaryId: number
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [删除数据字典↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691283)
 * @标签 `管理端/用户/数据字典/删除数据字典`
 * @请求头 `POST /admin/dictionary/deleteDataDictionary`
 * @更新时间 `2023-12-30T08:33:56.000Z`
 */

export interface DeleteDataDictionaryTypings {
  Request: {
    /*
     *
     */
    ids: number[]
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [删除数据字典子项↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691296)
 * @标签 `管理端/用户/数据字典/删除数据字典子项`
 * @请求头 `POST /admin/dictionary/deleteDataDictionaryItems`
 * @更新时间 `2023-12-30T08:34:08.000Z`
 */

export interface DeleteDataDictionaryItemsTypings {
  Request: {
    /*
     *
     */
    ids: number[]
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [更新数据字典↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691324)
 * @标签 `管理端/用户/数据字典/更新数据字典`
 * @请求头 `POST /admin/dictionary/updateDataDictionary`
 * @更新时间 `2023-12-30T08:34:50.000Z`
 */

export interface UpdateDataDictionaryTypings {
  Request: {
    /*
     * 名称
     */
    name: string
    /*
     * 编码
     */
    code: string
    /*
     * 描述
     */
    desc: string
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
 * 接口 [更新数据字典子项↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691385)
 * @标签 `管理端/用户/数据字典/更新数据字典子项`
 * @请求头 `POST /admin/dictionary/updateDataDictionaryItems`
 * @更新时间 `2023-12-21T15:30:11.000Z`
 */

export interface UpdateDataDictionaryItemsTypings {
  Request: {
    /*
     * 主键id
     */
    id: number
    /*
     * 名称
     */
    name: string
    /*
     * 编码
     */
    code: string
    /*
     * 描述
     */
    desc: string
  }

  Response: null
}
/**
 * 接口 [更新数据字典状态↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691434)
 * @标签 `管理端/用户/数据字典/更新数据字典状态`
 * @请求头 `POST /admin/dictionary/updateDataDictionaryStatus`
 * @更新时间 `2023-12-30T08:35:06.000Z`
 */

export interface UpdateDataDictionaryStatusTypings {
  Request: {
    /*
     * 应用状态，1启用、0禁用
     */
    status: number
    /*
     *
     */
    ids: number[]
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [更新数据字典子项状态↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691450)
 * @标签 `管理端/用户/数据字典/更新数据字典子项状态`
 * @请求头 `POST /admin/dictionary/updateDataDictionaryItemsStatus`
 * @更新时间 `2023-12-30T08:35:20.000Z`
 */

export interface UpdateDataDictionaryItemsStatusTypings {
  Request: {
    /*
     * 应用状态，1启用、0禁用
     */
    status: number
    /*
     *
     */
    ids: number[]
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [调整数据字典子项排序↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691501)
 * @标签 `管理端/用户/数据字典/调整数据字典子项排序`
 * @请求头 `POST /admin/dictionary/updateDataDictionaryItemsOrder`
 * @更新时间 `2023-12-21T15:17:44.000Z`
 */

export interface UpdateDataDictionaryItemsOrderTypings {
  Request: {
    /*
     * 目标id
     */
    targetId: number
    /*
     * 目标现有排序
     */
    targetOrder: number
    /*
     * 更新源id
     */
    originId: number
    /*
     * 更新源现有排序
     */
    originOrder: number
  }
  /*
   * 主键id
   */
  Response: number
}
