import { httpHandler } from '@/utils/request'
import type { UploadFileTypesRes, UploadFileTypesReq } from './types/upload.d'

/**
 *  接口 [上传文件](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-145430238)
 *  @标签 common/上传文件
 *  @方式 POST
 *  @地址 /common/upload/uploadFile
 *  @更新时间 2025-04-27 22:17:14
 */

export const uploadFileApi = (data: UploadFileTypesReq): Promise<UploadFileTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/common/upload/uploadFile',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
}
