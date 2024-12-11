import { Config, Provide } from '@midwayjs/core'
import { UploadStreamFieldInfo, UploadStreamFileInfo } from '@midwayjs/busboy'
import { staticFileConfig } from '@/config/modules/staticFile'
import { join } from 'path'
import { utils } from '@/utils'
import { ensureDirSync } from 'fs-extra'
import { createWriteStream } from 'node:fs'

@Provide()
export class UploadService {
  @Config('staticFile')
  staticFileConfig: typeof staticFileConfig

  async parseFilePath(fields: AsyncGenerator<UploadStreamFieldInfo>): Promise<{
    relativePath: string,
    absolutePath: string
  }> {
    const field: IterateObject = {}
    let relativePath = ''
    let absolutePath = this.staticFileConfig.dirs.default.dir
    for await (const { name, value } of fields) {
      field[name] = value
    }
    const { workType, workId, chapterId } = field
    if (workType && workId && chapterId) {
      relativePath = `/files/${workType}/${workId}/${chapterId}/`
    } else {
      relativePath = `/files/other/${utils.dayjs().format('YYYYMMDD')}/`
    }
    ensureDirSync(absolutePath + relativePath)
    return {
      relativePath, absolutePath,
    }
  }


  async local(files: AsyncGenerator<UploadStreamFileInfo>, fields: AsyncGenerator<UploadStreamFieldInfo>) {
    const reportData = []
    // const { absolutePath, relativePath } = await this.parseFilePath(fields)
    let relativePath = `/files/other/${utils.dayjs().format('YYYYMMDD')}/`
    let absolutePath = this.staticFileConfig.dirs.default.dir
    ensureDirSync(absolutePath + relativePath)
    for await (const { filename, data, mimeType } of files) {
      const p = join(absolutePath + relativePath, filename)
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
