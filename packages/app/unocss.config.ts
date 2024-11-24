import { presetUni } from '@uni-helper/unocss-preset-uni'
import { defineConfig, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUni({
      attributify: false,
    }),
  ],
  transformers: [transformerVariantGroup()],
  shortcuts: [],
  rules: [
    [
      // 正则表达式匹配 'border-' 后面的方向词或为空
      /^border-(left|right|top|bottom)?$/,
      // 根据匹配结果生成对应的 CSS 样式
      ([, direction]) => {
        if (direction) {
          return { [`border-${direction}`]: `2rpx solid rgb(229 231 235)` }
        } else {
          return { border: `2rpx solid rgb(229 231 235)` }
        }
      },
      // 自动补全提示
      { autocomplete: 'border-<left|right|top|bottom>|border-' },
    ],
  ],
})
