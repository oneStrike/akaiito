/**
 *  接口 [上传文件](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-305736608)
 *  @标签 管理端文件上传/上传文件
 *  @方式 POST
 *  @地址 /api/admin/upload/file
 *  @更新时间 2025-06-08 21:32:41
 */

/*  */
export type FileTypesRes = {
  /* 文件名 */
  filename: string

  /* 文件路径 */
  filePath: string

  /* 文件场景 */
  scene: string

  /* 文件大小 */
  fileSize: number

  /* 文件类型mimeType */
  mimeType: string

  /* 文件类型 */
  fileType: string

  /* 原始文件名 */
  originalName: string

  /* 上传时间 */
  uploadTime: string
}[]
