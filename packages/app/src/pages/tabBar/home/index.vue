<script setup lang="ts">
  defineOptions({
    name: 'HomePage',
  })
</script>

<template>
  <es-page :nav-bar="false">
    <view class="p-4 flex justify-between">
      <es-icons name="menu" />
      <es-icons name="search" />
    </view>
  </es-page>
</template>

<style scoped lang="scss"></style>
