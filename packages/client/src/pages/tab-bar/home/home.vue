<script setup lang="ts">
import type { TabBarItem } from '@/components/lk-tab-bar/lk-tab-bar.vue'
import { tabBarStore, themeStore } from '@/stores'

const useRouter = uni.$lk.router

const useTabBarStore = tabBarStore()
const useThemeStore = themeStore()
//隐藏系统tabbar
onMounted(() => {
  uni.hideTabBar()
})

//tabbar路由导航
const navigator = (val: TabBarItem) => {
  useRouter.switchTab({
    path: val.path
  })
}
</script>

<template>
  <lk-page custom-nav-bar custom-tab-bar>
    <text class="fs16">我是首页</text>

    <lk-tab-bar
      v-if="useRouter.isTabBarPage"
      :active-color="useThemeStore.colorScheme.primary"
      :list="useTabBarStore.tabBar"
      :value="useTabBarStore.currentTab"
      @click="navigator"
    />
  </lk-page>
</template>
