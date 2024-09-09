import { presetUni } from '@uni-helper/unocss-preset-uni'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetUni({
      attributify: false,
    }),
  ],
})
