/**
 *  接口 [用户信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229460675)
 *  @标签 用户/用户信息
 *  @方式 GET
 *  @地址 /api/v3/member/info
 *  @更新时间 2024-11-02 23:47:10
 */

export interface MemberInfoTypesReq {}

/*  */
export type MemberInfoTypesRes = any

/**
 *  接口 [评论](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-230881793)
 *  @标签 作品/评论
 *  @方式 POST
 *  @地址 /api/v3/member/comment
 *  @更新时间 2024-11-06 21:18:40
 */

export interface MemberCommentTypesReq {
  /* 漫画id */
  comic_id?: string

  /* 评论内容 */
  comment?: string

  /* 回复评论的id */
  reply_id?: string
}

/*  */
export type MemberCommentTypesRes = any
