import { basicConfig } from '@/config/basic.config'
import { isJSON } from '@/utils/index'

const { BASIC_URL, FILE_PATH_PREFIX, APPID } = basicConfig

const illegalPrefixes = ['http://', 'https://', 'wxfile://tmp', 'blob:', 'data:image/']

export function filePath(path: string) {
  if (!path || illegalPrefixes.some(item => path.indexOf(item) === 0)) {
    return path
  }
  if (isJSON(path)) {
    path = JSON.parse(path)[0]?.path ?? ''
  }

  const prefix =
    path.includes(APPID) || path.includes('/file/dv-bucket')
      ? BASIC_URL
      : `${FILE_PATH_PREFIX}/`
  // #ifndef MP
  return window.location.origin + prefix + path
  // #endif
  return prefix + path
}
