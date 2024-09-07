import { utils } from '@/utils'
import { Config, httpError, Provide } from '@midwayjs/core'
import * as fs from 'fs-extra'
import type { IterateObject } from '@akaiito/typings/src'

@Provide()
export class UploadService {
  @Config('projectConfig')
  projectConfig

  @Config('staticFile')
  staticFileConfig

  async local(files: IterateObject[], fields: IterateObject) {
    if (!this.projectConfig.upload.resourceScenario.includes(fields.scenario)) {
      throw new httpError.BadRequestError('不受支持的场景文件')
    }
    const date = utils.dayjs().format('YYYYMMDD')
    const reportData = []
    files.forEach((item) => {
      const staticFileDefaultConfig = this.staticFileConfig.dirs.default
      const fileName = item.data.split(/\\/).pop()
      const path = `/${fields.scenario}/${date}/${fileName}`
      reportData.push({
        fileName: fields.name,
        filePath: staticFileDefaultConfig.prefix + path,
        mimeType: item.mimeType,
      })
      fs.move(item.data, staticFileDefaultConfig.dir + path)
    })
    return reportData
  }
}
