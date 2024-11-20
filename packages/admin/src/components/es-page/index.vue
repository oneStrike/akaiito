<script setup lang="ts">
defineOptions({
  name: 'EsPage',
})
</script>

<template>
  <a-card class="w-full h-full">
    <slot></slot>
  </a-card>
</template>

<style scoped lang="scss">
:deep(.ant-card-body) {
  padding: 12px;
}
</style>
