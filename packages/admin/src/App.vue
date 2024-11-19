<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/themeStore'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const themeStore = useThemeStore()

dayjs.locale('zh-cn')
</script>

<template>
  <div class="app">
    <a-config-provider :locale="zhCN" :theme="themeStore.theme">
      <a-app>
        <router-view />
      </a-app>
    </a-config-provider>
  </div>
</template>
