import type { AliasOptions, ResolveOptions } from 'vite'
import * as path from 'path'
export const viteResolve: ResolveOptions & { alias: AliasOptions } = {
  alias: {
    '@': path.resolve(__dirname, '../src'),
    '@@': path.resolve(__dirname, '../src/static/images'),
    '~@': '@akaiito/typings/src/client'
  },
  dedupe: ['@akaiito/typings']
}
