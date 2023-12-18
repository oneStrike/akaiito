<script setup lang="ts">
import type { IterateObject } from '@typings/index'

export interface LayoutSubMenuProps {
  menuInfo: IterateObject
}

withDefaults(defineProps<LayoutSubMenuProps>(), {})
</script>

<template>
  <el-sub-menu :index="menuInfo.name" v-if="menuInfo.children?.length">
    <template #title>
      <as-icons :name="menuInfo.meta.icon" :size="16" />
      <span>{{ menuInfo.meta.title }}</span>
    </template>

    <template v-for="item in menuInfo.children" :key="item.name">
      <el-menu-item :index="item.name" v-if="!item.children">
        <as-icons :name="item.meta.icon" :size="16" />
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <layout-sub-menu v-else :menu-info="item" />
    </template>
  </el-sub-menu>
</template>

<style scoped></style>
