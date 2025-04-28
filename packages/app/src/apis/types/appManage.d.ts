/**
 *  接口 [系统配置](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199830259)
 *  @标签 系统/系统配置
 *  @方式 GET
 *  @地址 /app/appManage/getSystemConfig
 *  @更新时间 2024-11-28 15:00:08
 */

export interface GetSystemConfigTypesReq {}

export interface GetSystemConfigTypesRes {
  /* 客户端名称 */
  clientName: string

  /* 客户端logo */
  logo: string
}

/**
 *  接口 [获取页面配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234300560)
 *  @标签 系统/获取页面配置信息
 *  @方式 GET
 *  @地址 /app/appManage/getPageConfig
 *  @更新时间 2025-04-28 20:21:44
 */

export interface GetPageConfigTypesReq {}

/*  */
export type GetPageConfigTypesRes = {
  /* 主键id */
  id: number

  /* 页面名称 */
  pageName: string

  /* 页面编码 */
  pageCode: string

  /* 页面地址 */
  pagePath: string

  /* 页面鉴权 1普通2登录3会员 */
  pageRule: number

  /* 页面状态 0禁用 1启用 2开发 3维护 */
  status: number

  /* 页面描述信息 */
  description: string

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}[]

/**
 *  接口 [通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234300567)
 *  @标签 系统/通知公告
 *  @方式 GET
 *  @地址 /app/appManage/getNotice
 *  @更新时间 2024-11-27 22:46:26
 */

export interface GetNoticeTypesReq {}

export interface GetNoticeTypesRes {
  /* 主键id */
  id: number

  /* 标题 */
  title: string

  /* 通知内容 */
  content: string

  /* 开始时间 */
  startTime: string | null

  /* 结束时间 */
  endTime: string | null

  /* 弹窗的背景图片 */
  backgroundImage: string

  /* 是否发布  1发布 0取消发布 */
  isPublish: boolean

  /* 是否在小程序平台启用  1启用 0禁用 */
  enableApplet: boolean

  /* 是否在H5平台启用  1启用 0禁用 */
  enableWeb: boolean

  /* 是否在APP平台启用  1启用 0禁用 */
  enableApp: boolean

  /* 跳转的页面编码 */
  pageCode: string

  /* 跳转的页面名字 */
  pageName: string

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}
