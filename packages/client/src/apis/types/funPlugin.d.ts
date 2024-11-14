/**
 *  接口 [获取功能插件列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-180027519)
 *  @标签 客户端/功能插件/获取功能插件列表
 *  @方式 GET
 *  @地址 /client/funPlugin/getFunPlugin
 *  @更新时间 2024-06-04 21:50:18
 */

export interface GetFunPluginTypesReq {
  /* 插件名称 */
  name?: string

  /* 插件类型，1==>小说 2==>漫画 3==>图片 4==>视频 */
  type?: number

  /* 状态1==>启用  0==>禁用 */
  status?: number

  /* 是否免费使用，1==>收费  0==>免费 */
  isFree?: number
}

export interface GetFunPluginTypesRes {
  list: {
    /* 插件名称 */
    name: string

    /* 插件图标 */
    avatar: string

    /* 插件类型，1==>小说 2==>漫画 3==>图片 4==>视频 */
    type: number

    /* 插件描述信息 */
    desc: string

    /* 下载次数 */
    downloadCount: number

    /* 已购买人数 */
    purchaseCount: number

    /* 价格 */
    price: string

    /* 数据源地址 */
    sourceUrl: string

    /* 是否推荐，1==>推荐 0==>不推荐 */
    isRecommend: number

    /* 插件的js文件压缩包 */
    pluginFile: string

    /* 插件版本 */
    version: string

    /* 是否免费使用，1==>免费 0==>收费 */
    isFree: number

    /* 数据源名称 */
    sourceName: string
  }[]
  /* 页码 */
  pageIndex: number

  /* 单页大小 */
  pageSize: number

  /* 总条数 */
  total: number
}

/**
 *  接口 [获取功能插件详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-197036146)
 *  @标签 客户端/功能插件/获取功能插件详情
 *  @方式 GET
 *  @地址 /client/funPlugin/getFunPluginDetail
 *  @更新时间 2024-07-23 21:14:05
 */

export interface GetFunPluginDetailTypesReq {
  /* 主键id */
  id: string
}

export interface GetFunPluginDetailTypesRes {
  /* 插件名称 */
  name: string

  /* 插件图标 */
  avatar: string

  /* 插件类型，1==>小说 2==>漫画 3==>图片 4==>视频 */
  type: number

  /* 插件描述信息 */
  desc: string

  /* 下载次数 */
  downloadCount: number

  /* 已购买人数 */
  purchaseCount: number

  /* 价格 */
  price: string

  /* 数据源名称 */
  sourceName: string

  /* 数据源地址 */
  sourceUrl: string

  /* 是否免费使用，1==>免费  0==>收费 */
  isFree: number

  /* 是否推荐，1==>推荐  0==>不推荐 */
  isRecommend: number

  /* 插件的js文件压缩包 */
  pluginFile: string

  /* 插件版本 */
  version: string
}
