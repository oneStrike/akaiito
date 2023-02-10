<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import menuService from '@/hooks/useMenu'
import { useLayout } from '@/stores'
import _ from 'lodash'
const route = useRoute()
const useLayoutStore = useLayout()

interface MenuState {
  openKeys: string[]
  selectedKeys: string[]
}

const state: MenuState = reactive({
  openKeys: [],
  selectedKeys: []
})
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find(
    (key) => state.openKeys.indexOf(key) === -1
  )
  console.log(
    '🚀 ~ file:AsideMenu method:onOpenChange line:22 -----',
    latestOpenKey
  )
  // const lastOpenKey = _.cloneDeep(openKeys).pop()
  // if (lastOpenKey) state.openKeys = [lastOpenKey]
}
</script>

<template>
  <a-layout-sider class="tt_w bg_box" :width="useLayoutStore.menuWidth">
    <a-menu class="h_100" mode="inline">
      <menu-item :menus="menuService.menus" />
    </a-menu>
  </a-layout-sider>
</template>
