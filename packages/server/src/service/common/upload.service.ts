import { Config, Provide, Inject } from '@midwayjs/core'
import { UploadFileInfo } from '@midwayjs/busboy'
import { utils } from '@/utils'
import { FileService } from '@/basic/service/file.service'

@Provide()
export class UploadService {
  @Config('staticFile.dirs.default.dir')
  pathPrefix: string

  @Inject()
  fileService: FileService

  async local(files: Array<UploadFileInfo>, fields: IterateObject) {
    const reportData = []
    let relativePath = `/files/other/${utils.dayjs().format('YYYYMMDD')}/${
      fields.scenario || 'shared'
    }/`
    for (const file of files) {
      reportData.push({
        fileName: file.filename,
        filePath: await this.fileService.moveLocalFile(file.data, relativePath),
        mimeType: file.mimeType,
      })
    }
    return reportData
  }
}
