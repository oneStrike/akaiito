/**
 *  接口 [系统配置](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199830259)
 *  @标签 系统/系统配置
 *  @方式 GET
 *  @地址 /app/appManage/getAppSystemConfig
 *  @更新时间 2024-11-24 12:53:14
 */

export interface GetAppSystemConfigTypesReq {}

export interface GetAppSystemConfigTypesRes {
  /* 客户端名称 */
  appName: string

  /* 客户端logo */
  logo: string
}

/**
 *  接口 [获取页面配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234300560)
 *  @标签 系统/获取页面配置信息
 *  @方式 GET
 *  @地址 /app/appManage/getPageConfig
 *  @更新时间 2024-11-24 12:53:24
 */

export interface GetPageConfigTypesReq {}

export interface GetPageConfigTypesRes {
  list: {
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
  /* 页码 */
  pageIndex: number

  /* 单页大小 */
  pageSize: number

  /* 总条数 */
  total: number
}

/**
 *  接口 [通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234300567)
 *  @标签 系统/通知公告
 *  @方式 GET
 *  @地址 /app/appManage/getNotification
 *  @更新时间 2024-11-24 12:53:32
 */

export interface GetNotificationTypesReq {}

export interface GetNotificationTypesRes {
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

  /* 是否在小程序平台启用  1启用 0禁用 */
  enableApplet: number

  /* 是否在H5平台启用  1启用 0禁用 */
  enableWeb: number

  /* 是否在APP平台启用  1启用 0禁用 */
  enableApp: number

  /* 跳转的页面编码 */
  pageCode: string

  /* 跳转的页面名字 */
  pageName: string

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}
