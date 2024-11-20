<script setup lang="ts">
import ContentLayout from '@/layout/content/index.vue'
import HeaderLayout from '@/layout/header/index.vue'
import SideLayout from '@/layout/sider/index.vue'
import { useThemeStore } from '@/stores/modules/themeStore'

const themeStore = useThemeStore()
</script>

<template>
  <a-layout class="h-screen overflow-hidden">
    <a-layout-sider
      :theme="themeStore.pageMode"
      :collapsed="themeStore.menuCollapsed"
      class="overflow-auto hide-scrollbar"
    >
      <side-layout />
    </a-layout-sider>
    <a-layout>
      <header-layout />
      <a-layout-content>
        <content-layout />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
