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
//图片样式
const imageStyle = computed(() => {
  let styleStr = ''
  const imageWidth = Array.isArray(props.size) ? props.size[0] : props.size
  const imageHeight = Array.isArray(props.size) ? props.size[1] : props.size
  styleStr = `width: ${imageWidth}px;height:${imageHeight}px;`
  if (props.radius) {
    styleStr += `border-radius: ${props.radius}px;`
  } else if (props.shape === 'circle') {
    styleStr += 'border-radius: 50%;'
  } else {
    styleStr += 'border-radius: 4px;'
  }
  return styleStr
})
</script>

<template>
  <view class="flex center">
    <text
      v-if="!isImage"
      :class="'iconfont icon-' + name"
      :style="'font-size: ' + size + 'px; ' + 'color: ' + color"
    ></text>
    <image
      v-else
      :style="imageStyle"
      :src="$FILE_PATH + name"
      :mode="mode"
      :shape="shape"
    ></image>
  </view>
</template>
