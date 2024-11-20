<script setup lang="ts">
import type { SelectEventHandler } from 'ant-design-vue/es/menu/src/interface'
import type { RouteRecordRaw } from 'vue-router'
import EsIcon from '@/components/es-icon/index.vue'
import { routes } from '@/router/routes'
import { useThemeStore } from '@/stores/modules/themeStore'

defineOptions({
  name: 'SideLayout',
})

const historyRoute = useSessionStorage<
  {
    label: string
    name: string
    icon: string
  }[]
>('history_route', [
  {
    label: '工作台',
    name: 'Dashboard',
    icon: 'dashboard',
  },
])

const themeStore = useThemeStore()

const router = useRouter()
const selectedKeys = ref<string[]>([])
const openKeys = useSessionStorage<string[]>('openKeys', [])

useRoute().matched.forEach((item) => {
  selectedKeys.value.push(item.name! as string)
  if (!openKeys.value.length) {
    openKeys.value.push(item.name! as string)
  }
})

function filterMenus(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const tempRoutes: RouteRecordRaw[] = []
  routes.forEach((item) => {
    if (item.meta?.hideAllMenu) {
      return
    }
    if (item.meta?.hide && !item.children?.length) {
      return
    }
    if ((!item.meta || item.meta?.hideMenu) && Array.isArray(item.children)) {
      tempRoutes.push(...item.children)
    } else {
      tempRoutes.push(item)
    }
  })
  return tempRoutes
}

function serializeRoutes(route: RouteRecordRaw[]): any[] {
  return filterMenus(route)
    .map((item, index) => {
      if (Array.isArray(item.children)) {
        item.children = serializeRoutes(item.children)
      }
      item.meta!.order = item.meta!.order || index
      return {
        key: item.name,
        icon: h(EsIcon, { name: item.meta!.icon! }),
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

const menus = ref(serializeRoutes(JSON.parse(JSON.stringify(routes))))

const selectMenu: SelectEventHandler = (val) => {
  const { label, key, icon } = val.item.originItemValue as any
  if (!historyRoute.value.find((item) => item.name === key)) {
    historyRoute.value.push({ label, name: key, icon: icon.props.name })
  }
  router.push({ name: val.key as string })
}
console.log(themeStore.menuMode)
</script>

<template>
  <a-menu
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    class="h-full"
    mode="inline"
    :theme="themeStore.menuMode"
    :items="menus"
    @select="selectMenu"
  />
</template>

<style scoped lang="scss"></style>
