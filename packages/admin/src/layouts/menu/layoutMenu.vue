<script setup lang="ts">
import LayoutMenuItem from '@/layouts/menu/layoutMenuItem.vue'
import { useMenu } from '@/hooks/useMenu'
import { useLayoutStore } from '@/stores'
const { menuCollapsed } = storeToRefs(useLayoutStore())
watch(
  menuCollapsed,
  () => {
    if (!menuCollapsed.value) useMenu.getMenuOpenKeys()
  },
  { immediate: true, deep: true }
)
</script>
<template>
  <a-menu
    class="h_100"
    mode="inline"
    :open-keys="useMenu.openKeys.value"
    :selected-keys="[$route.name]"
    @openChange="(keys) => useMenu.menuOpenChange(keys)"
    @click="useMenu.linkPage"
  >
    <template v-for="item in useMenu.menus" :key="item.name">
      <template v-if="!item.children">
        <a-menu-item :key="item.name">
          <template #icon>
            <svg-icon :icon-name="item.meta.icon" />
          </template>
          <span> {{ item.meta.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <layout-menu-item :menu="item" />
      </template>
    </template>
  </a-menu>
</template>

<style scoped></style>
