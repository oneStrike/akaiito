<script setup lang="ts">
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import layoutSubMenu from '@/layouts/components/layoutSubMenu.vue'
import { routes } from '@/router/routes'
import { useLayoutStore } from '@/stores/modules/layout'

const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()

function filterMenus(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const tempRoutes: RouteRecordRaw[] = []
  return routes
    .filter((item) => !item.meta?.hideMenu || Array.isArray(item.children))
    .map((item) => {
      if (item.meta?.hideMenu && Array.isArray(item.children)) {
        tempRoutes.push(...item.children)
        return false
      }
      return item
    })
    .filter((item) => item)
    .concat(tempRoutes) as RouteRecordRaw[]
}

function serializeRoutes(route: RouteRecordRaw[]) {
  return filterMenus(route)
    .map((item, index) => {
      if (Array.isArray(item.children)) {
        item.children = serializeRoutes(item.children)
      }
      item.meta!.order = item.meta!.order || index
      return item
    })
    .sort((a, b) => {
      const orderA = a.meta?.order ?? Infinity
      const orderB = b.meta?.order ?? Infinity
      return orderA - orderB
    })
}

const menus = reactive(serializeRoutes(routes))

function menuSelect(menu: RouteRecordName) {
  router.push({ name: menu })
}
</script>

<template>
  <div class="transition-width h-full" :class="layoutStore.collapsed ? 'w-65px' : 'w-260px'">
    <el-menu
      class="h-full !w-full"
      :collapse="layoutStore.collapsed"
      :default-active="route.name as string"
      :collapse-transition="false"
      @select="menuSelect"
    >
      <template v-for="menu in menus" :key="menu.name">
        <layout-sub-menu v-if="menu.children" :menu-info="menu" />
        <el-menu-item v-else :key="menu.name" :index="menu.name as string">
          <es-icons :name="menu?.meta?.icon" unset />
          <template #title>
            <span>{{ menu?.meta?.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.menu-box {
  width: 220px;
  transition: width 0.5s linear !important;
}
</style>
