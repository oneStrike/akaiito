// const { getThemeVariables } = require('ant-design-vue/dist/theme')
import type { CSSOptions } from 'vite'
export const viteCss: CSSOptions = {
  preprocessorOptions: {
    less: {
      // modifyVars: getThemeVariables({ dark: true }),
      javascriptEnabled: true,
      additionalData: `
      @import "@/styles/variable.less";;
      `
    }
  }
}
