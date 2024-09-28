/**
 *  接口 [获取客户端系统配置信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199384357)
 *  @标签 客户端管理/获取客户端系统配置信息
 *  @方式 GET
 *  @地址 /admin/clientManage/getClientSystemConfig
 *  @更新时间 2024-09-16 01:18:07
 */

export interface GetClientSystemConfigTypesReq {}

export interface GetClientSystemConfigTypesRes {
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
 *  @标签 客户端管理/更新客户端系统配置信息
 *  @方式 POST
 *  @地址 /admin/clientManage/updateClientSystemConfig
 *  @更新时间 2024-09-17 22:55:13
 */

export interface UpdateClientSystemConfigTypesReq {
  /* 客户端名称 */
  clientName: string

  /* 客户端logo图片
   */
  logo: string

  /* 客户端启用的内容模型 1==>小说 2==>漫画 3==>图片 */
  contentModel: string
}

/* 主键id */
export type UpdateClientSystemConfigTypesRes = number
