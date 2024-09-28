import type { AliasOptions, ResolveOptions } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export const ViteResolve: ResolveOptions & { alias: AliasOptions } = {
  alias: {
    '@': fileURLToPath(new URL('./../src', import.meta.url)),
  },
}
