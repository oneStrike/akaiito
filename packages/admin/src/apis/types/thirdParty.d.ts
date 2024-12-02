/**
 *  接口 [获取可用服务商](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-232272788)
 *  @标签 解析三方平台数据/获取可用服务商
 *  @方式 GET
 *  @地址 /admin/thirdParty/service
 *  @更新时间 2024-11-11 16:14:51
 */

export interface ServiceTypesReq {}

/*  */
export type ServiceTypesRes = {
  /* 服务商 */
  name: string

  /* 服务商code */
  code: string
}[]

/**
 *  接口 [搜索三方库作品](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231962478)
 *  @标签 解析三方平台数据/搜索三方库作品
 *  @方式 GET
 *  @地址 /admin/thirdParty/searchWord
 *  @更新时间 2024-11-11 16:06:43
 */

export interface SearchWordTypesReq {
  /* 作品名字 */
  keyword?: string

  /* 应用的解析服务 */
  service?: string
}

/*  */
export type SearchWordTypesRes = {
  /* 作品id */
  id: string

  /* 作品名字 */
  name: string

  /* 作品封面 */
  cover: string
  author: {
    /* 作者姓名 */
    name: string

    /* 作者id */
    id: string
  }[]
}[]

/**
 *  接口 [解析三方库作品](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-232205293)
 *  @标签 解析三方平台数据/解析三方库作品
 *  @方式 POST
 *  @地址 /admin/thirdParty/parseWord
 *  @更新时间 2024-11-11 16:08:17
 */

export interface ParseWordTypesReq {
  /* 作品id */
  id: string

  /* 应用的解析服务 */
  service: string
}

/*  */
export type ParseWordTypesRes = any
