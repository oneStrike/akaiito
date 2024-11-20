<script setup lang="ts">
import ContentLayout from '@/layout/content/index.vue'
import HeaderLayout from '@/layout/header/index.vue'
import TabsLayout from '@/layout/header/tabs.vue'
import SideLayout from '@/layout/sider/index.vue'
import { useThemeStore } from '@/stores/modules/themeStore'

const themeStore = useThemeStore()
</script>

<template>
  <a-layout class="h-screen overflow-hidden">
    <a-layout-sider
      :width="240"
      :theme="themeStore.pageMode"
      :collapsed="themeStore.menuCollapsed"
      class="overflow-auto hide-scrollbar"
    >
      <SideLayout />
    </a-layout-sider>
    <a-layout>
      <HeaderLayout />
      <TabsLayout />
      <a-layout-content>
        <ContentLayout />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
