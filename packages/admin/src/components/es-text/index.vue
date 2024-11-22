<script setup lang="ts">
import type { EsTextProps } from '@/components/es-text/types'
import { useThemeStore } from '@/stores/modules/themeStore'

defineOptions({
  name: 'EsText',
})
const props = withDefaults(defineProps<EsTextProps>(), {
  type: 'default',
})

const themeStore = useThemeStore()

console.log(themeStore.theme.token.colorError)

const color = computed(() => {
  switch (props.type) {
    case 'primary':
      return themeStore.theme.token.colorPrimary
    case 'danger':
      return themeStore.theme.token.colorError
    case 'warning':
      return themeStore.theme.token.colorWarning
    case 'success':
      return themeStore.theme.token.colorSuccess
    default:
      return ''
  }
})
</script>

<template>
  <span :style="{ color }"><slot></slot></span>
</template>

<style scoped lang="scss"></style>
