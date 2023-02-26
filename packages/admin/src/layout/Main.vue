<script setup lang="ts">
import Menu from '@/layout/components/Menu.vue'
import Header from '@/layout/components/Header.vue'
import Tabs from '@/layout/components/Tabs.vue'
import Content from '@/layout/components/Content.vue'

import { layoutStore } from '@/stores'

const useLayoutStore = layoutStore()
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      class="h_full"
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="useLayoutStore.collapsed"
      show-trigger
      @collapse="useLayoutStore.toggleMenuCollapsed"
      @expand="useLayoutStore.toggleMenuCollapsed"
    >
      <Menu />
    </n-layout-sider>
    <n-layout class="h_full">
      <n-layout-header bordered>
        <Header />
      </n-layout-header>
      <n-layout-header>
        <Tabs />
      </n-layout-header>

      <n-layout-content embedded class="flex_1 pd_8">
        <Content />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">
:deep(.n-layout-scroll-container) {
  display: flex;
  flex-direction: column;
}
</style>
