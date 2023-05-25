<script setup lang="ts">
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import type { MenuInst } from 'naive-ui'
import routes from '@/router/routes'
import { layoutStore, userStore } from '@/stores'
import { useSvgIcon } from '@/hook/useTsx'

const router = useRouter()
const useUserStore = userStore()
const useLayoutStore = layoutStore()
const menus: RouteRecordRaw[] = reactive([])

//判断当前用户是否拥有权限
const isFitsRole = (meta: RouteMeta) => {
  const roles = meta.roles
  if (!roles || !roles.length) return true
  return roles.includes(useUserStore.role)
}

//判断路由是否展示在菜单中
const isMenu = (meta: RouteMeta) => {
  return meta.title && !meta.hideMenu && isFitsRole(meta)
}

//排序
const sortRoutes = (routes: RouteRecordRaw[]) => {
  return routes.sort((a, b) => {
    return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
  })
}

//序列化子路由
const serializeChildrenRoutes = (children: RouteRecordRaw[]) => {
  const bottle: RouteRecordRaw[] = []
  children.forEach((item) => {
    const meta = item.meta
    if (meta && isMenu(meta)) {
      if (item.children && item.children.length) {
        item.children = serializeChildrenRoutes(item.children)
      }
      item.label = item.meta!.title!
      bottle.push(item)
    }
  })
  return sortRoutes(bottle)
}

const serializeRoutes = (children?: RouteRecordRaw[]) => {
  const data = children || routes
  data.forEach((item) => {
    const meta = item.meta
    if (meta && isMenu(meta)) {
      if (item.children && item.children.length) {
        item.children = serializeChildrenRoutes(item.children)
      }
      item.label = item.meta!.title!
      menus.push(item)
    }
  })
}
serializeRoutes()

const renderMenuIcon = (val: RouteRecordRaw) => {
  return useSvgIcon({ iconName: val.meta?.icon })
}
const menuClick = (key: string, item: RouteRecordRaw) => {
	console.log("🚀 ~ file:Menu method:menuClick line:67 -----", key);
  if (!item.meta?.url) {
    router.push({ name: key })
  }
}
const route = useRoute()
const menuInstRef = ref<MenuInst>()

watch(
  route,
  (val) => {
    menuInstRef.value?.showOption(val.name as string)
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <n-menu
    ref="menuInstRef"
    :accordion="useLayoutStore.accordion"
    :collapsed="useLayoutStore.collapsed"
    :options="menus"
    key-field="name"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :render-icon="renderMenuIcon"
    :value="$route.name"
    @update:value="menuClick"
  />
</template>
