<script setup lang="ts">
import { config } from '@/components/libs/config/config.default'

defineOptions({
  name: 'EsText',
  options: {
    virtualHost: true
  }
})

const colorScheme = uni.$es.config.colorScheme
const sizeScheme = uni.$es.config.sizeScheme

export interface EsTextProps {
  text: string
  size?: string | number
  color?: string
  lineClamp?: number
}

const props = withDefaults(defineProps<EsTextProps>(), {
  color: 'base',
  size: 'base'
})

const textStyle = computed(() => {
  const style = [
    `color: ${colorScheme[props.color] || props.color}`,
    `fontSize:${(sizeScheme[props.size] || props.size) + config.unit}`
  ]

  if (props.lineClamp) {
    style.push(
      `display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: ${props.lineClamp};overflow: hidden;text-overflow: ellipsis`
    )
  }

  return style.join(';')
})
</script>

<template>
  <text class="w-fit" :style="textStyle">{{ text }}</text>
</template>
