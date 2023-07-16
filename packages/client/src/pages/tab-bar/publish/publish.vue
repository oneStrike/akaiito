<script setup lang="ts">
//隐藏系统tabbar
import { tabBarStore } from '@/stores'

uni.hideTabBar()
const useTabBarStore = tabBarStore()
</script>

<template>
  <lk-page custom-nav-bar custom-tab-bar>
    <text class="fs16">我是发布</text>

    <lk-tab-bar
      :list="useTabBarStore.tabBar"
      :value="useTabBarStore.currentTab"
      @click="useTabBarStore.toggleTabBar"
    />
  </lk-page>
</template>
