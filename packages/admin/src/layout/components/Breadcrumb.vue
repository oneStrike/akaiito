<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in $route.matched" :clickable="false">
      <span>{{ item.meta.title }}</span>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
