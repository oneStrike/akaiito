import * as path from 'node:path'
import type { AliasOptions, ResolveOptions } from 'vite'

export const ViteResolve: ResolveOptions & { alias: AliasOptions } = {
  alias: {
    '@': path.join(process.cwd(), './src'),
    '@typings': '@akaiito/typings/src',
  },
}
