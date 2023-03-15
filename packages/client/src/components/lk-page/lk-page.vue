<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    customNavBar?: boolean
  }>(),
  {
    customNavBar: false
  }
)

const { statusBarHeight, screenHeight } = uni.getSystemInfoSync()
const containerStyle = computed(() => {
  return `padding-top: ${
    props.customNavBar ? statusBarHeight : 0
  }px; height: ${screenHeight}px`
})
</script>

<template>
  <view class="container" :style="containerStyle">
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.container {
  width: 750px;
  /* #ifndef APP-PLUS*/
  height: 100vh;
  padding-top: var(--status-bar-height);
  /* #endif*/
  background: #f5f5f5;
}
</style>
