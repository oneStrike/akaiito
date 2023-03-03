import { utils } from '@/utils/index'

const getPath = (files: any): string | undefined => {
  if (!files) return ''
  if (typeof files === 'string') return files
  if (Array.isArray(files)) return files.map((item: any) => item.path).join(',')
  const possible = utils.isJson(files)
  if (possible) return possible.map((item: any) => item.path).join(',')
}

export const uesUploadFile = {
  getPath
}
