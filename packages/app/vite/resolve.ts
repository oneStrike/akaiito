import type { AliasOptions, ResolveOptions } from 'vite'
import * as path from 'node:path'

export const ViteResolve: ResolveOptions & { alias: AliasOptions } = {
  alias: {
    '@': path.join(process.cwd(), './src'),
  },
}
