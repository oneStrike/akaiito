import { httpHandler } from '@/utils/request'
import type { FileTypesRes, FileTypesReq } from './types/upload.d'

/**
 *  接口 [上传文件](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-305736608)
 *  @标签 管理端文件上传/上传文件
 *  @方式 POST
 *  @地址 /api/admin/upload/file
 *  @更新时间 2025-06-08 21:32:41
 */

export const fileApi = (data: FileTypesReq): Promise<FileTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/upload/file',
    headers: {},
    data,
  })
}
