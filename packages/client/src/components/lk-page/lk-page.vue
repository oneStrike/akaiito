<script setup lang="ts">
import config from '@/config'
import type { TabBarItem } from '@/components/lk-tab-bar/lk-tab-bar.vue'
import { tabBarStore, themeStore } from '@/stores'

const { safeAreaInsets } = uni.getSystemInfoSync()
const tabBarHeight = ref(config.tabBarHeight + safeAreaInsets!.bottom + 'px')
const props = withDefaults(
  defineProps<{
    customNavBar?: boolean
    customTabBar?: boolean
  }>(),
  {
    customNavBar: false
  }
)
const className = computed(() => {
  let className = []
  if (props.customNavBar) className.push('nav_bar')
  if (props.customTabBar) className.push('tab_bar')
  return className
})
</script>

<template>
  <view class="container" :class="className">
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  /* #ifndef H5*/
  height: 100vh;
  /* #endif*/
  /* #ifdef H5*/
  height: 100%;
  /* #endif*/
  background: #f5f5f5;
}

.nav_bar {
  padding-top: var(--status-bar-height);
}

.tab_bar {
  padding-bottom: v-bind(tabBarHeight);
}
</style>
