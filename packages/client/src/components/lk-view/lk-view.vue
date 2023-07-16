<script setup lang="ts">
import { defineOptions } from 'unplugin-vue-define-options/macros'
import { useColor, useRadius } from '@/components/libs/hooks/useConfig'
import type {
  ColorSchemeKey,
  RadiusSchemeKey
} from '@/components/libs/typings/components'

defineOptions({
  name: 'LkView',
  options: {
    virtualHost: true //虚拟化组件节点,开启后无法再外部设置组件样式
  }
})

export interface ViewProps {
  mode?: 'default' | 'page' | 'box'
  radius?: RadiusSchemeKey
  type?: ColorSchemeKey
  center?: boolean
  wrap?: boolean
  scroll?: boolean
  relative?: boolean
  flex?: boolean
  between?: boolean
  around?: boolean
  column?: boolean
}

const props = withDefaults(defineProps<ViewProps>(), {
  mode: 'default',
  type: 'white',
  center: false,
  column: false,
  relative: false
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const viewMode = computed(() => {
  switch (props.mode) {
    case 'page':
      return 'pd_16 m_h_full'
    case 'box':
      return 'pd_16'
  }
})

//添加class类名
const viewClassNames = computed(() => {
  const classNames = []
  if (props.center) classNames.push('flex flex_center')
  if (props.relative) classNames.push('pos_re')
  if (props.scroll) classNames.push('over_scroll')
  if (props.flex) classNames.push('flex')
  if (props.between) classNames.push('flex main_between')
  if (props.around) classNames.push('flex main_around')
  if (props.column) classNames.push('flex_col')
  if (props.wrap) classNames.push('flex_wrap')
  return classNames
})

const viewStyle = computed(() => ({
  backgroundColor: useColor(props.type),
  borderRadius: props.radius ? useRadius(props.radius) : ''
}))
</script>

<template>
  <view
    :class="[viewMode, ...viewClassNames]"
    :style="viewStyle"
    @click="emits('click')"
  >
    <slot></slot>
  </view>
</template>
