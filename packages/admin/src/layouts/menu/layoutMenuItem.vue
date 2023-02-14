<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

withDefaults(defineProps<{ menu: RouteRecordRaw }>(), {})
</script>

<template>
  <a-sub-menu :key="menu.name">
    <template #icon>
      <svg-icon :icon-name="menu.meta.icon" />
    </template>
    <template #title>{{ menu.meta.title }}</template>
    <template v-for="item in menu.children" :key="item.name">
      <template v-if="!item.children">
        <a-menu-item :key="item.name">
          <template #icon>
            <svg-icon :icon-name="item.meta.icon" />
          </template>
          {{ item.meta.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <layout-menu-item :menu="item" :key="item.name" />
      </template>
    </template>
  </a-sub-menu>
</template>
