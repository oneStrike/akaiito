export interface EsUploadProps {
  modelValue?: any[] | string
  /* 上传数量限制 */
  limit?: number
  /* 文件类型  图片  视频  录音  手动选择 */
  accept?: 'image' | 'video' | 'recording' | 'choice'
}
