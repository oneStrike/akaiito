<script setup lang="ts">
const route = useRoute()

watch(route, () => {}, { deep: true })
</script>

<template>
  <n-space> </n-space>
</template>
