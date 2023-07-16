<script setup lang="ts">
import type {
  ColorSchemeKey,
  SizeSchemeKey
} from '@/components/libs/typings/components'
import {
  useAddUnit,
  useColor,
  useSize
} from '@/components/libs/hooks/useConfig'
import { defineOptions } from 'unplugin-vue-define-options/macros'

interface IconProps {
  name: string
  prefix?: 'iconfont' | 'uni'
  size?: SizeSchemeKey
  color?: ColorSchemeKey
}

defineOptions({
  name: 'LkIcon',
  options: {
    virtualHost: true //虚拟化组件节点,开启后无法再外部设置组件样式
  }
})

const props = withDefaults(defineProps<IconProps>(), {
  size: 'medium',
  color: 'basis',
  prefix: 'iconfont'
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const iconSize = computed(() => useSize(props.size))
const iconColor = computed(() => useColor(props.color))
const iconType = computed(() =>
  props.prefix === 'iconfont' ? 'icon-' + props.name : props.name
)
</script>

<template>
  <uni-icons
    :type="iconType"
    :custom-prefix="prefix"
    :size="iconSize"
    :color="iconColor"
    :style="{ fontSize: useAddUnit(iconSize), lineHeight: 1 }"
    @click="emits('click')"
  />
</template>
