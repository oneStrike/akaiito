<script setup lang="ts">
import HeaderItem from './HeaderItem.vue'
import { useLayout } from '@/stores'
const useLayoutStore = useLayout()
const headerHeight = computed(() => useLayoutStore.headerHeight)
</script>

<template>
  <el-header :height="headerHeight" class="bg_box">
    <header-item />
  </el-header>
</template>
