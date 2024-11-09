/**
 *  接口 [系统管理](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-199830259)
 *  @标签 /系统管理
 *  @方式 GET
 *  @地址 /client/clientManage/getClientSystemConfig
 *  @更新时间 2024-07-31 21:39:15
 */

export interface ClientManageGetClientSystemConfigTypesReq {}

export interface ClientManageGetClientSystemConfigTypesRes {
  /* 客户端名称 */
  clientName: string

  /* 客户端logo */
  logo: string
}
