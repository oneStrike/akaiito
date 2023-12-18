<script setup lang="ts">
import { routes } from '@/router/routes'
import { useLayoutStore } from '@/stores/modules/layout'
import { useUserStore } from '@/stores/modules/user'
import LayoutSubMenu from '@/layouts/components/LayoutSubMenu.vue'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
const router = useRouter()
const layoutStore = useLayoutStore()

const filterMenus = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  const tempRoutes = []
  return routes
    .filter((item) => !item.meta?.hideMenu || Array.isArray(item.children))
    .map((item) => {
      if (item.meta?.hideMenu) {
        tempRoutes.push(...item.children)
        return false
      }
      return item
    })
    .filter((item) => item)
    .concat(tempRoutes) as RouteRecordRaw[]
}

const serializeRoutes = (route: RouteRecordRaw[]) => {
  return filterMenus(route)
    .sort((a, b) => a.meta?.order - b.meta?.order)
    .map((item) => {
      if (Array.isArray(item.children)) {
        item.children = serializeRoutes(item.children)
      }
      return item
    })
}

const menus = reactive(serializeRoutes(routes))

const menuSelect = (menu: RouteRecordName) => {
  router.push({ name: menu })
}
</script>

<template>
  <el-menu
    class="h-full"
    :collapse="layoutStore.collapsed"
    @select="menuSelect"
  >
    <template v-for="menu in menus" :key="menu.name">
      <layout-sub-menu :menu-info="menu" v-if="menu.children" />
      <el-menu-item :index="menu.name as string" :key="menu.name" v-else>
        <as-icons :name="menu.meta.icon" :size="16" />
        <template #title>
          <span>{{ menu.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style scoped></style>
