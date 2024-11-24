/**
 *  接口 [上传文件](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-145430238)
 *  @标签 common/上传文件
 *  @方式 POST
 *  @地址 /common/upload/uploadFile
 *  @更新时间 2024-01-30 23:37:25
 */

export interface UploadFileTypesReq {}

/*  */
export type UploadFileTypesRes = {
  /* 文件名称 */
  fileName: string

  /* 文件路径 */
  filePath: string

  /* mimeType */
  mimeType: string
}[]
