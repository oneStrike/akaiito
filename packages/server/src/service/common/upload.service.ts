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

  async local(files: AsyncGenerator<UploadStreamFileInfo>, fields: AsyncGenerator<UploadStreamFieldInfo>) {
    const reportData = []
    let absolutePath = this.staticFileConfig.dirs.default.dir
    let relativePath = ``
    const contentFile: IterateObject = {}
    for await (const file of files) {
      if (!Object.keys(contentFile).length) {
        // for await (const { name, value } of fields) {
        //   contentFile[name] = value
        // }
        fields.next().then(res=>{
          console.log(res)
        })
        // 生成相对路径
        const { workType, workId, chapterId } = contentFile
        if (workType && workId && chapterId) {
          relativePath = `/files/${workType}/${workId}/${chapterId}/`
        } else {
          relativePath = `/files/other/${utils.dayjs().format('YYYYMMDD')}/`
        }
      }

      const { filename, data, mimeType } = file
      ensureDirSync(absolutePath + relativePath)
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
