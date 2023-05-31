<script setup lang="ts">
export interface ViewProps {
  mode?: 'default' | 'page' | 'box'
  radius?: 'small' | 'base' | 'circle'
  type?:
    | 'primary'
    | 'success'
    | 'error'
    | 'warning'
    | 'white'
    | 'gray'
    | 'transparent'
  center?: boolean
  relative?: boolean
  flex?: boolean
  between?: boolean
  around?: boolean
}

const props = withDefaults(defineProps<ViewProps>(), {
  mode: 'default',
  center: false,
  relative: true
})

const viewMode = computed(() => {
  switch (props.mode) {
    case 'page':
      return 'pd_16 m_h_full gray_bg'
    case 'box':
      return 'pd_16'
  }
})

const viewClassNames = computed(() => {
  const classNames = []
  if (props.center) classNames.push('flex_center')
  if (props.relative) classNames.push('pos_re')
  if (props.radius) classNames.push('border_radius_' + props.radius)
  if (props.type) classNames.push(props.type + '_bg')
  if (props.flex) classNames.push('flex')
  if (props.between) classNames.push('main_between')
  if (props.around) classNames.push('main_around')
  return classNames
})
</script>

<template>
  <view :class="[viewMode, ...viewClassNames]">
    <slot></slot>
  </view>
</template>
