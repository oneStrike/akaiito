<script setup lang="ts">
import { IDivider } from '@/typings/pages/home/home'

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
