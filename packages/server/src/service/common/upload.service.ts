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
    if (fields.scenario) {
      let relativePath = `/files/other/${utils.dayjs().format('YYYYMMDD')}/${
        fields.scenario || 'shared'
      }/`

      for (const file of files) {
        const tempPath = file.data // 假设文件先保存到临时路径
        const destPath = this.pathPrefix + relativePath

        try {
          await this.fileService.moveLocalFile(tempPath, destPath)
          reportData.push({
            fileName: file.filename,
            filePath: destPath,
            mimeType: file.mimeType,
          })
        } catch (err) {
          console.error(`Error moving file: ${err}`)
        }
      }
    }

    return reportData
  }
}
