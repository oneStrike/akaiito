<script setup lang="ts">
import { userStore } from '@/stores'
const useUserStore = userStore()
</script>
<template>
  <n-button @click="useUserStore.logout()">退出登录</n-button>
</template>
