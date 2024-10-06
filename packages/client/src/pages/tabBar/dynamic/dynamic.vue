<script setup lang="ts">
import { useRouter } from '@/hooks/useRouter'

defineOptions({
  name: 'TabBarDynamic',
})

function navPage() {
  useRouter().navigateTo({
    name: 'plugins',
  })
}
</script>

<template>
  <view>
    <button @click="navPage">插件</button>
  </view>
</template>

<style scoped></style>
