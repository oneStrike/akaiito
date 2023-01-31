<script setup lang="ts">
import type { IDiyDivider } from '@akaiito/typings/src/admin/modules/diy'
interface IRenderData {
  renderData: IDiyDivider
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
