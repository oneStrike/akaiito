// const { getThemeVariables } = require('ant-design-vue/dist/theme')
import type { CSSOptions } from 'vite'
export const viteCss: CSSOptions = {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true
    }
  }
}
