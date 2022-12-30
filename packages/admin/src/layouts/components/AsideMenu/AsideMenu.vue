<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import menuService from '@/hooks/useMenu'
import { useLayout } from '@/stores'
const route = useRoute()
const useLayoutStore = useLayout()
</script>

<template>
  <el-aside class="tt_w bg_box" :width="useLayoutStore.menuWidth">
    <el-menu
      class="h_100"
      :collapse-transition="false"
      :collapse="useLayoutStore.menuStatus === 'close'"
      :unique-opened="useLayoutStore.menuUniqueOpened"
      :default-active="route.name?.toString()"
    >
      <menu-item :menus="menuService.menus" />
    </el-menu>
  </el-aside>
</template>
