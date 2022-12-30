import { fileURLToPath, URL } from 'url'
import type { AliasOptions, ResolveOptions } from 'vite'
export const viteResolve: ResolveOptions & { alias: AliasOptions } = {
  alias: {
    '@': fileURLToPath(new URL('../../src', import.meta.url)),
    '@@': '../../src/assets/images'
  }
}
