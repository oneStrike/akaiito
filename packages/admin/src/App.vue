<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
</script>

<template>
  <div class="app">
    <a-config-provider
      :locale="zhCN"
      :theme="{
        token: {
          colorInfo: '#00b96b',
          colorPrimary: '#00b96b',
          borderRadius: 4,
        },
      }"
    >
      <a-app>
        <router-view />
      </a-app>
    </a-config-provider>
  </div>
</template>
