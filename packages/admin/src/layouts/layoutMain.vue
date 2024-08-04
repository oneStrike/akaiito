<script setup lang="ts">
import layoutContent from '@/layouts/components/layoutContent.vue'
import layoutHeader from '@/layouts/components/layoutHeader.vue'
import layoutAside from '@/layouts/components/layoutAside.vue'
import layoutTabs from '@/layouts/components/layoutTabs.vue'
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
        <!--        <el-footer>Footer</el-footer>-->
      </el-container>
    </el-container>
  </div>
</template>
