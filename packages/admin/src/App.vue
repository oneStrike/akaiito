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
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { ConfigProvider } from 'ant-design-vue'
dayjs.locale('zh-cn')
</script>

<style scoped lang="less"></style>
