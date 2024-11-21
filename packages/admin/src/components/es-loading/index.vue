<script setup lang="ts">
import EsIcon from '@/components/es-icon/index.vue'

defineOptions({
  name: 'EsLoading',
})

withDefaults(defineProps<EsLoadingProps>(), {
  text: '加载中...',
})

export interface EsLoadingProps {
  text?: string
}

const indicator = h(EsIcon, { name: 'loading', size: 18 })
const loading = defineModel({ type: Boolean, default: false })
</script>

<template>
  <a-spin :indicator="indicator" :spinning="loading" :tip="text" :delay="20">
    <slot></slot>
  </a-spin>
</template>

<style scoped lang="scss"></style>
