<script setup lang="ts">
import { themeStore } from '@/stores'
import { defineOptions } from 'unplugin-vue-define-options/macros'

defineOptions({
  name: 'LkText',
  options: {
    virtualHost: true //虚拟化组件节点,开启后无法再外部设置组件样式
  }
})

const alignKeys = ['left', 'center', 'right'] as const
const sizeKeys = ['tiny', 'small', 'medium', 'large', 'huge', 'utmost'] as const
const typeKeys = [
  'default',
  'info',
  'minor',
  'primary',
  'success',
  'warning',
  'error'
] as const

export interface TextProps {
  text?: string
  color?: string
  type?: (typeof typeKeys)[number]
  align?: (typeof alignKeys)[number]
  size?: (typeof sizeKeys)[number]
  strong?: boolean
  center?: boolean
  icon?: string
  iconPrefix?: string
}

const useThemeStore = themeStore()

const props = withDefaults(defineProps<TextProps>(), {
  text: '',
  size: 'medium',
  type: 'default',
  align: 'left',
  strong: false
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const textStyle = computed(() => {
  const sizeValue = useThemeStore.sizeScheme[props.size]
  const colorValues = Object.assign(
    useThemeStore.fontColorScheme,
    useThemeStore.colorScheme
  )
  const colorValue = props.color || colorValues[props.type]
  return {
    fontSize: `${sizeValue}px`,
    color: colorValue,
    display: 'inline-block'
  }
})
const textClass = computed(() => {
  const classNames = []
  switch (props.align) {
    case 'left':
      classNames.push('tl')
      break
    case 'center':
      classNames.push('tc w_100')
      break
    case 'right':
      classNames.push('tr')
      break
  }
  if (props.strong) classNames.push('font_weight_bold')
  return classNames
})
</script>

<template>
  <text
    :class="textClass"
    :style="textStyle"
    v-if="!icon"
    @click="emits('click')"
  >
    {{ text }}
  </text>
  <uni-icons
    v-else
    :size="parseInt(textStyle.fontSize)"
    :type="iconPrefix ? 'icon-' + icon : icon"
    :color="textStyle.color"
    :custom-prefix="iconPrefix"
  />
</template>

<style scoped lang="scss"></style>
