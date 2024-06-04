<script setup lang="ts">
defineOptions({
  name: 'EsPage'
})

export interface EsPageProps {
  backgroundColor?: string
  padding?: boolean
  tabs?: boolean
  empty?: boolean
}

const props = withDefaults(defineProps<EsPageProps>(), {
  backgroundColor: '#ffffff',
  padding: false,
  tabs: false,
  empty: false
})

const pageStyle = computed(() => {
  return {
    backgroundColor: props.backgroundColor,
    padding: props.padding ? '0 32rpx' : '0'
  }
})
</script>

<template>
  <view class="es-page" :style="pageStyle">
    <slot></slot>
    <es-empty v-if="empty" />
  </view>
</template>

<style scoped lang="scss">
.es-page {
  /* #ifndef H5*/
  width: 100vw;
  min-height: 100vh;
  /* #endif*/
  /* #ifdef H5*/
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  /* #endif*/
}
</style>
