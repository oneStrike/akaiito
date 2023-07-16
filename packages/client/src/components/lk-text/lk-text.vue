<script setup lang="ts">
import { defineOptions } from 'unplugin-vue-define-options/macros'
import {
  ColorSchemeKey,
  SizeSchemeKey
} from '@/components/libs/typings/components'
import { useColor, useSize } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'LkText',
  options: {
    virtualHost: true //虚拟化组件节点
  }
})

export interface TextProps {
  text?: string | number
  size?: SizeSchemeKey
  color?: ColorSchemeKey
  strong?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<TextProps>(), {
  text: '',
  size: 'medium',
  color: 'basis',
  strong: false
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const textSize = computed(() => useSize(props.size, true))
const textColor = computed(() => useColor(props.color))
const textStyle = computed(
  () => `
					font-size:${textSize.value};
					color:${textColor.value};
					font-weight:${props.strong ? 'bold' : 'normal'};
					display:${props.block ? 'block' : 'inline'};
					`
)
</script>

<template>
  <text :style="textStyle" @click="emits('click')">
    {{ text }}
  </text>
</template>

<style scoped lang="scss"></style>
