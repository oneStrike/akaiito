<script setup lang="ts">
import type { IDivider } from '@akaiito/typings/src/admin/diyPage'
interface IRenderData {
  renderData: IDivider
}

const props = withDefaults(defineProps<IRenderData>(), {})

const formatStyle = computed(() => {
  const { backgroundColor, height, bothSideMargin } = props.renderData
  return `background: ${backgroundColor}; height: ${height}px; margin: 0 ${bothSideMargin}px;`
})
</script>

<template>
  <view class="divider" :style="formatStyle"></view>
</template>
