/**
 * 接口 [作者分页列表↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215698093)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/内容管理/作者管理/作者分页列表`
 * @请求头 `GET /admin/contentMgmt/author/getAuthorPage`
 * @更新时间 `2024-09-16T14:23:08.000Z`
 */

export interface GetAuthorPageTypings {
  Request: {
    /*
     *
     */
    pageIndex?: string
    /*
     *
     */
    pageSize?: string
    /*
     * 作者姓名
     */
    name?: string
    /*
     * 作者内容类型 1==>小说 2==>漫画 3==>图片 4==>视频
     */
    contentType?: string
    /*
     * 状态 1：正常 0：禁用
     */
    status?: string
  }

  Response: {
    /*
     * 页码
     */
    pageIndex: number
    /*
     * 单页大小
     */
    pageSize: number
    /*
     * 总条数
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
       * 状态，1==>正常 0==>禁用
       */
      status: number
      /*
       * 作者姓名
       */
      name: string
      /*
       * 作者头像
       */
      avatar: string
      /*
       * 作者简介
       */
      description: string
      /*
       * 作者三方主页
       */
      website?: string
      /*
       * 作者内容类型 1==>小说 2==>漫画 3==>图片 4==>视频
       */
      contentModel: string
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
 * 接口 [创建作者↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-214490409)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/内容管理/作者管理/创建作者`
 * @请求头 `POST /admin/contentMgmt/author/createAuthor`
 * @更新时间 `2024-09-17T16:33:57.000Z`
 */

export interface CreateAuthorTypings {
  Request: null
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [更新作者信息↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-214498981)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/内容管理/作者管理/更新作者信息`
 * @请求头 `POST /admin/contentMgmt/author/updateAuthor`
 * @更新时间 `2024-09-17T15:13:32.000Z`
 */

export interface UpdateAuthorTypings {
  Request: null

  Response: {
    /*
     * 作者姓名
     */
    name: string
    /*
     * 作者头像
     */
    avatar: string
    /*
     * 作者描述
     */
    description: string
    /*
     * 作者内容类型 1==>小说 2==>漫画 3==>图片 4==>视频
     */
    contentType: number
    /*
     * 作者外部主页
     */
    website: string
  }
}
/**
 * 接口 [删除作者↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215740463)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/内容管理/作者管理/删除作者`
 * @请求头 `POST /admin/contentMgmt/author/deleteAuthor`
 * @更新时间 `2024-09-16T14:23:28.000Z`
 */

export interface DeleteAuthorTypings {
  Request: null
  /*
   * 删除后的主键id
   */
  Response: number
}
/**
 * 接口 [更新作者状态↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215740509)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/内容管理/作者管理/更新作者状态`
 * @请求头 `POST /admin/contentMgmt/author/updateAuthorStatus`
 * @更新时间 `2024-09-16T14:23:34.000Z`
 */

export interface UpdateAuthorStatusTypings {
  Request: null
  /*
   * 主键id
   */
  Response: number
}
