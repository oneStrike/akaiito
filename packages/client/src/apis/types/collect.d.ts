/**
 *  接口 [漫画](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229461578)
 *  @标签 书架/漫画
 *  @方式 GET
 *  @地址 /api/v3/member/collect/comics
 *  @更新时间 2024-11-03 00:27:03
 */

export interface CollectComicsTypesReq {}

/*  */
export type CollectComicsTypesRes = any

/**
 *  接口 [小说](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229461584)
 *  @标签 书架/小说
 *  @方式 GET
 *  @地址 /api/v3/member/collect/books
 *  @更新时间 2024-11-06 21:12:21
 */

export interface CollectBooksTypesReq {
  /* 排序,-datetime_modifier添加事件、-datetime_updated更新时间、-datetime_browse阅读时间 */
  ordering?: string
}

/*  */
export type CollectBooksTypesRes = any

/**
 *  接口 [写真](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229461587)
 *  @标签 书架/写真
 *  @方式 GET
 *  @地址 /api/v3/member/collect/posts
 *  @更新时间 2024-11-03 00:26:30
 */

export interface CollectPostsTypesReq {}

/*  */
export type CollectPostsTypesRes = any

/**
 *  接口 [添加或移除书架](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-230880795)
 *  @标签 作品/添加或移除书架
 *  @方式 POST
 *  @地址 /api/v3/member/collect/comic
 *  @更新时间 2024-11-06 21:05:15
 */

export interface CollectComicTypesReq {}

/*  */
export type CollectComicTypesRes = any
