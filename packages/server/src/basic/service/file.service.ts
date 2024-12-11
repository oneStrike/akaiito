import { staticFileConfig } from '@/config/modules/staticFile'
import { Config } from '@midwayjs/core'
import path = require('node:path')
import { unlink, remove } from 'fs-extra'

export class FileService {
  @Config('staticFile')
  staticFileConfig: typeof staticFileConfig

  // 删除本地文件
  async deleteLocalFile(filePath: string): Promise<void> {
    // 拼接文件路径
    const fileFullPath = path.join(this.staticFileConfig.dirs.default.dir, filePath)
    // 删除文件
    await unlink(fileFullPath)
  }

  // 删除漫画章节内容
  async deleteComicChapterContent(chapterId: number) {
    const fileFullPath = path.join(this.staticFileConfig.dirs.default.dir, '/comic/' + chapterId)
    await remove(fileFullPath)
  }
}
