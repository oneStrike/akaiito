<script setup lang="ts">
import LayoutContent from '@/layouts/components/LayoutContent.vue'
import LayoutHeader from '@/layouts/components/LayoutHeader.vue'
import LayoutAside from '@/layouts/components/LayoutAside.vue'
</script>
<template>
  <div class="common-layout">
    <el-container class="h-screen">
      <el-aside class="!w-auto">
        <layout-aside />
      </el-aside>
      <el-container>
        <el-header class="!border-bottom">
          <layout-header />
        </el-header>
        <el-main>
          <layout-content />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
