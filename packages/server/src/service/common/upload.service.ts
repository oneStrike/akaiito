import { Config, Provide } from '@midwayjs/core'
import { UploadStreamFieldInfo, UploadStreamFileInfo } from '@midwayjs/busboy'
import { staticFileConfig } from '@/config/modules/staticFile'
import { join } from 'path'
import { utils } from '@/utils'
import { createWriteStream } from 'node:fs'
import { ensureDirSync } from 'fs-extra'

@Provide()
export class UploadService {
  @Config('projectConfig')
  projectConfig

  @Config('staticFile')
  staticFileConfig: typeof staticFileConfig

  async local(files: AsyncGenerator<UploadStreamFileInfo>, fields: AsyncGenerator<UploadStreamFieldInfo>) {
    // TODO 必须先执行files，否则接口无响应，等官方修复
    const fileList = []
    for await (const file of files) {
      fileList.push(file)
    }
    const contentFile: IterateObject = {}
    for await (const { name, value } of fields) {
      contentFile[name] = value
    }
    let absolutePath = this.staticFileConfig.dirs.default.dir
    let relativePath = ''

    const { workType, workId, chapterId } = contentFile
    if (workType && workId && chapterId) {
      relativePath = `/${workType}/${workId}/${chapterId}/`
    } else {
      relativePath = `/files/${utils.dayjs().format('YYYYMMDD')}`
    }

    const reportData = []
    fileList.forEach((item) => {
      const { filename, data, mimeType } = item
      ensureDirSync(absolutePath + relativePath)
      const p = join(absolutePath + relativePath, filename)
      const stream = createWriteStream(p)
      data.pipe(stream)
      reportData.push({
        fileName: filename,
        filePath: relativePath + filename,
        mimeType,
      })
    })
    return reportData
  }
}
