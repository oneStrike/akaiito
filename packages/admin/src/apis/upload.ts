import { httpHandler } from '@/utils/request'
import type { UploadFileResponse, UploadFileRequest } from './types/upload.d'

/**
 *  接口 [上传文件](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080032)
 *  @标签 管理端文件上传/上传文件
 *  @方式 POST
 *  @地址 /api/admin/upload/upload-file
 *  @更新时间 2025-06-25 11:22:00
 */

export const uploadFileApi = (data: UploadFileRequest): Promise<UploadFileResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/upload/upload-file',
    headers: {},
    data,
  })
}
