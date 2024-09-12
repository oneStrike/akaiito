/**
 * 接口 [创建作者↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-214490409)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/内容管理/作者管理/创建作者`
 * @请求头 `POST /admin/author/createAuthor`
 * @更新时间 `2024-09-11T16:15:31.000Z`
 */

export interface CreateAuthorTypings {
  Request: {
    /*
     * 作者姓名
     */
    name: string
    /*
     * 作者头像
     */
    avatar: string
    /*
     * 作者描述信息
     */
    description: string
    /*
     * 应用状态，1启用、0禁用
     */
    status: number
    /*
     * 作者外部主页
     */
    website?: string
    /*
     * 作者内容类型 1==>小说 2==>漫画 3==>图片 4==>视频
     */
    contentType: number
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [更新作者信息↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-214498981)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/内容管理/作者管理/更新作者信息`
 * @请求头 `POST /admin/author/updateAuthor`
 * @更新时间 `2024-09-11T16:17:55.000Z`
 */

export interface UpdateAuthorTypings {
  Request: {
    /*
     * 主键id
     */
    id: number
    /*
     * 作者姓名
     */
    name: string
    /*
     * 作者头像
     */
    avatar: string
    /*
     * 作者描述信息
     */
    description: string
    /*
     * 应用状态，1启用、0禁用
     */
    status: number
    /*
     * 者内容类型 1==>小说 2==>漫画 3==>图片 4==>视频
     */
    contentType: number
    /*
     * 作者外部主页
     */
    website: string
  }

  Response: {
    /*
     * 主键id
     */
    id: number
    /*
     * 应用状态，1启用、0禁用
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
    /*
     * 创建时间
     */
    createdAt: string
    /*
     * 更新时间
     */
    updatedAt: string
  }
}
/**
 * 接口 [获取作者分页列表↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-214499049)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/内容管理/作者管理/获取作者分页列表`
 * @请求头 `GET /admin/author/getAuthorPage`
 * @更新时间 `2024-09-11T16:25:55.000Z`
 */

export interface GetAuthorPageTypings {
  Request: {
    /*
     * 页码
     */
    pageIndex?: string
    /*
     * 单页大小
     */
    pageSize?: string
    /*
     * 作者姓名
     */
    name?: string
    /*
     * 状态 1：正常 0：禁用
     */
    status?: string
    /*
     * 作者内容类型 1==>小说 2==>漫画 3==>图片 4==>视频
     */
    contentType?: string
  }

  Response: {
    /*
     * 主键id
     */
    id: number
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
     * 应用状态，1启用、0禁用
     */
    status: number
    /*
     * 作者主页
     */
    website: string
    /*
     * 作者内容类型 1==>小说 2==>漫画 3==>图片 4==>视频
     */
    contentType: string
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
