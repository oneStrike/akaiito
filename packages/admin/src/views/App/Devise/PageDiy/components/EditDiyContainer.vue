<script setup lang="ts">
import LeftDiy from '@/views/App/Devise/PageDiy/components/LeftDiy.vue'
import CenterDiy from '@/views/App/Devise/PageDiy/components/CenterDiy.vue'
import RightDiy from '@/views/App/Devise/PageDiy/components/RightDiy.vue'
const emits = defineEmits<{
  (event: 'closed', data?: boolean): void
}>()
</script>

<template>
  <div class="flex main_between h_100">
    <el-card class="flex1 h_100">
      <left-diy @closed="(isBack) => emits('closed', isBack)"></left-diy>
    </el-card>
    <center-diy></center-diy>
    <el-card class="flex1 h_100 over_scroll_y">
      <right-diy></right-diy>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
