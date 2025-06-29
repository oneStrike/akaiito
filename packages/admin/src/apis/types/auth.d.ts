/**
 *  接口 [获取Admin专用RSA公钥](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090627)
 *  @标签 管理端认证模块/获取Admin专用RSA公钥
 *  @方式 GET
 *  @地址 /api/admin/auth/public-key
 *  @更新时间 2025-06-30 00:37:37
 */

/*  */
export type PublicKeyResponse = {
  /* RSA公钥 */
  publicKey: string

  /** 任意合法数值 */
  [property: string]: any
}
