<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import MenuItem from '@/layouts/components/MenuItem.vue'

interface MenuItemProps {
  menus: RouteRecordRaw[]
}
withDefaults(defineProps<MenuItemProps>(), {})
const emits = defineEmits<{
  (event: 'click', data: RouteRecordRaw): void
}>()
</script>

<template>
  <template v-for="menu in menus">
    <a-menu-item
      v-if="!menu.children"
      :key="menu.name"
      @click="emits('click', menu)"
    >
      <template #icon>
        <svg-icon color="currentColor" :icon-name="menu.meta.icon" />
      </template>
      <span>{{ menu.meta.title }}</span>
    </a-menu-item>

    <a-sub-menu v-else :key="menu.name" selectable>
      <template #icon>
        <svg-icon color="currentColor" :icon-name="menu.meta.icon" />
      </template>
      <template #title>
        <span>{{ menu.meta.title }}</span>
      </template>
      <template v-for="subMenu in menu.children" :key="subMenu.name">
        <menu-item
          @click="(menu) => emits('click', menu)"
          v-if="subMenu.children"
          :menus="[subMenu]"
        ></menu-item>
        <a-menu-item
          v-else
          :key="subMenu.name"
          @click="emits('click', subMenu)"
        >
          <template #icon>
            <svg-icon color="currentColor" :icon-name="subMenu.meta.icon" />
          </template>
          <span>{{ subMenu.meta.title }}</span>
        </a-menu-item>
      </template>
    </a-sub-menu>
  </template>
</template>
