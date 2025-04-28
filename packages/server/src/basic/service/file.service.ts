import { Config, Provide } from '@midwayjs/core'
import * as path from 'node:path'
import { move, unlink, remove, ensureDirSync } from 'fs-extra'

@Provide()
export class FileService {
  @Config('staticFile.dirs.default.dir')
  pathPrefix: string

  // 添加本地文件
  async addLocalFile(filePath: string, fileName: string): Promise<string> {
    // 拼接文件路径
    const fileFullPath = path.join(this.pathPrefix, filePath, fileName)
    // 返回文件路径
    return fileFullPath
  }

  // 移动本地文件
  async moveLocalFile(oldPath: string, newPath: string): Promise<void> {
    // 拼接文件路径
    const newFullPath = path.join(this.pathPrefix, newPath)
    const newDir = path.dirname(newFullPath) // 获取目标文件夹路径
    // 获取文件名
    const fileName = path.basename(newFullPath)
    let uniqueName = ''
    if (!fileName) {
      uniqueName = `${path.basename(oldPath)}`
    }
    ensureDirSync(newDir)
    // 移动文件
    await move(oldPath, newFullPath + uniqueName, { overwrite: true })
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
