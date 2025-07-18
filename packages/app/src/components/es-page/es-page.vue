<script setup lang="ts">
  import type { EsPageProps } from '@/components/es-page/types'
  import { useConfig } from '@/components/libs/hooks/useConfig'
  import { getSafeAreaBottomRpx, getSafeAreaTopRpx } from '@/utils/safeArea'

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
    safeAreaTop: false,
    safeAreaBottom: false,
  })

  const currentPage = uni.$es.router.getRoute()
  const navigationBarTitleText = currentPage?.style?.navigationBarTitleText
  const customNavigation = currentPage?.style?.navigationStyle === 'custom'

  const pageStyle = computed(() => {
    let paddingBottom = props.fixedButton ? '200rpx' : '0'
    let paddingTop = '0'

    // #ifdef H5
    if (props.tabBar) {
      paddingBottom = '50px'
    }
    // #endif

    // 安全区域适配 - 仅在APP平台生效
    // #ifdef APP-PLUS
    if (props.safeAreaTop) {
      paddingTop = `${getSafeAreaTopRpx()}rpx`
    }

    if (props.safeAreaBottom) {
      const safeAreaBottomHeight = getSafeAreaBottomRpx()
      const currentPaddingBottom = props.fixedButton ? 200 : 0
      paddingBottom = `${currentPaddingBottom + safeAreaBottomHeight}rpx`
    }
    // #endif

    return {
      backgroundColor: useConfig.getColor(props.backgroundColor),
      paddingBottom,
      paddingTop,
    }
  })
</script>

<template>
  <view class="es-page relative" :style="pageStyle">
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
