<template>
  <div class="app">
    <a-spin v-bind="useLoadingStore().config">
      <a-config-provider :locale="zhCN">
        <router-view></router-view>
      </a-config-provider>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>

<style scoped lang="scss"></style>
