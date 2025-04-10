/**
 *  接口 [获取漫画内容分页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243053782)
 *  @标签 内容/获取漫画内容分页
 *  @方式 GET
 *  @地址 /admin/comic/content/getComicContentPage
 *  @更新时间 2024-12-16 09:44:28
 */

export interface GetComicContentPageTypesReq {
  /* 章节id */
  chapterId?: number
}

export interface GetComicContentPageTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 图片链接 */
    url: string

    /* 排序 */
    order: number

    /* 对应的章节id */
    chapterId: number
  }[]
  /* 页码 */
  pageIndex: number

  /* 单页大小 */
  pageSize: number

  /* 总条数 */
  total: number
}

/**
 *  接口 [创建漫画内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243052051)
 *  @标签 内容/创建漫画内容
 *  @方式 POST
 *  @地址 /admin/comic/content/createComicContent
 *  @更新时间 2024-12-11 17:16:06
 */

export interface CreateComicContentTypesReq {
  /* 图片链接 */
  url: string

  /* 对应的章节id */
  chapterId: number
}

export interface CreateComicContentTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [删除漫画内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243052599)
 *  @标签 内容/删除漫画内容
 *  @方式 POST
 *  @地址 /admin/comic/content/deleteComicContent
 *  @更新时间 2024-12-11 09:34:19
 */

export interface DeleteComicContentTypesReq {
  /* 主键id */
  id: number
}

export interface DeleteComicContentTypesRes {
  /* 主键id */
  id: string
}

/**
 *  接口 [漫画内容排序](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243053439)
 *  @标签 内容/漫画内容排序
 *  @方式 POST
 *  @地址 /admin/comic/content/orderComicContentPage
 *  @更新时间 2024-12-11 09:35:16
 */

export interface OrderComicContentPageTypesReq {
  /* 目标id */
  targetId: number

  /* 目标现有排序 */
  targetOrder: number

  /* 更新源id */
  originId: number

  /* 更新源现有排序 */
  originOrder: number
}

export interface OrderComicContentPageTypesRes {
  /* 主键id */
  id: string
}

/**
 *  接口 [清空章节内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243396531)
 *  @标签 内容/清空章节内容
 *  @方式 POST
 *  @地址 /admin/comic/content/removeComicContent
 *  @更新时间 2024-12-16 09:47:07
 */

export interface RemoveComicContentTypesReq {
  /* 章节的主键id */
  chapterId: number
}

/*  */
export type RemoveComicContentTypesRes = any
