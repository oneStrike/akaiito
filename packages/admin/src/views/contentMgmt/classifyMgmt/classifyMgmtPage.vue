<script setup lang="ts">
import { filter, toolbar } from '@/views/contentMgmt/classifyMgmt/shared'
</script>

<template>
  <div class="main-page pb-6">
    <es-toolbar :toolbar="toolbar" :filter="filter" />
  </div>
</template>

<style scoped></style>
