import { httpClient } from '@/utils/request'
import { useUserStore } from '@/stores/modules/user'
import type { UploadFiles } from 'element-plus'
import type { UploadFileTypings } from '@/apis/upload.d'
import { useMessage } from '@/hooks/useFeedback'

type files = string | Blob
export const useUpload = async (
  files: UploadFiles | files | files[],
  scenario: string
): Promise<{
  success: UploadFileTypings['Response'] | []
  error: any[]
}> => {
  return new Promise((resolve) => {
    const target = Array.isArray(files) ? files : [files]
    const successFile = []
    const errorFile = []
    target.forEach((item) => {
      const formData = new FormData()
      formData.append('file', item?.raw ?? item)
      formData.append('scenario', scenario)

      httpClient({
        method: 'post',
        url: '/common/upload/uploadFile',
        data: formData,
        errorMessage: false,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: useUserStore().token.accessToken
        }
      })
        .then((res: UploadFileTypings['Response']) => {
          successFile.push(...res)
          if (successFile.length + errorFile.length === target.length) {
            if (successFile.length) {
              useMessage.success('上传成功')
              resolve({
                success: successFile,
                error: errorFile
              })
            }
          }
        })
        .catch((err) => {
          errorFile.push(item)
          useMessage.error(`【${item.name}】上传失败`)
          if (successFile.length + errorFile.length === target.length) {
            if (successFile.length) {
              useMessage.success('上传成功')
              resolve({
                success: successFile,
                error: errorFile
              })
            }
          }
        })
    })
  })
}
