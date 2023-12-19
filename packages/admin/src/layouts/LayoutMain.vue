<script setup lang="ts">
import LayoutContent from '@/layouts/components/LayoutContent.vue'
import LayoutHeader from '@/layouts/components/LayoutHeader.vue'
import LayoutAside from '@/layouts/components/LayoutAside.vue'
import LayoutTabs from '@/layouts/components/LayoutTabs.vue'
</script>
<template>
  <div class="">
    <el-container class="h-screen">
      <el-aside class="!w-auto">
        <layout-aside />
      </el-aside>
      <el-container>
        <el-header class="!p-0" height="100">
          <layout-header />
          <layout-tabs />
        </el-header>
        <el-main class="!p-3 bg-[var(--el-bg-color-page)]">
          <layout-content />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
