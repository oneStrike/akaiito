import { Config, Provide } from '@midwayjs/core'
import path = require('node:path')
import { unlink, remove } from 'fs-extra'

@Provide()
export class FileService {
  @Config('staticFile.dirs.default.dir')
  pathPrefix: string

  // 删除本地文件
  async deleteLocalFile(filePath: string): Promise<void> {
    // 拼接文件路径
    const fileFullPath = path.join(this.pathPrefix, filePath)
    // 删除文件
    await unlink(fileFullPath)
  }

  // 删除漫画章节内容
  async deleteComicChapterContent(chapterId: number) {
    const fileFullPath = path.join(this.pathPrefix, '/comic/' + chapterId)
    await remove(fileFullPath)
  }
}
