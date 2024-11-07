<script setup lang="ts">
import { httpClient } from '@/utils/request'

defineOptions({
  name: 'HomePage',
})

httpClient({
  url: 'jwt',
  method: 'POST',
})
</script>

<template>
  <view>
    <es-loading />
  </view>
</template>

<style scoped lang="scss"></style>
