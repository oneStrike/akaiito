import { Config, Provide } from '@midwayjs/core'
import { UploadFileInfo } from '@midwayjs/busboy'
import { utils } from '@/utils'
import { ensureDirSync, move } from 'fs-extra'
import * as path from 'node:path'

@Provide()
export class UploadService {
  @Config('staticFile.dirs.default.dir')
  pathPrefix: string


  async local(files: Array<UploadFileInfo>, fields: IterateObject) {
    const reportData = []
    let relativePath = `/files/other/${utils.dayjs().format('YYYYMMDD')}/${fields.scenario || 'shared'}/`
    ensureDirSync(this.pathPrefix + relativePath)
    for (const file of files) {
      const uniqueName = `${path.basename(file.data)}`
      const tempPath = file.data // 假设文件先保存到临时路径
      const destPath = this.pathPrefix + relativePath + uniqueName

      try {
        await move(tempPath, destPath, { overwrite: true })
        reportData.push({ fileName: file.filename, filePath: destPath, mimeType: file.mimeType })
      } catch (err) {
        console.error(`Error moving file: ${err}`)
      }
    }

    return reportData
  }
}
