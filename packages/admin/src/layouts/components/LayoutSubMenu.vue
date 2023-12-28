<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

export interface LayoutSubMenuProps {
  menuInfo: RouteRecordRaw
}

withDefaults(defineProps<LayoutSubMenuProps>(), {})
</script>

<template>
  <el-sub-menu
    :index="menuInfo.name as string"
    v-if="menuInfo.children?.length"
  >
    <template #title>
      <as-icons :name="menuInfo.meta.icon" unset />
      <span>{{ menuInfo.meta.title }}</span>
    </template>

    <template v-for="item in menuInfo.children" :key="item.name">
      <el-menu-item :index="item.name as string" v-if="!item.children">
        <as-icons :name="item.meta.icon" unset />
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <layout-sub-menu v-else :menu-info="item" />
    </template>
  </el-sub-menu>
</template>

<style scoped></style>
