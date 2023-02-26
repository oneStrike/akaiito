<script setup lang="ts">
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'

import { layoutStore } from '@/stores'
const useLayoutStore = layoutStore()
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="useLayoutStore.theme === 'light' ? null : darkTheme"
    inline-theme-disabled
  >
    <router-view></router-view>
  </n-config-provider>
</template>
