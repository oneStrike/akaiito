import type { UploadFiles } from 'element-plus'
import type { UploadFileTypesRes } from '@/apis/types/upload'
import { useMessage } from '@/hooks/useFeedback'
import { useUserStore } from '@/stores/modules/user'
import { httpHandler } from '@/utils/request'

type files = string | Blob
type UploadFileRes = UploadFileTypesRes
const api = {
  common: '/common/upload/uploadFile',
  comic: '/admin/comic/chapter/createComicChapterContent',
}

export async function useUpload(
  files: UploadFiles | files | files[],
  params: IterateObject = {},
  contentType: keyof typeof api = 'common',
): Promise<{
  success: UploadFileRes | []
  error: any[]
}> {
  return new Promise((resolve) => {
    const target = Array.isArray(files) ? files : [files]
    const successFile: UploadFileRes = []
    const errorFile: (typeof target)[number][] = []
    target.forEach((item) => {
      const formData = new FormData()
      // @ts-expect-error ignore
      const file = item?.raw ?? item
      formData.append('file', file)
      for (const paramsKey in params) {
        console.log(params)
        formData.append(paramsKey, params[paramsKey])
      }
      formData.append('name', file.name)
      httpHandler({
        method: 'post',
        url: api[contentType],
        data: formData,
        errorMessage: false,
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8',
          'authorization': useUserStore().token.accessToken,
        },
      })
        .then((res) => {
          const result = res as UploadFileRes
          successFile.push(...result)
          if (successFile.length + errorFile.length === target.length) {
            if (successFile.length) {
              useMessage.success('上传成功')
              resolve({
                success: successFile,
                error: errorFile,
              })
            }
          }
        })
        .catch(() => {
          errorFile.push(item)
          // @ts-expect-error ignore
          useMessage.error(`【${item.name}】上传失败`)
          if (successFile.length + errorFile.length === target.length) {
            if (successFile.length) {
              useMessage.success('上传成功')
              resolve({
                success: successFile,
                error: errorFile,
              })
            }
          }
        })
    })
  })
}
