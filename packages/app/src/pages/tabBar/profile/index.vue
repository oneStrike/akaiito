<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'

defineOptions({
  name: 'ProfilePage',
})

useUserStore().getUserInfo()
</script>

<template>
  <view>我是用户中心</view>
</template>

<style scoped lang="scss"></style>
