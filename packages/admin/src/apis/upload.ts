import { httpHandler } from '@/utils/request'
import type { UploadFileTypesRes, UploadFileTypesReq } from './types/upload.d'

/**
 *  接口 [上传文件](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-308183559)
 *  @标签 管理端文件上传/上传文件
 *  @方式 POST
 *  @地址 /api/admin/upload/uploadFile
 *  @更新时间 2025-06-21 01:38:08
 */

export const uploadFileApi = (data: UploadFileTypesReq): Promise<UploadFileTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/upload/uploadFile',
    headers: {},
    data,
  })
}
