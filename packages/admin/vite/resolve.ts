import type { AliasOptions, ResolveOptions } from 'vite'
import * as path from 'path'
export const viteResolve: ResolveOptions & { alias: AliasOptions } = {
  alias: {
    '@': path.resolve(__dirname, '../src'),
    '~@': '@akaiito/typings/src/admin'
  },
  dedupe: ['@akaiito/typings']
}
