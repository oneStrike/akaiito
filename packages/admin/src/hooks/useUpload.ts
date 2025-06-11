import type { UploadFiles } from 'element-plus'
import type { FileTypesRes } from '@/apis/types/upload'
import { useMessage } from '@/hooks/useFeedback'
import { httpHandler } from '@/utils/request'

type files = string | Blob
type UploadFileRes = FileTypesRes
const api = {
  common: '/api/admin/upload/uploadFile',
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
    const formData = new FormData()
    const errorFile: (typeof target)[number][] = []

    // 将所有文件添加到 FormData
    target.forEach((item, index) => {
      // @ts-expect-error ignore
      const file = item?.raw ?? item
      formData.append(`files[${index}]`, file)
    })

    // 添加额外参数
    for (const paramsKey in params) {
      formData.append(paramsKey, params[paramsKey])
    }

    httpHandler({
      method: 'post',
      url: api[contentType],
      data: formData,
      errorMessage: false,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      },
    })
      .then((res) => {
        const result = res as any
        useMessage.success('上传成功')
        resolve({
          success: result,
          error: errorFile,
        })
      })
      .catch(() => {
        useMessage.error('上传失败')
        resolve({
          success: [],
          error: target,
        })
      })
  })
}
