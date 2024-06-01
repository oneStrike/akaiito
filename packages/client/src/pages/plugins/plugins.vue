<script setup lang="ts">
defineOptions({
  name: 'Plugins'
})

const tabs = ['小说', '漫画', '图片', '视频']
</script>

<template>
  <es-page background-color="#f5f5f5" tabs>
    <es-tabs :tabs="tabs" />
    <view class="pl-4 pr-4 pt-2"> </view>
  </es-page>
</template>

<style scoped></style>
