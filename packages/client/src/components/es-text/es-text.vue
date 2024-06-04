<script setup lang="ts">
import { config } from '@/components/libs/config/config.default'
import type { ColorScheme, SizeScheme } from '../libs/typings/config'

defineOptions({
  name: 'EsText'
})

const colorScheme = uni.$es.config.colorScheme
const sizeScheme = uni.$es.config.sizeScheme

export interface EsTextProps {
  text: string
  size?: keyof SizeScheme | number
  color?: keyof ColorScheme | string
}
const props = withDefaults(defineProps<EsTextProps>(), {
  color: 'base',
  // eslint-disable-next-line vue/require-valid-default-prop
  size: 'base'
})

const textStyle = computed(() => {
  console.log({
    color: colorScheme[props.color] || props.color,
    fontSize: (sizeScheme[props.size] || props.size) + config.unit
  })
  return {
    color: colorScheme[props.color] || props.color,
    fontSize: (sizeScheme[props.size] || props.size) + config.unit
  }
})
</script>

<template>
  <text class="w-fit" :style="textStyle">{{ text }}</text>
</template>
