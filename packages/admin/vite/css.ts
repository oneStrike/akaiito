import type { CSSOptions } from 'vite'

export const viteCss: CSSOptions = {
  preprocessorOptions: {
    scss: {
      additionalData: '@use "../src/styles/variables.scss" as *;'
    }
  }
}
