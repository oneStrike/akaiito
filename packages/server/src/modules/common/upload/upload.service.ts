import { Config, Inject, Provide } from '@midwayjs/core'
import { ConfigService } from '../../../service/config.service'
import * as qiniu from 'qiniu'
import { IUploadConfig } from '../../../types/service/config'
import { IUploadFile } from '../../../types/service/upload'
import { BaseService } from '../../../shared/service/base.service'
import { BaseMapping } from '../../../shared/mapping/base.mapping'

@Provide()
export class UploadService extends BaseService {
  private qiniuReturnBody = '{"url":"$(key)","size":$(fsize),"hash":"$(etag)"}'

  @Config('upload')
  uploadConfig: IUploadConfig

  @Inject()
  configService: ConfigService

  protected mapping: BaseMapping

  /**
   * 静态资源的存储方式
   */
  async publicFileStorageMethod(files: IUploadFile[], fields) {
    if (!fields.fileType) {
      for await (const file of files) {
        await this.utils.fs.remove(file.data)
      }
      return this.normalError('文件未分类')
    }
    return await this.putPolicy(files, fields)
  }

  async putPolicy(files: IUploadFile[], fields: Record<string, any>) {
    if (!files.length) return []
    const { use, qiniu } = this.uploadConfig
    switch (use) {
      case 'qiniu':
        return await this.qiniuPutPolicy(qiniu, files)
      case 'local':
        return await this.formatLocal(files, fields)
    }
  }

  async formatLocal(files: IUploadFile[], fields: Record<string, any>) {
    const { tmpdir } = this.uploadConfig
    const storagePath = tmpdir + '/' + fields.fileType
    await this.utils.fs.ensureDir(storagePath)
    const result = []
    for await (const file of files) {
      const separator = file.data.includes('\\') ? '\\' : '/'
      const filePathArr = file.data.split(separator)
      const fileName = filePathArr[filePathArr.length - 1]
      await this.utils.fs.move(file.data, storagePath + '/' + fileName)
      result.push({
        filename: file.filename,
        path: fields.fileType + '/' + fileName,
        mimeType: file.mimeType,
        _ext: file._ext
      })
    }
    return result
  }

  /**
   * 七牛存储
   * @param qiniuAuthParams
   * @param files
   * @param flag
   */
  async qiniuPutPolicy(
    qiniuAuthParams: IUploadConfig['qiniu'],
    files: IUploadFile[]
  ) {
    const { accessKey, secretKey, scope, expires } = qiniuAuthParams
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const config = new qiniu.conf.Config({ zone: qiniu.zone.Zone_z2 })
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    const fileCount = files.length
    let uploadCount = 0
    return new Promise((resolve, reject) => {
      for (let i = 0; i < files.length; i++) {
        const item = files[i]
        const fileName = `${this.utils
          .dayjs()
          .format('YYYY-MM-DD')}_${this.utils.dayjs().valueOf()}_${
          item.filename
        }`
        const options = {
          scope: scope,
          expires,
          returnBody: this.qiniuReturnBody
        }
        const key = fileName
        const localFile = item.data
        const putPolicy = new qiniu.rs.PutPolicy(options)
        const uploadToken = putPolicy.uploadToken(mac)
        formUploader.putFile(
          uploadToken,
          key,
          localFile,
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respInfo.statusCode !== 200) {
              reject('上传失败')
            }
            uploadCount++
            if (uploadCount === fileCount) resolve([respBody])
          }
        )
      }
    })
  }
}
