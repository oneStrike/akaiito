import * as path from 'node:path'
import { utils } from '@/utils'

const projectUploadConfig = utils.getProjectConfig()['upload']
const whitelist = []

for (const fileTypeKey in projectUploadConfig.allowFileType) {
  projectUploadConfig.allowFileType[fileTypeKey].forEach((item) => {
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
