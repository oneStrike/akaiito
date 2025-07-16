import type { AliasOptions, ResolveOptions } from 'vite'
import * as path from 'node:path'
import process from 'node:process'

export const ViteResolve: ResolveOptions & { alias: AliasOptions } = {
  alias: {
    '@': path.join(process.cwd(), './src'),
  },
}
