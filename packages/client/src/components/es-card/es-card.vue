<script setup lang="ts">
defineOptions({
  name: 'EsCard'
})

export interface EsCardProps {
  flex?: boolean
}

const props = withDefaults(defineProps<EsCardProps>(), {
  flex: false
})
</script>

<template>
  <view
    class="p-3 bg-white rounded shadow-md w-full"
    :class="flex ? 'flex' : ''"
  >
    <slot></slot>
  </view>
</template>
