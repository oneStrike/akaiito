import * as fs from 'fs/promises'

export const isDirectory = async (path: string) => {
  try {
    const stats = await fs.stat(path)
    return stats.isDirectory()
  } catch (e) {
    return false
  }
}

export const mkdir = async (path: string) => {
  return await fs.mkdir(path, { recursive: true })
}
