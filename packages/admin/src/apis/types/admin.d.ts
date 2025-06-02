/**
 *  接口 [获取Admin专用RSA公钥](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303281293)
 *  @标签 管理端认证模块/获取Admin专用RSA公钥
 *  @方式 GET
 *  @地址 /api/admin/auth/admin/publicKey
 *  @更新时间 2025-06-02 01:14:15
 */

/*  */
export type PublicKeyTypesRes = {
  /* RSA公钥 */
  publicKey: string
}
