<script setup lang="ts">
import type { IDiyModule } from '~@/diyPage'

const props = withDefaults(
  defineProps<{
    layout: IDiyModule
  }>(),
  {}
)

const styleString = computed(() => {
  const divider = props.layout.divider
  return `height: ${divider.height}px; margin: 0 ${divider.bothSideMargin}px; background: ${divider.backgroundColor}`
})
</script>

<template>
  <div :style="styleString" class="divider"></div>
</template>
