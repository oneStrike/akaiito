<script setup lang="ts">
import type { EsPageProps } from '@/components/es-page/types'
import { useConfig } from '@/components/libs/hooks/useConfig'

defineOptions({
  name: 'EsPage',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(defineProps<EsPageProps>(), {
  backgroundColor: '#ffffff',
  padding: false,
  empty: false,
  borderTop: true,
  tabBar: false,
  fixedButton: false,
})
const currentPage = uni.$es.router.getRoute()
const navigationBarTitleText = currentPage?.style?.navigationBarTitleText
const customNavigation = currentPage?.style?.navigationStyle === 'custom'
const pageStyle = computed(() => {
  let paddingBottom = props.fixedButton ? '200rpx' : '0'

  // #ifdef H5
  if (props.tabBar) {
    paddingBottom = '50px'
  }
  // #endif

  return {
    backgroundColor: useConfig.getColor(props.backgroundColor),
    paddingBottom,
  }
})
</script>

<template>
  <view class="es-page" :style="pageStyle">
    <slot name="nabBar">
      <es-nav-bar
        v-if="customNavigation"
        :left="!currentPage?.tabBar"
        :title="navigationBarTitleText || title"
        :back="!currentPage?.tabBar"
        :border-bottom="borderTop"
      />
    </slot>
    <template v-if="!customNavigation">
      <!-- #ifdef MP -->
      <view
        v-if="borderTop"
        class="absolute left-0 top-0 z-99 h-px w-full bg-slate-200"
      />
      <!-- #endif -->
      <!-- #ifndef MP -->
      <view
        v-if="borderTop"
        class="absolute left-0 top-0 top-44px z-99 h-px w-full bg-slate-200"
      />
      <!-- #endif -->
    </template>
    <view :style="{ padding: padding ? '0 32rpx' : '' }">
      <slot />
    </view>
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
