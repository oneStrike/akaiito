<script setup lang="ts">
import routes from '@/router/routes'
import { useMenu } from '@/hooks/useMenu'
import type { RouteRecordRaw } from 'vue-router'
import MenuItem from '@/layouts/components/MenuItem.vue'
import { CacheSessionEnum } from '@/enum/cache'
import { useLayoutStore } from '@/stores'
const layoutStore = useLayoutStore()

const menus: RouteRecordRaw[] = useMenu.formatMenus(routes, 'admin')

const selectMenuKeys = useSessionStorage(CacheSessionEnum.SELECT_MENU_KEYS, [
  'dashboard'
])
const openMenuKeys = useSessionStorage(CacheSessionEnum.OPEN_MENU_KEYS, [
  'dashboard'
])
watch(
  useRoute(),
  (val) => {
    selectMenuKeys.value = [val.name as string]
  },
  { deep: true, immediate: true }
)
</script>
<template>
  <div class="h_100">
    <a-menu
      class="h_100"
      show-collapse-button
      breakpoint="lg"
      v-bind="layoutStore.menu"
      v-model:open-keys="openMenuKeys"
      :selected-keys="selectMenuKeys"
      v-model:collapsed="layoutStore.menu.collapsed"
    >
      <menu-item :menus="menus" @click="useMenu.linkPage"></menu-item>
    </a-menu>
  </div>
</template>
