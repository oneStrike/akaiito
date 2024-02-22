import * as path from 'node:path'

export const staticFileConfig = {
  dirs: {
    default: {
      prefix: '/public',
      dir: path.join(process.cwd(), 'public')
    }
  }
}
