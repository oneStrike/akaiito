import { httpClient } from '@/utils/request'
import type { UploadFileTypings } from './upload.d'

export const uploadFileApi = (
  data: UploadFileTypings['Request']
): Promise<UploadFileTypings['Response']> => {
  return httpClient({
    method: 'post',
    url: '/common/upload/uploadFile',
    data
  })
}
