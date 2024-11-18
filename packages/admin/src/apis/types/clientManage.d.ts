/**
 *  接口 [获取客户端系统配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199384357)
 *  @标签 客户端管理/系统配置/获取客户端系统配置信息
 *  @方式 GET
 *  @地址 /admin/clientManage/getClientConfig
 *  @更新时间 2024-11-15 22:33:17
 */

export interface GetClientConfigTypesReq {}

export interface GetClientConfigTypesRes {
  /* 主键id */
  id: number

  /* 客户端名称 */
  clientName: string

  /* 客户端logo图片
   */
  logo: string

  /* 客户端启用的内容模型 1==>小说 2==>漫画 3==>图片 */
  contentModel: string
}

/**
 *  接口 [更新客户端系统配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199390132)
 *  @标签 客户端管理/系统配置/更新客户端系统配置信息
 *  @方式 POST
 *  @地址 /admin/clientManage/updateSystemConfig
 *  @更新时间 2024-11-15 22:33:18
 */

export interface UpdateSystemConfigTypesReq {
  /* 客户端名称 */
  clientName: string

  /* 客户端logo图片
   */
  logo: string

  /* 客户端启用的内容模型 1==>小说 2==>漫画 3==>图片 */
  contentModel: string
}

/* 主键id */
export type UpdateSystemConfigTypesRes = number
