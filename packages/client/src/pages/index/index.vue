<template>
  <view class="content wh-full">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <as-icons />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello')
</script>
