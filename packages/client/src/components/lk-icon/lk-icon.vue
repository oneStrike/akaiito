<script setup lang="ts">
import type {
  ColorSchemeKey,
  SizeSchemeKey
} from '@/components/libs/typings/components'

interface IconProps {
  name: string
  prefix?: 'wx' | 'uni'
  size?: SizeSchemeKey
  color?: ColorSchemeKey
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'medium',
  color: 'basis',
  prefix: 'wx'
})
</script>

<template>
  <uni-icons :type="name" :prefix="prefix" />
</template>
