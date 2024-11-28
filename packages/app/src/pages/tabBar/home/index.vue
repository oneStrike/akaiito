<script setup lang="ts">
import { getNoticeApi } from '@/apis/appManage'

defineOptions({
  name: 'HomePage',
})
getNoticeApi()
</script>

<template>
  <view>
    <es-loading />
  </view>
</template>

<style scoped lang="scss"></style>
