<script setup lang="ts">
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import Tabs from './components/Tabs.vue'
import { useLayoutStore } from '@/stores'
const layoutStore = useLayoutStore()
</script>
<template>
  <a-layout class="w_full h_full">
    <a-layout-sider
      breakpoint="lg"
      :width="layoutStore.menu.width"
      :collapsed="layoutStore.menu.collapsed"
    >
      <Menu />
    </a-layout-sider>
    <a-layout class="h_full">
      <a-layout-header>
        <Header />
      </a-layout-header>
      <Tabs />
      <a-layout-content style="overflow: hidden">
        <Content />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
