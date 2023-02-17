<script setup lang="ts">
import LayoutMenu from '@/layouts/menu/layoutMenu.vue'
import LayoutHeader from '@/layouts/header/layoutHeader.vue'
import LayoutTabs from '@/layouts/tabs/layoutTabs.vue'
import { useLayoutStore } from '@/stores'
import LayoutContent from '@/layouts/content/layoutContent.vue'

const { menuCollapsed } = storeToRefs(useLayoutStore())
</script>

<template>
  <a-layout style="height: 100vh; overflow: hidden">
    <a-layout-sider v-model:collapsed="menuCollapsed">
      <layout-menu />
    </a-layout-sider>
    <a-layout>
      <layout-header />
      <layout-tabs />
      <a-layout-content class="h_100 pd_16">
        <layout-content />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
