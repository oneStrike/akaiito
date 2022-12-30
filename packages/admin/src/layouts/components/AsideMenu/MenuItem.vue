<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import menuService from '@/hooks/useMenu'

defineProps<{
  menus: RouteRecordRaw[]
}>()
</script>

<template>
  <template v-for="menu in menus" :key="menu.name">
    <el-sub-menu
      v-if="menu.children && menu.meta && menu.name"
      :index="menu.name.toString()"
    >
      <template #title>
        <svg-icon v-if="menu.meta.icon" :icon-name="menu.meta.icon" />
        <span>{{ menu.meta.title }}</span>
      </template>
      <template v-for="item in menu.children" :key="item.path">
        <menu-item v-if="item.children" :menus="[item]" />
        <el-menu-item
          v-else
          :index="item.name?.toString()"
          @click="menuService.linkPage(item)"
        >
          <template #title>
            <svg-icon
              v-if="item.meta && item.meta.icon"
              :icon-name="item.meta.icon"
            />
            <span v-if="item.meta">{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-sub-menu>

    <el-menu-item
      :index="menu.name?.toString()"
      v-else-if="menu.meta"
      @click="menuService.linkPage(menu)"
    >
      <svg-icon v-if="menu.meta.icon" :icon-name="menu.meta.icon" />
      <span>{{ menu.meta.title }}</span>
    </el-menu-item>
  </template>
</template>
