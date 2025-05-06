import { uploadWhiteList } from '@midwayjs/busboy'

export const uploadConfig = {
  mode: 'file',
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  match: [/\/common\/upload/, /\/admin\/comic\/content\/createComicContent/],
  whitelist: uploadWhiteList
}
