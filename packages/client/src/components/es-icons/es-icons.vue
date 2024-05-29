<script setup lang="ts">
import icons from './es-icons.json'
import { config } from '@/components/libs/config/config.default'
import type { ColorScheme } from '@/components/libs/typings/config'

export interface EsIconProps {
  name: keyof typeof icons
  size?: number
  width?: number
  height?: number
  color?: keyof ColorScheme | string
}

defineOptions({
  name: 'EsIcon'
})

const props = withDefaults(defineProps<EsIconProps>(), {
  size: 400,
  color: 'green'
})

const iconStyle = computed(() => {
  const width = props.size ? props.size : props.width
  const height = props.size ? props.size : props.height

  return {
    width: width + config.unit,
    height: height + config.unit,
    color: config.colorScheme[props.color] || props.color,
    '--un-icon': icons[props.name].data
  }
})
console.log(iconStyle)
</script>

<template>
  <view class="icon" :style="iconStyle"></view>
</template>
<style lang="scss" scoped>
.icon {
  mask: var(--un-icon) no-repeat;
  mask-size: 100% 100%;
  -webkit-mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  background-color: currentColor;
}
</style>

<style scoped></style>
