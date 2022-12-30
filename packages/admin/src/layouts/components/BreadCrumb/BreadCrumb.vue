<template>
  <el-breadcrumb>
    <template v-for="(item, index) in route.matched" :key="index">
      <el-breadcrumb-item v-if="!item.meta.hideParent">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped></style>
