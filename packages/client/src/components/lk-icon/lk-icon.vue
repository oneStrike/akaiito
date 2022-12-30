<script setup lang="ts">
import { IImageMode } from '@/typings/common'

interface IIconProps {
  name: string
  size?: number | [number, number]
  color?: string
  radius?: number
  mode?: IImageMode
  shape?: 'circle' | 'square'
}
const props = withDefaults(defineProps<IIconProps>(), {
  size: 16,
  color: '#333',
  shape: 'circle',
  mode: 'aspectFill'
})
const isImage = computed(() => props.name.includes('.'))
const imageWidth = Array.isArray(props.size) ? props.size[0] : props.size
const imageHeight = Array.isArray(props.size) ? props.size[1] : props.size
</script>

<template>
  <view>
    <text
      v-if="!isImage"
      :class="'iconfont icon-' + name"
      :style="'font-size: ' + size + 'px; ' + 'color: ' + color"
    ></text>
    <u-image
      v-else
      :width="imageWidth"
      :height="imageHeight"
      :src="$FILE_PATH + name"
      :mode="mode"
      :shape="shape"
    ></u-image>
  </view>
</template>
