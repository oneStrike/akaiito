<script setup lang="ts">
defineOptions({
  name: 'TabBarDynamic'
})

const navPage = () => {
  useRouter.navigateTo({
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
