import presetWeapp from 'unocss-preset-weapp'
import {
  extractorAttributify,
  transformerClass
} from 'unocss-preset-weapp/transformer'
import { defineConfig, presetUno } from 'unocss'
// 可以写属性会自动增加class,也可以写class
const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify()

export default defineConfig({
  presets: [presetWeapp(), presetUno(), presetWeappAttributify()],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['cross-center', 'flex items-center'],
    ['main-center', 'flex justify-center']
  ],

  transformers: [transformerAttributify(), transformerClass()]
})
