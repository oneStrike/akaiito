<script setup lang="ts">
import { config } from '@/components/libs/config/config.default'

defineOptions({
  name: 'EsText'
})

const colorScheme = uni.$es.config.colorScheme
const sizeScheme = uni.$es.config.sizeScheme

export interface EsTextProps {
  text: string
  size?: string | number
  color?: string
}

const props = withDefaults(defineProps<EsTextProps>(), {
  color: 'base',
  size: 'base'
})

const textStyle = computed(() => {
  return {
    color: colorScheme[props.color] || props.color,
    fontSize: (sizeScheme[props.size] || props.size) + config.unit
  }
})
</script>

<template>
  <text class="w-fit" :style="textStyle">{{ text }}</text>
</template>
