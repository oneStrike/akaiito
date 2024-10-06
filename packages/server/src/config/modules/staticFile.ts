import * as path from 'node:path'

export const staticFileConfig = {
  dirs: {
    default: {
      prefix: '/file',
      dir: path.join(process.cwd(), 'public'),
    },
  },
}
