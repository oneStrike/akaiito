<script setup lang="ts">
import ContentLayout from '@/layout/content/index.vue'
import HeaderLayout from '@/layout/header/index.vue'
import SideLayout from '@/layout/sider/index.vue'
import { useThemeStore } from '@/stores/modules/themeStore'

const themeStore = useThemeStore()
</script>

<template>
  <a-layout>
    <a-layout-sider :theme="themeStore.pageMode">
      <SideLayout />
    </a-layout-sider>
    <a-layout>
      <HeaderLayout />
      <a-layout-content>
        <ContentLayout />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
