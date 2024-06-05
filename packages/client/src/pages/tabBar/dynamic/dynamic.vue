<script setup lang="ts">
import { useRouter } from '@/hooks/useRouter'

defineOptions({
  name: 'TabBarDynamic'
})

const navPage = () => {
  uni.$es.router.navigateTo({
    name: 'plugins'
  })
}
console.log(uni)
</script>

<template>
  <view>
    <button @click="navPage">插件</button>
  </view>
</template>
<style scoped></style>
