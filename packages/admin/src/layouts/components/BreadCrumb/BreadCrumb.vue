<template>
  <a-breadcrumb>
    <template v-for="(item, index) in route.matched" :key="index">
      <a-breadcrumb-item v-if="!item.meta.hideParent">{{
        item.meta.title
      }}</a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped></style>
