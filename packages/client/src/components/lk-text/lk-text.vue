<script setup lang="ts">
export interface TextProps {
  text?: string
  type?:
    | 'default'
    | 'minor'
    | 'primary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
  align?: 'left' | 'center' | 'right'
  size?: 'small' | 'medium' | 'large' | 'huge' | 'utmost'
  strong?: boolean
  italic?: boolean
  underline?: boolean
  delete?: boolean
  code?: boolean
  center?: boolean
}

const props = withDefaults(defineProps<TextProps>(), {
  text: '',
  size: 'medium',
  type: 'default',
  align: 'left',
  strong: false,
  italic: false,
  underline: false,
  delete: false,
  code: false
})

const fontSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 'fs12'
    case 'medium':
      return 'fs14'
    case 'large':
      return 'fs18'
    case 'huge':
      return 'fs20'
    case 'utmost':
      return 'fs24'
  }
})

const fontColor = computed(() => {
  switch (props.type) {
    case 'default':
      return 'fc1'
    case 'info':
      return 'fc2'
    case 'minor':
      return 'fc3'
    case 'primary':
      return 'primary_font_color'
    case 'success':
      return 'primary_font'
    case 'error':
      return 'error_font_color'
    case 'warning':
      return 'warning_font_color'
  }
})

const fontAlign = computed(() => {
  switch (props.align) {
    case 'left':
      return 'tl'
    case 'center':
      return 'tc'
    case 'right':
      return 'tr'
  }
})

const textClassName = computed(() => {
  const classNames = []
  if (props.strong) classNames.push('font_weight_bold')
  if (props.italic) classNames.push('font_italic')
  if (props.underline) classNames.push('font_underline')
  if (props.delete) classNames.push('font_delete')
  return classNames
})

const platformClassName = ref('')
// #ifdef MP
platformClassName.value = 'h_100'
// #endif
</script>

<template>
  <view :class="[platformClassName, fontAlign, center ? 'flex_center' : '']">
    <text :class="[fontColor, fontSize, ...textClassName]">
      {{ text }}
    </text>
  </view>
</template>

<style scoped lang="scss"></style>
