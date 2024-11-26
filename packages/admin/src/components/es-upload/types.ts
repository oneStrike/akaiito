import type { UploadFileTypesRes } from '@/apis/types/upload'
import type { UploadProps, UploadUserFile } from 'element-plus'

export interface EsUploadProps {
  modelValue?: UploadFileTypesRes | UploadUserFile[] | string | string[]
  fileType?: 'image' | 'video' | 'audio' | 'compressed'
  listType?: UploadProps['listType']
  multiple?: UploadProps['multiple']
  scenario?: string
  maxCount?: number
  maxSize?: number
  assetLibrary?: boolean
  structure?: 'string' | 'object' | 'field'
}
