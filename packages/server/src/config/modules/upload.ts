import * as path from 'node:path'
import basicConfig from './../../../../../config/config.default'

const whitelist = []

for (const fileTypeKey in basicConfig.allowFileType) {
  basicConfig.allowFileType[fileTypeKey].forEach((item) => {
    whitelist.push('.' + item)
  })
}
export const uploadConfig = {
  mode: 'file',
  fileSize: '10mb',
  tmpdir: path.join(process.cwd(), 'public'),
  cleanTimeout: 0,
  match: /\/common\/upload/,
  whitelist
}
