<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import EsIcon from '@/components/es-icon/index.vue'
import { routes } from '@/router/routes'

defineOptions({
  name: 'SideLayout',
})

function filterMenus(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const tempRoutes: RouteRecordRaw[] = []
  return routes
    .filter((item) => !item.meta?.hideMenu)
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
      return {
        key: item.name,
        icon: h(EsIcon, { name: item.meta?.icon }),
        children: item.children,
        label: item.meta?.title,
        order: item.meta?.order,
      }
    })
    .sort((a, b) => {
      const orderA = a?.order ?? Infinity
      const orderB = b?.order ?? Infinity
      return orderA - orderB
    })
}

const menus = ref(serializeRoutes(routes))

console.log(menus.value)
</script>

<template>
  <a-menu :items="menus" />
</template>

<style scoped lang="scss"></style>
