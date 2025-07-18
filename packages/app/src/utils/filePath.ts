import { basicConfig } from '@/config/basic.config'
import { utils } from '@/utils/index'

const { BASIC_URL } = basicConfig

const illegalPrefixes = [
  'http://',
  'https://',
  'wxfile://tmp',
  'blob:',
  'data:image/',
]

export function filePath(path: string) {
  if (!path || illegalPrefixes.some((item) => path.indexOf(item) === 0)) {
    return path
  }
  path = utils.parseJson(path)
  if (Array.isArray(path)) {
    path = path[0].path
  }

  console.log('🚀 ~ filePath ~ BASIC_URL + path:', BASIC_URL + path)
  return BASIC_URL + path
}
