/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROXY_PATH: string
  readonly VITE_PROXY_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
