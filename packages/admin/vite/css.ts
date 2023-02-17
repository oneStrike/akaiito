// const { getThemeVariables } = require('ant-design-vue/dist/theme')
import type { CSSOptions } from 'vite'
export const viteCss: CSSOptions = {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
      additionalData: `
      @import "@/styles/variable.less";
      `,
      modifyVars: {
        'primary-color': '#02b96b',
        'border-radius-base': '6px'
      }
    }
  }
}
