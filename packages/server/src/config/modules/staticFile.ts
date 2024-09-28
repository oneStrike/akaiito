import * as path from 'node:path'
import * as process from 'node:process'

export const staticFileConfig = {
  dirs: {
    default: {
      prefix: '/file',
      dir: path.join(process.cwd(), 'public'),
    },
  },
}
