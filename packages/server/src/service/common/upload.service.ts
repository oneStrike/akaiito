import { Config, Provide } from '@midwayjs/core'
import { UploadStreamFieldInfo, UploadStreamFileInfo } from '@midwayjs/busboy'
import { join } from 'path'
import { utils } from '@/utils'
import { ensureDirSync } from 'fs-extra'
import { createWriteStream } from 'node:fs'

@Provide()
export class UploadService {
  @Config('staticFile.dirs.default.dir')
  pathPrefix: string

  async parseFilePath(fields: AsyncGenerator<UploadStreamFieldInfo>): Promise<string> {
    const field: IterateObject = {}
    let relativePath = ''
    for await (const { name, value } of fields) {
      field[name] = value
    }
    const { workType, workId, chapterId } = field
    if (workType && workId && chapterId) {
      relativePath = `/files/${workType}/${workId}/${chapterId}/`
    } else {
      relativePath = `/files/other/${utils.dayjs().format('YYYYMMDD')}/`
    }
    ensureDirSync(this.pathPrefix + relativePath)
    return relativePath
  }


  async local(files: AsyncGenerator<UploadStreamFileInfo>, fields: AsyncGenerator<UploadStreamFieldInfo>) {
    const reportData = []
    // const relativePath = await this.parseFilePath(fields)
    let relativePath = `/files/other/${utils.dayjs().format('YYYYMMDD')}/`
    ensureDirSync(this.pathPrefix + relativePath)
    for await (const { filename, data, mimeType } of files) {
      const p = join(this.pathPrefix + relativePath, filename)
      const stream = createWriteStream(p)
      data.pipe(stream)
      reportData.push({
        fileName: filename,
        filePath: relativePath + filename,
        mimeType,
      })
    }
    return reportData
  }
}
