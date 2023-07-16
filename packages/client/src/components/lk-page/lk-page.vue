<script setup lang="ts">
import { defineOptions } from 'unplugin-vue-define-options/macros'
import { useAddUnit, useColor } from '@/components/libs/hooks/useConfig'
import type { ColorSchemeKey } from '@/components/libs/typings/components'

defineOptions({
  name: 'LkPage',
  options: {
    virtualHost: true //虚拟化组件节点
  }
})

const LK = uni.$lk
const tabBarHeight = ref(LK.config.tabBarHeight || 0)

const props = withDefaults(
  defineProps<{
    customNavBar?: boolean
    customTabBar?: boolean
    bg?: ColorSchemeKey
    pd?: string
  }>(),
  {
    customNavBar: false,
    bg: 'bgColor',
    pd: ''
  }
)

const pageStyle = computed(() => {
  return `
					background: ${useColor(props.bg)};
					padding: ${useAddUnit(props.pd)};
					padding-top: ${props.customNavBar ? LK.systemInfo.statusBarHeight : 0}px;
	`
})
</script>

<template>
  <view class="container" :style="pageStyle">
    <slot></slot>
    <view v-if="customTabBar" :style="{ height: tabBarHeight + 'px' }"></view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  /* #ifndef H5*/
  min-height: 100vh;
  /* #endif*/
  /* #ifdef H5*/
  min-height: 100%;
  /* #endif*/

  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.nav_bar {
  padding-top: var(--status-bar-height);
}
</style>
