/**
 * 接口 [上传文件↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-145430238)
 * @标签 `common/上传文件`
 * @请求头 `POST /common/upload/uploadFile`
 * @更新时间 `2024-01-30T15:37:25.000Z`
 */

export interface UploadFileTypings {
  Request: {
    /*
     * 上传的文件
     */
    file: string
    /*
     * 使用场景，adminUserAvatar管理员头像，adminResourceLibrary管理端资源库，userAvatar客户端用户头像，shared杂项
     */
    scenario: string
  }

  Response: {
    /*
     * 文件名称
     */
    fileName: string
    /*
     * 文件路径
     */
    filePath: string
    /*
     * mimeType
     */
    mimeType: string
  }[]
}
