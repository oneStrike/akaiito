/**
 * 接口 [获取分类列表↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215788540)
 * @标签 `管理端/用户/数据字典/系统/运营管理/功能插件/客户端管理/内容管理/作者管理/分类管理/获取分类列表`
 * @请求头 `GET /admin/contentMgmt/category/getCategoryList`
 * @更新时间 `2024-09-17T14:38:02.000Z`
 */

export interface GetCategoryListTypings {
  Request: {
    /*
     * 分类名称
     */
    name?: string
    /*
     * 状态 1：正常 0：禁用
     */
    status?: string
    /*
     * 内容类型 1==>小说 2==>漫画 3==>图片
     */
    contentModel?: string
  }

  Response: null
}
