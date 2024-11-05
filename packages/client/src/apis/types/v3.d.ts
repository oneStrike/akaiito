/**
 *  接口 [注册](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229394123)
 *  @标签 用户/注册
 *  @方式 POST
 *  @地址 /api/v3/register
 *  @更新时间 2024-11-02 11:44:35
 */

export interface V3registerTypesReq {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string
}

/*  */
export type V3registerTypesRes = any

/**
 *  接口 [登录](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229415236)
 *  @标签 用户/登录
 *  @方式 POST
 *  @地址 /api/v3/login
 *  @更新时间 2024-11-02 15:34:19
 */

export interface V3loginTypesReq {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 加密盐 */
  salt: string
}

/*  */
export type V3loginTypesRes = any

/**
 *  接口 [获取作品评论](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229938929)
 *  @标签 作品/获取作品评论
 *  @方式 GET
 *  @地址 /api/v3/comments
 *  @更新时间 2024-11-05 09:26:27
 */

export interface V3commentsTypesReq {
  /* 漫画id */
  comic_id?: string

  /* 评论id */
  reply_id?: string

  /* 单页数量 */
  limit?: string

  /* 页码 */
  offset?: string
}

/*  */
export type V3commentsTypesRes = any

/**
 *  接口 [获取某一话评论](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229940124)
 *  @标签 作品/获取某一话评论
 *  @方式 GET
 *  @地址 /api/v3/roasts
 *  @更新时间 2024-11-05 09:26:28
 */

export interface V3roastsTypesReq {
  /* 章节id */
  chapter_id?: string

  /* 单页数量 */
  limit?: string

  /* 页码 */
  offset?: string
}

/*  */
export type V3roastsTypesRes = any
