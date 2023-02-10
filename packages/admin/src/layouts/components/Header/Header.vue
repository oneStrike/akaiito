<script setup lang="ts">
import HeaderItem from './HeaderItem.vue'
import { useLayout } from '@/stores'
const useLayoutStore = useLayout()
const headerHeight = computed(() => useLayoutStore.headerHeight)
</script>

<template>
  <a-layout-header :height="headerHeight" class="bg_box">
    <header-item />
  </a-layout-header>
</template>
