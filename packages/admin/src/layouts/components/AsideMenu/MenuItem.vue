<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import menuService from '@/hooks/useMenu'

defineProps<{
  menus: RouteRecordRaw[]
}>()
</script>

<template>
  <template v-for="menu in menus" :key="menu.name">
    <a-sub-menu
      v-if="menu.children && menu.meta && menu.name"
      :key="menu.name.toString()"
      :title="menu.meta.title"
    >
      <template #icon>
        <svg-icon v-if="menu.meta.icon" :icon-name="menu.meta.icon" />
      </template>
      <template v-for="item in menu.children" :key="item.path">
        <menu-item v-if="item.children" :menus="[item]" />
        <a-menu-item
          v-else
          :key="item.name?.toString()"
          @click="menuService.linkPage(item)"
        >
          <template #icon>
            <svg-icon v-if="item.meta.icon" :icon-name="item.meta.icon" />
          </template>
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
    </a-sub-menu>

    <a-menu-item
      :key="menu.name?.toString()"
      v-else-if="menu.meta"
      @click="menuService.linkPage(menu)"
    >
      <template #icon>
        <svg-icon v-if="menu.meta.icon" :icon-name="menu.meta.icon" />
      </template>
      <span>{{ menu.meta.title }}</span>
    </a-menu-item>
  </template>
</template>
