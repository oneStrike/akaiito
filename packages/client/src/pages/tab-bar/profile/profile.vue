<script setup lang="ts">
import { useRouter } from '@/hooks/useRouter'
onLoad((options) => {
  console.log('🚀 ~ file:profile method: line:3 -----', options)
})
</script>

<template>
  <view class="profile">
    <text>用户中心</text>
    <button @click="useRoute.back()">返回</button>
  </view>
</template>
