import type { AliasOptions, ResolveOptions } from 'vite'
import { fileURLToPath, URL } from 'url'

export const viteResolve: ResolveOptions & { alias: AliasOptions } = {
  alias: {
    '@': fileURLToPath(new URL('./../src', import.meta.url)),
    '~@': '@akaiito/typings/src/admin'
  },
  dedupe: ['@akaiito/typings']
}
