import { uploadWhiteList } from '@midwayjs/busboy'

export const uploadConfig = {
  mode: 'asyncIterator',
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  match: /\/common\/upload/,
  whitelist: uploadWhiteList,
}
