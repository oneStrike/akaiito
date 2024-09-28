/**
 *  接口 [获取分类列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215788540)
 *  @标签 分类管理/获取分类列表
 *  @方式 GET
 *  @地址 /admin/contentMgmt/category/getCategoryList
 *  @更新时间 2024-09-17 22:38:02
 */

export interface GetCategoryListTypesReq {
  /* 分类名称 */
  name?: string

  /* 状态 1：正常 0：禁用 */
  status?: string

  /* 内容类型 1==>小说 2==>漫画 3==>图片 */
  contentModel?: string
}

/*  */
export type GetCategoryListTypesRes = undefined
