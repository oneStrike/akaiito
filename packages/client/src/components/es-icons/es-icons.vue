<script setup lang="ts">
import icons from './es-icons.json'
import { config } from '@/components/libs/config/config.default'

export interface EsIconProps {
  name: keyof typeof icons
  size?: string | number
  width?: number
  height?: number
  color?: string
}

defineOptions({
  name: 'EsIcon',
  options: {
    virtualHost: true //虚拟化组件节点,开启后无法再外部设置组件样式
  }
})

const props = withDefaults(defineProps<EsIconProps>(), {
  size: 40,
  color: 'base'
})

const iconStyle = computed(() => {
  const iconSize = config.sizeScheme[props.size] ?? props.size

  const width = iconSize ? iconSize : props.width
  const height = iconSize ? iconSize : props.height
  const unit = config.unit
  const color = config.colorScheme[props.color] || props.color

  return `
  width:  ${width + unit};
  height: ${height + unit};
  color:  ${String(color)};
  --un-icon: ${icons[props.name].data}`
})
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
  display: inline-block;
}
</style>
