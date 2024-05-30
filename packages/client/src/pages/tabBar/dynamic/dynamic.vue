<script setup lang="ts">
defineOptions({
  name: 'TabBarDynamic'
})

const navPage = () => {
  uni.$es.router.navigateTo({
    name: 'plugins'
  })
}
</script>

<template>
  <view>
    <button @click="navPage">插件</button>
  </view>
</template>
<style scoped></style>
