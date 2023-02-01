//上传配置
import { UploadOptions } from '@midwayjs/upload'

export type TStorageType = 'local' | 'qiniu' | 'oss' | 'cos' | 'azure'

export interface IQiniuAuthParams {
  accessKey: string
  secretKey: string
  scope: string
  expires: number
}

export interface IUploadConfig extends UploadOptions {
  use: TStorageType
  qiniu: IQiniuAuthParams
}
