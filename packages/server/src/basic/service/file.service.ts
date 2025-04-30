import { Config, Provide } from '@midwayjs/core'
import * as path from 'node:path'
import { move, unlink, remove, ensureDir } from 'fs-extra'

@Provide()
export class FileService {
  @Config('staticFile.dirs.default.dir')
  pathPrefix: string

  // 移动本地文件
  async moveLocalFile(oldPath: string, newPath: string): Promise<string> {
    // 拼接文件路径
    const newFullPath = path.join(this.pathPrefix, newPath)
    const newDir = path.dirname(newFullPath) // 获取目标文件夹路径
    await ensureDir(newDir) // 使用 ensureDir 替换 ensureDirSync
    const newFileName = path.basename(newPath) ? '' : path.basename(oldPath)
    // 移动文件
    await move(oldPath, newFullPath + newFileName, { overwrite: true })
    return newPath + path.basename(oldPath)
  }

  // 删除本地文件
  async deleteLocalFile(filePath: string): Promise<boolean> {
    // 拼接文件路径
    const fileFullPath = path.join(this.pathPrefix, filePath)
    // 删除文件
    try {
      await unlink(fileFullPath)
      return true
    } catch (e) {
      return false
    }
  }

  // 删除漫画章节内容
  async deleteComicChapterContent(chapterId: number) {
    const fileFullPath = path.join(this.pathPrefix, '/comic/' + chapterId)
    await remove(fileFullPath)
  }
}
